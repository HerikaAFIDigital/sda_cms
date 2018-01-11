import { createCanvas, loadImage, registerFont } from "canvas";
import * as fs from "fs";
import * as Koa from "koa";
import * as moment from "moment";
import * as path from "path";
import { Url } from "url";
import { logger } from "./logger";

const missingParameter = (ctx: Koa.Context, url: Url) => {
    if (!("name" in url.query)) {
        ctx.status = 400;
        ctx.body = "Missing parameter name";
        return true;
    }
    if (!("jobTitle" in url.query)) {
        ctx.status = 400;
        ctx.body = "Missing parameter jobTitle";
        return true;
    }
    if (!("workPlace" in url.query)) {
        ctx.status = 400;
        ctx.body = "Missing parameter workPlace";
        return true;
    }
    if (!("certDate" in url.query)) {
        ctx.status = 400;
        ctx.body = "Missing parameter certDate";
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
        certDate: Number(url.query.certDate),
        jobTitle: url.query.jobTitle,
        name: url.query.name,
        workPlace: url.query.workPlace,
    });
};

interface IProfile {
    certDate: number;
    jobTitle: string;
    name: string;
    workPlace: string;
}

const line1 = "This certificate is granted for successful completion of the certification test and the Safe Delivery App Learning Platform. The certification test has been developed to";
const line2 = "resemble real life clinical situations and is a case-based test consisting of 15 different cases.";
const line3 = "This certification is a proof of proficient knowledge on the 7 BEmONC Signal Functions as the content is provided by the Safe Delivery App.";

const readFilePromise = (file: string) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (!err) {
                resolve(data);
            } else {
                reject(err);
            }
        });
    });
};

const prettyPrintCertDate = (ts: number) => {
    const m = moment(ts);
    return m.format("Do MMMM YYYY");
};

const prettyPrintValidDate = (ts: number) => {
    const m = moment(ts).add(1, "year");
    return m.format("Do MMMM YYYY");
};

async function renderCertificate(profile: IProfile) {
    registerFont(path.join(__dirname, "assets", "EdwardianScriptITC.ttf"), {family: "Edwardian Script ITC"});
    registerFont(path.join(__dirname, "assets", "Arial-BoldMT.ttf"), {family: "Arial", weight: "bold"});
    registerFont(path.join(__dirname, "assets", "Arial-ItalicMT.ttf"), {family: "Arial", style: "italic"});
    const canvas = createCanvas(1920, 1357);
    const context = canvas.getContext("2d");

    const p2 = path.join(__dirname, "assets", "Diplom.png");
    const img = await loadImage(p2);
    context.drawImage(img, 0, 0, 1920, 1357);

    context.font = "normal normal 64px EdwardianScriptITC";
    context.textAlign = "center";
    context.fillStyle = "#333";
    context.fillText(profile.name, 960, 155);

    context.fillText(profile.workPlace, 490, 246);
    context.fillText(profile.jobTitle, 1430, 246);

    const obtainedDate = prettyPrintCertDate(profile.certDate);
    const obtainedString = `${profile.name} has obtained the Safe Delivery App certification on ${obtainedDate}.`;

    context.font = "normal bold 21px Arial";
    context.textAlign = "center";
    context.fillStyle = "#000";
    context.fillText(obtainedString, 960, 330);

    context.font = "italic normal 21px Arial";
    context.textAlign = "center";
    context.fillStyle = "#000";
    context.fillText(line1, 960, 380);
    context.fillText(line2, 960, 405);
    context.fillText(line3, 960, 450);

    const validToDate = prettyPrintValidDate(profile.certDate);
    context.font = "normal bold 21px Arial";
    context.textAlign = "center";
    context.fillStyle = "#000";
    context.fillText(`This certificate is viable until ${validToDate}.`, 960, 890);
    context.fillText("The certification is granted by Maternity Foundation, Copenhagen University and University of South Denmark.", 960, 950);
    // context.fillText("In collaboration with", 960, 1010);

    return canvas.toBuffer();
}
