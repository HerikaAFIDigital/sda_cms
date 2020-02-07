import { createCanvas, loadImage, registerFont } from "canvas";
import * as fs from "fs";
import * as Koa from "koa";
import * as moment from "moment";
import * as path from "path";
import { Url } from "url";
import { logger } from "./logger";

const missingParameter = (ctx: Koa.Context, url: Url) => {

    if (!("name" in ctx.request.body)) {
        ctx.status = 400;
        ctx.body = "Missing parameter name";
        return true;
    }
    if (!("jobTitle" in ctx.request.body)) {
        ctx.status = 400;
        ctx.body = "Missing parameter jobTitle";
        return true;
    }
    if (!("certHeader" in ctx.request.body)) {
        ctx.status = 400;
        ctx.body = "Missing parameter certHeader";
        return true;
    }
    if (!("certBody" in ctx.request.body)) {
        ctx.status = 400;
        ctx.body = "Missing parameter certBody";
        return true;
    }
    if (!("certBody1" in ctx.request.body)) {
        ctx.status = 400;
        ctx.body = "Missing parameter certBody1";
        return true;
    }
    if (!("certBody2" in ctx.request.body)) {
        ctx.status = 400;
        ctx.body = "Missing parameter certBody2";
        return true;
    }
    if (!("certDates" in ctx.request.body)) {
        ctx.status = 400;
        ctx.body = "Missing parameter certDates";
        return true;
    }
    if (Object.prototype.toString.call(ctx.request.body.certDates) !== '[object Array]') {
        ctx.status = 400;
        ctx.body = "certDates is not an array";
        return true;
    }

    return false;
};

export const handleGeneration = async (ctx: Koa.Context, url: Url) => {

    if (missingParameter(ctx, url)) {
        return;
    }

    ctx.type = "png";
    ctx.body = await renderCertificate({
        jobTitle: ctx.request.body.jobTitle,
        name: ctx.request.body.name,
        certHeader: ctx.request.body.certHeader,
        certBody: ctx.request.body.certBody,
        certBody1: ctx.request.body.certBody1,
        certBody2: ctx.request.body.certBody2,
        certDates: ctx.request.body.certDates,
        language: ctx.request.body.language
    });
};

interface IProfile {
    jobTitle: string;
    name: string;
    certHeader: string;
    certBody: string;
    certBody1: string;
    certBody2: string;
    certDates: [];
    language: string;
}

// const readFilePromise = (file: string) => {
//     return new Promise((resolve, reject) => {
//         fs.readFile(file, (err, data) => {
//             if (!err) {
//                 resolve(data);
//             } else {
//                 reject(err);
//             }
//         });
//     });
// };

const prettyPrintCertDate = (ts: number) => {
    const m = moment(ts);
    return m.format("DD.MM.YYYY");
};

const prettyPrintValidDate = (ts: number) => {
    const m = moment(ts).add(1, "year");
    return m.format("Do MMMM YYYY");
};

