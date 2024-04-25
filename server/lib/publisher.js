import { contentURL, createBlockBlobFromBuffer } from "../lib/blobstorage";
import { upsert as upsertLang } from "../api/languages/languages.model";
import { list as listScreens } from "../api/screens/screens.model";
import {
    list as listAbout,
    sections as aboutSections,
} from "../api/about/about.model";
import {
    listImages,
    listVideos,
    videoScreenKey,
} from "../api/assets/assets.model";
import {
    list as listModules,
    screenKey as moduleScreenKey,
} from "../api/modules/modules.model";
import {
    list as listDrugs,
    screenKey as drugScreenKey,
} from "../api/drugs/drugs.model";
import { list as listOnboardings } from "../api/onboarding/onboarding.model";
import { list as listCertificates } from "../api/certificates/certificates.model";
import { list as listNotifications } from "../api/notifications/notifications.model";
import { keyLearningPointsModel } from "../api/key-learning-points/key-learning-points.model";
import { casesModel } from "../api/cases/cases.model";
import { runMappingsUpdate } from "../api/pub/updateMappings";
import { actionCardsModel } from "../api/action-cards/action-cards.model";
import { proceduresModel } from "../api/procedures/procedures.model";
import { httpRequest } from "./httpUtil";
import log from "../config/logging";

const Parallel = require("async-parallel");

import { chapterScreenKey } from "./chapters";

import { docToHtml } from "./richdocument";
import config from "../config";

import ZipExporter from "./zipexporter";
import { publishLangLegacy } from "./publisherLegacy";

export const publishIndex = (version, langs1, exporter, draft) => {
    const langs = [...langs1];

    const prop = draft ? "draftLastPublished" : "lastPublished";
    const index = {
        version: version,
        languages: langs
            .filter((lang) => lang[prop])
            .map((lang) => ({
                id: lang.id,
                countryCode: lang.countryCode,
                latitude: lang.latitude,
                longitude: lang.longitude,
                description: lang.description,
                version: lang.version,
                href: contentURL(`${lang.id}/bundle.json`, draft),
                hrefZip: contentURL(`${lang.id}/bundle.zip`, draft),
            })),
    };
    return exporter("index.json", JSON.stringify(index));
};

export const publishModule = (screenMap, modul, refs) => {
    const iconAlt = `${modul.icon}_alt`;

    const m = {
        id: modul.key,
        version: modul.LastUpdated,
        icon: modul.icon,
        iconAlt: iconAlt,
        description: screenMap.get(moduleScreenKey(modul.key)),
        actionCards: modul.actionCards,
        procedures: modul.procedures,
        keyLearningPoints: modul.keyLearningPoints,
        videos: modul.videos,
        drugs: modul.drugs,
    };
    refs.images.add(modul.icon);
    refs.images.add(iconAlt);

    modul.procedures.forEach((p) => refs.procedures.add(p));
    modul.actionCards.forEach((p) => refs.actionCards.add(p));
    modul.keyLearningPoints.forEach((klp) => refs.keyLearningPoints.add(klp));
    modul.videos.forEach((v) => refs.videos.add(v));

    return m;
    // return exporter(`${lang.id}/modules/${module.key}.json`, JSON.stringify(m));
};

const publishModules = async(screenMap, lang, refs) => {
    const modules = await listModules(lang.id);
    const translatedModules = modules.filter((m) => m.id);
    return translatedModules.map((modul) =>
        publishModule(screenMap, modul, refs)
    );
};

class RichDocumentPublisher {
    constructor(model) {
        this.model = model;
    }

    docPath(doc) {
        return `${this.model.docTypePlural}/${doc.key}.json`;
    }

    publishChapter(screens, chapter, refs) {
        return {
            id: chapter.key,
            description: screens.get(chapterScreenKey(chapter.key)),
            content: docToHtml(chapter, refs),
        };
    }

    publishDoc(screens, doc, refs) {
        const d = {
            id: doc.key,
            version: doc.LastUpdated,
            icon: doc.icon,
            description: screens.get(this.model.screenKey(doc.key)),
            chapters: (doc.chapters || []).map((chapter) =>
                this.publishChapter(screens, chapter, refs)
            ),
        };
        refs.images.add(doc.icon);
        return d;
    }

    async publishDocuments(screens, lang, docs, refs) {
        const ds = await this.model.list(lang.id);
        const referencedDocs = new Set(docs);
        const translatedDocs = ds.filter((d) => referencedDocs.has(d.key));
        return translatedDocs.map((doc) => this.publishDoc(screens, doc, refs));
    }
}

const publishDrug = (screens, drug, refs) => {
    return {
        id: drug.key,
        version: drug.LastUpdated,
        description: screens.get(drugScreenKey(drug.key)),
        content: docToHtml(drug, refs),
    };
};

const publishDrugs = async(screens, lang, refs) => {
    const ds = await listDrugs(lang.id);
    return ds.map((drug) => publishDrug(screens, drug, refs));
};

const publishOnboarding = async(lang) => {
    const onboardingScreens = await listOnboardings(lang.id);
    return Promise.all(
        onboardingScreens.map(async(onboardingScreen) => {
            return {
                id: onboardingScreen.key,
                version: onboardingScreen.LastUpdated,
                question: onboardingScreen.question.translated,
                answers: onboardingScreen.answers.map((a) => a.translated),
            };
        })
    );
};

const publishAnswer = (a) => {
    const result = a.result;
    const correct = result ? result === "correct" : a.correct;
    return {
        value: a.value.translated,
        correct: correct,
        result: result,
    };
};

const publishQuestion = (q, refs) => {
    const d = {
        id: q.key,
        question: q.question.translated,
        quizzType: q.quizzType,
        image: q.image,
        showToggle: q.showToggle || false,
        link: q.link,
        essential: q.essential || false,
        description: q.description.translated.trim(),
        answers: q.answers
            .filter((a) => a.value.translated)
            .map((a) => publishAnswer(a)),
    };

    if (q.image && !refs.images.has(q.image)) {
        refs.imagesLearningPlatform.add(q.image);
    }

    return d;
};

const publishKLP = (klp, refs) => {
    return {
        id: klp.key,
        version: klp.LastUpdated,
        level: klp.level,
        description: klp.description,
        title: klp.title,
        questions: klp.questions.map((q) => publishQuestion(q, refs)),
    };
};

const publishKeyLearningPoints = async(lang, klps, refs) => {
    // Do nothing if Learning Platform is disabled
    if (!lang.learningPlatform) {
        return [];
    }

    const allKLPS = await keyLearningPointsModel.list(lang.id);
    const referencedKLPS = new Set(klps);
    const translatedKLPS = allKLPS.filter((klp) => referencedKLPS.has(klp.key));

    return translatedKLPS.map((klp) => publishKLP(klp, refs));
};

const publishCase = (caze, refs) => {
    const d = {
        id: caze.key,
        version: caze.LastUpdated,
        description: caze.description,
        title: caze.title,
        image: caze.image,
        order: caze.sortOrder,
        questions: caze.questions.map((q) => publishQuestion(q, refs)),
    };
    if (caze.image && !refs.images.has(caze.image)) {
        refs.imagesLearningPlatform.add(caze.image);
    }

    return d;
};

const publishCertificate = (casesMap, cert, refs) => {
    const cases = cert.cases.map((c) => publishCase(casesMap.get(c), refs));
    cases.sort((a, b) => (a.order || 1e20) - (b.order || 1e20));
    const casesVersion = cases.reduce((acc, c) => Math.max(acc, c.version), 0);
    return {
        id: cert.key,
        version: Math.max(cert.LastUpdated, casesVersion),
        description: cert.description,
        content: docToHtml(cert, refs),
        deadly: cert.deadly,
        passRate: cert.passRate,
        cases: cases,
    };
};

const publishCertificates = async(cases, lang, refs) => {
    // Do nothing if Learning Platform is disabled
    if (!lang.learningPlatform) {
        return [];
    }

    const certs = await listCertificates(lang.id);
    return certs.map((cert) => publishCertificate(cases, cert, refs));
};

const publishNotifications = async(lang) => {
    const ns = await listNotifications(lang.id);
    return ns.map((n) => ({
        id: n.key,
        shortDescription: n.translated.shortDescription,
        longDescription: n.translated.longDescription,
        link: n.link,
    }));
};