async function renderCertificate(profile: IProfile) {

    let { jobTitle, name, certHeader, certBody, certBody1, certBody2, certDates, language } = profile;

    // console.log("cert-service -> header: ", certHeader);
    // console.log("cert-service -> body: ", certBody);
    // console.log("cert-service -> body1: ", certBody1);
    // console.log("cert-service -> body2: ", certBody2);
    // console.log("cert-service -> language: ", language);

    //Make new local version of the certDates array
    const _certDates = certDates;
    //Get the latest 5 entries
    _certDates.slice(Math.max(_certDates.length - 5, 1));
    //Map though and prettyPrint the dates
    const prettyPrintedDates = _certDates.map((date, index) => {
        return (
            prettyPrintCertDate(date)
        )
    })

    //Fill the 5 dates with the formatted dates
    const date_1 = prettyPrintedDates[0];
    const date_2 = prettyPrintedDates[1];
    const date_3 = prettyPrintedDates[2];
    const date_4 = prettyPrintedDates[3];
    const date_5 = prettyPrintedDates[4];

    // registerFont(path.join(__dirname, "assets", "EdwardianScriptITC.ttf"), {family: "Edwardian Script ITC"});
    // registerFont(path.join(__dirname, "assets", "FanwoodText-Italic.ttf"), { family: "Fanwood Text", style: "italic" });
    // registerFont(path.join(__dirname, "assets", "Arial-BoldMT.ttf"), { family: "Arial", weight: "bold" });
    // registerFont(path.join(__dirname, "assets", "Arial-ItalicMT.ttf"), { family: "Arial", style: "italic" });
    // registerFont(path.join(__dirname, "assets", "Ubuntu-Light.ttf"), { family: "Ubuntu Light", style: "normal" });

    //Set the dimentions for the canvas
    const canvas = createCanvas(1920, 1357);
    const context = canvas.getContext("2d");
    // context.fillStyle = 'white'; //Make the background of the canvas white
    // context.fillRect(0, 0, 1920, 1357); //Make the background of the canvas white and fill the whole canvas

    //Due to specific landuages, there has to be set a font for that specific language in order to show the text correct on the certificate
    switch (language) {
        case "Bangladesh - Bangla":
            registerFont(path.join(__dirname, "assets", "NotoSansBengali-Light.ttf"), { family: "NotoSansBengali-Light", style: "normal" });
            context.font = "normal normal 40px NotoSansBengali-Light"; //Use the custom font 'Chiret-Regular' for Amharic text's
            break;
        case "Ethiopia - Amharic":
            registerFont(path.join(__dirname, "assets", "NotoSansEthiopic-Light.ttf"), { family: "NotoSansEthiopic-Light", style: "normal" });
            context.font = "normal normal 30px NotoSansEthiopic-Light"; //Use the custom font 'Chiret-Regular' for Amharic text's
            break;
        case "India - Hindi":
            registerFont(path.join(__dirname, "assets", "NotoSansDevanagari-Light.ttf"), { family: "NotoSansDevanagari-Light", style: "normal" });
            context.font = "normal normal 30px NotoSansDevanagari-Light"; //Use the custom font 'Chiret-Regular' for Amharic text's
            break;
        default:
            registerFont(path.join(__dirname, "assets", "NotoSans-Light.ttf"), { family: "NotoSans-Light", style: "normal" });
            context.font = "normal normal 30px NotoSans-Light"; //Use the custom font 'Chiret-Regular' for Amharic text's
            break;
    }

    const p2 = path.join(__dirname, "assets", "New_certificate.png");
    const img = await loadImage(p2);
    context.drawImage(img, 0, 0, 1920, 1357);

    const unfilledStar = path.join(__dirname, "assets", "stjerne_gennemsigtig.png");
    const filledStar = path.join(__dirname, "assets", "stjerne_gul.png");
    const img_unfiledStar = await loadImage(unfilledStar);
    const img_filedStar = await loadImage(filledStar);

    // There will be a unfliied or a filled star to the side of the dates
    { date_1 === undefined ? context.drawImage(img_unfiledStar, 1360, 380, 70, 70) : context.drawImage(img_filedStar, 1360, 380, 70, 70) };
    { date_2 === undefined ? context.drawImage(img_unfiledStar, 1360, 475, 70, 70) : context.drawImage(img_filedStar, 1360, 475, 70, 70) };
    { date_3 === undefined ? context.drawImage(img_unfiledStar, 1360, 575, 70, 70) : context.drawImage(img_filedStar, 1360, 575, 70, 70) };
    { date_4 === undefined ? context.drawImage(img_unfiledStar, 1360, 670, 70, 70) : context.drawImage(img_filedStar, 1360, 670, 70, 70) };
    { date_5 === undefined ? context.drawImage(img_unfiledStar, 1360, 770, 70, 70) : context.drawImage(img_filedStar, 1360, 770, 70, 70) };

    context.textAlign = "center"; //Alignment - ie. left, right, center, start, end
    context.fillStyle = "#333"; //Color

    //First number is horizontal, and second number is vertical. Starting from the top left corner!
    context.fillText(jobTitle, 435, 485);
    context.fillText(name, 980, 485);
    context.fillText(certHeader, 710, 355);
    context.fillText(certBody, 710, 570);
    context.fillText(certBody1, 710, 610);
    context.fillText(certBody2, 710, 650);

    // context.font = "normal normal 25px 'Ubuntu Light'"; //The dates need to be a slight lesser size
    context.font = "normal normal 25px 'NotoSans-Light'"; //The dates need to be a slight lesser size
    { date_1 === undefined ? null : context.fillText(date_1, 1525, 425) };
    { date_2 === undefined ? null : context.fillText(date_2, 1525, 522) };
    { date_3 === undefined ? null : context.fillText(date_3, 1525, 620) };
    { date_4 === undefined ? null : context.fillText(date_4, 1525, 717) };
    { date_5 === undefined ? null : context.fillText(date_5, 1525, 814) };

    return canvas.toBuffer();
}