const publishScreens = (screens) => {
    let m = {};
    screens.forEach((s) => {
        m[s.key] = s.translated || s.adapted;
    });
    return m;
};

const publishImages = async(lang, refs) => {
    const images = [...refs.images];
    const imagesLP = [...refs.imagesLearningPlatform];
    const allImages = await listImages(lang.assetVersion);
    const imageMap = new Map(allImages.map((i) => [i.key, i]));

    const formatImages = (imageKey) => {
        const image = imageMap.get(imageKey);
        if (!image) {
            refs.msgs.push(`Missing image '${imageKey}'`);
        }

        return {
            id: imageKey,
            src: image ? image.href : undefined,
            version: image ? image.lastModified : undefined,
        };
    };

    let imagesFormatted = images.map(formatImages).concat([...refs.thumbnails]);
    let imagesLPFormatted = imagesLP.map(formatImages);

    return {
        images: imagesFormatted,
        imagesLearningPlatform: imagesLPFormatted,
    };
};

const publishVideos = async(screens, refs) => {
    const videos = [...refs.videos];
    const allVideos = await listVideos();
    const videoMap = new Map(allVideos.map((v) => [v.key, v]));
    return videos.map((videoKey) => {
        const video = videoMap.get(videoKey);
        let icon = undefined;

        if (!video) {
            refs.msgs.push(`Missing video '${videoKey}'`);
        } else if (video.icon) {
            refs.thumbnails.add({
                id: videoKey,
                src: video.icon,
                version: video.iconLastModified,
            });
            icon = videoKey;
        }
        return {
            id: videoKey,
            src: video ? video.href : undefined,
            icon: icon,
            description: screens.get(videoScreenKey(videoKey)),
            version: video ? video.lastModified : undefined,
        };
    });
};

const publishSection = (doc, refs) => {
    const section = {
        id: doc.section,
        version: doc.LastUpdated,
        description: doc.section,
        icon: "icon2",
        chapters: (doc.chapters || []).map((chapter) => ({
            description: doc.section,
            content: docToHtml(chapter, refs),
        })),
    };

    return section;
    // return exporter(`${lang.id}/about/${doc.section}.json`, JSON.stringify(section));
};

const publishAbout = async(lang, refs) => {
    const sections = await Promise.all(
        aboutSections.map((section) => listAbout(lang.id, section))
    );
    // Flatten result
    const aboutDocs = [].concat(...sections);
    return aboutDocs.map((doc) => publishSection(doc, refs));
};

async function exportImageList(lang, images, exporter, draft, zipName) {
    log.debug(`Collecting and adding images for ${zipName}`);
    const zipExporter = new ZipExporter(lang.id + "/", exporter);
    const imageSources = images.filter((image) => image.src);
    log.debug(`Adding ${imageSources.length} images to zip...`);
    await Parallel.map(
        imageSources,
        async(image) => zipExporter.addAsset(image.src), { concurrency: 5 }
    );
    log.debug("Creating zip");
    const buf = await zipExporter.toBuffer();
    log.debug(`Saving ${zipName}.zip on blob store.`);
    await createBlockBlobFromBuffer(draft)(
        `${lang.id}/${zipName}.zip`,
        buf,
        "application/zip"
    );
}

/**
 * This is the main function which published the language. It calls
 * all the above code collecting the various parts that make up a
 * language.
 */
const publishLang = async(version, lang, textExporter, user, draft) => {
    let references = {
        images: new Set(),
        imagesLearningPlatform: new Set(),
        thumbnails: new Set(),
        videos: new Set(),
        procedures: new Set(),
        actionCards: new Set(),
        keyLearningPoints: new Set(),
        certificates: new Set(),
        msgs: [],
    };

    const videoDuration = (draft) => {
        // draft = draft || config.env == "dev";

        draft = false; // Always update released videos durations

        var options = {
            host: config.durationService.host,
            path: "/trigger?draft=" + draft,
            port: config.durationService.port,
            headers: { "x-sda-auth": config.durationService.apiKey },
        };
        return httpRequest(options);
    };

    // const videoDurationPromise = videoDuration(draft);

    const allScreens = await listScreens(lang.id);
    const allCases = await casesModel.list(lang.id, "", true);

    // Only publish screens not used to translate other types of content
    const screens = publishScreens(
        allScreens.filter(
            (s) =>
            s.key.includes("upq:") ||
            s.key.includes("lp:") ||
            s.key.includes("onb:") ||
            !s.key.includes(":")
        )
    );

    const screensMap = new Map(
        allScreens.map((s) => [s.key, s.translated || s.adapted])
    );
    const casesMap = new Map(allCases.map((c) => [c.key, c]));

    const about = await publishAbout(lang, references);
    const modules = await publishModules(screensMap, lang, references);
    const procedures = await new RichDocumentPublisher(
        proceduresModel
    ).publishDocuments(screensMap, lang, references.procedures, references);
    const actionCards = await new RichDocumentPublisher(
        actionCardsModel
    ).publishDocuments(screensMap, lang, references.actionCards, references);
    const drugs = await publishDrugs(screensMap, lang, references);
    const onboarding = await publishOnboarding(lang);
    const keyLearningPoints = await publishKeyLearningPoints(
        lang,
        references.keyLearningPoints,
        references
    );
    const certificates = await publishCertificates(casesMap, lang, references);

    const videos = await publishVideos(screensMap, references);
    const { images, imagesLearningPlatform } = await publishImages(
        lang,
        references
    );
    const allImages = [...images, ...imagesLearningPlatform];

    const notifications = await publishNotifications(lang);


    const updatedLang = draft ?
        {...lang, draftLastPublished: Date.now(), draftVersion: version } :
        {...lang, lastPublished: Date.now(), version: version };
    const bundle = {
        description: lang.description,
        learningPlatform: lang.learningPlatform,
        langId: lang.id,
        countryCode: lang.countryCode,
        latitude: lang.latitude,
        longitude: lang.longitude,
        version,
        screen: screens,
        about,
        videos,
        images: allImages,
        notifications,
        procedures,
        actionCards,
        modules,
        drugs,
        onboarding,
    };

    if (lang.learningPlatform) {
        bundle.keyLearningPoints = keyLearningPoints;
        bundle.certificates = certificates;
    }
    log.debug("All content collected");

    // export bundle blob
    const bundleJson = JSON.stringify(bundle);
    await createBlockBlobFromBuffer(draft)(
        `${lang.id}/content-bundle.json`,
        Buffer.from(bundleJson, "utf8"),
        "application/json"
    );

    // Export images
    await exportImageList(lang, images, textExporter, draft, "image-bundle");
    await exportImageList(
        lang,
        imagesLearningPlatform,
        textExporter,
        draft,
        "image-learning-bundle"
    );

    log.debug("Everything written to blob store");

    await videoDuration();
    log.debug("Video duration done");

    // Update mappings
    await runMappingsUpdate();
    log.debug("Updated mappings");

    // Await legacy publish language
    await publishLangLegacy(version, lang, textExporter, user, draft);

    return upsertLang(user, updatedLang);
};

export const unpublishLang = (lang, user) => {
    const { lastPublished, ...updatedLang } = lang;
    return upsertLang(user, updatedLang);
};

export const publisher = async(langId, ls, exporter, user, draft) => {
    // We need to keep legacy publish

    const langs = await ls;
    const publishPromises = langs.map((lang) => {
        const nextVersion = Math.max(lang.draftVersion || 0, lang.version || 0) + 1;
        return langId && langId === lang.id ?
            publishLang(nextVersion, lang, exporter, user, draft) :
            Promise.resolve(lang);
    });

    const languages = await Promise.all(publishPromises);
    const index = await publishIndex(Date.now(), languages, exporter, draft);
    return { index, languages };
};

export const unpublisher = (langId, ls, exporter, user) => {
    const publishedLangs = ls.then((langs) => {
        return Promise.all(
            langs.map((lang) => {
                return langId && langId === lang.id ?
                    unpublishLang(lang, user) :
                    Promise.resolve(lang);
            })
        );
    });

    return Promise.all([ls, publishedLangs]).then((ps) => {
        const pubLangs = ps[1];
        return publishIndex(Date.now(), pubLangs, exporter, false).then((index) =>
            JSON.stringify({
                index: index,
                languages: pubLangs,
            })
        );
    });
};