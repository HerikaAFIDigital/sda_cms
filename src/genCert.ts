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
    // if (missingParameter(ctx, url)) {
    //     return;
    // }

    // console.log("Rudi - inde i handleGeneration er ctx nu: ", ctx);
    console.log("Rudi - inde i handleGeneration er ctx.request.body nu: ", ctx.request.body);
    console.log("Rudi - inde i handleGeneration er ctx.request.body nu: ", ctx.request.body);
    // console.log("Rudi - inde i handleGeneration er url nu: ", url);

    ctx.type = "png";
    ctx.body = await renderCertificate({
        // certDate: Number(url.query.certDate), //might need to be certDates, ie. an array of dates?
        jobTitle: ctx.request.body.jobTitle,
        name: ctx.request.body.name,
        // workPlace: url.query.workPlace, //This need to go out with the new cert
        certHeader: ctx.request.body.certHeader,
        certBody: ctx.request.body.certBody,
        certBody1: ctx.request.body.certBody1,
        certBody2: ctx.request.body.certBody2,
        // certificates: url.query.certificates,
        certDates: ctx.request.body.certDates,
        // certHeader2: url.query.certHeader2,
        // certBoby: url.query.certBoby,
        // numberOfCertStars: url.query.numberOfCertStars, //This might be unnessary, it can bu calculated from the certDates?
    });
};

interface IProfile {
    // certDate: number;
    jobTitle: string;
    name: string;
    // workPlace: string; //This need to go out with the new cert
    certHeader: string;
    certBody: string;
    certBody1: string;
    certBody2: string;

    // certificates?: [];
    certDates: [];
    // certHeader2: string;
    // certBoby: string;
    // numberOfCertStars: number; //This might be unnessary, it can bu calculated from the certDates?
}

const line1 = "The certification test has been developed to resemble real life clinical situations and is a comprehensive case-based test."; //This needs to come from the app, and ultimatly from the CMS
const _certHeader2 = "This certificate is granted to"; //This needs to come from the app, and ultimatly from the CMS
const line2 = "This certificate is granted for successful completion of the certification test in the Safe Delivery App."; //This needs to come from the app, and ultimatly from the CMS
const _certBody = "For succeddfully completing the MyLearning"; //This needs to come from the app, and ultimatly from the CMS
const _certBody1 = "certificate exam in the Safe Dilivery App"; //This needs to come from the app, and ultimatly from the CMS
const _certBody2 = "and earning the title of:"; //This needs to come from the app, and ultimatly from the CMS
const line3 = "This certification is a proof of proficient knowledge on the 7 Basic Emergency Obstetric and Neonatal care Signal Functions."; //This needs to come from the app, and ultimatly from the CMS
const lenghtTest = "Rudi Andreassen Bragt";
const _certJobTitle = "App Developer";
const dates = ['15.05.2019', '20.06.2019', '25.07.2019', '30.08.2019', '15.09.2019'];
const date_1 = dates[0];
const date_2 = dates[1];
const date_3 = dates[2];
const date_4 = undefined;
const date_5 = undefined;



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

    let { jobTitle, name, certHeader, certBody, certBody1, certBody2, certDates } = profile;
    console.log("Rudi - inde i renderCertificate er profile nu: ", profile);
    console.log("Rudi - inde i renderCertificate er certDates nu: ", certDates);

    const _certDates = certDates; //Make new local version of the certDates array
    _certDates.slice(Math.max(_certDates.length - 5, 1)); //Get the latest 5 entries
    const prettyPrintedDates = _certDates.map((date, index) => { //Map though and prettyPrint the dates
        return (
            prettyPrintCertDate(date)
        )
    })

    console.log("Rudi - inde i renderCertificate er countriesList nu: ", prettyPrintedDates[2]);
    
    const date_1 = prettyPrintedDates[0];
    const date_2 = prettyPrintedDates[1];
    const date_3 = prettyPrintedDates[2];
    const date_4 = prettyPrintedDates[3];
    const date_5 = prettyPrintedDates[4];

    // registerFont(path.join(__dirname, "assets", "EdwardianScriptITC.ttf"), {family: "Edwardian Script ITC"});
    // registerFont(path.join(__dirname, "assets", "FanwoodText-Italic.ttf"), { family: "Fanwood Text", style: "italic" });
    // registerFont(path.join(__dirname, "assets", "Arial-BoldMT.ttf"), { family: "Arial", weight: "bold" });
    // registerFont(path.join(__dirname, "assets", "Arial-ItalicMT.ttf"), { family: "Arial", style: "italic" });
    registerFont(path.join(__dirname, "assets", "Ubuntu-Light.ttf"), { family: "Ubuntu Light", style: "normal" });

    const canvas = createCanvas(1920, 1357); //Set the dimentions for the canvas
    const context = canvas.getContext("2d");
    // context.fillStyle = 'white'; //Make the background of the canvas white
    // context.fillRect(0, 0, 1920, 1357); //Make the background of the canvas white and fill the whole canvas

    // const p2 = path.join(__dirname, "assets", "Diplom.png");
    // const p2 = path.join(__dirname, "assets", "Diplom2.png");
    // const p2 = path.join(__dirname, "assets", "test.png");
    // const p2 = path.join(__dirname, "assets", "Certificate_2019_tom.png");
    const p2 = path.join(__dirname, "assets", "New_certificate.png");
    const img = await loadImage(p2);
    context.drawImage(img, 0, 0, 1920, 1357);

    // const unfilledStar = path.join(__dirname, "assets", "Certificate2019_tom_stjerne.png");
    // const filledStar = path.join(__dirname, "assets", "Certificate2019_gul_stjerne.png");
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

    context.font = "normal normal 30px 'Ubuntu Light'"; //Use the custom font 'Ubuntu Light' for all the text's
    context.textAlign = "center"; //Alignment - ie. left, right, center, start, end
    context.fillStyle = "#333"; //Color

    //First number is horizontal, and second number is vertical. Starting from the top left corner!
    context.fillText(jobTitle, 435, 485);
    context.fillText(name, 980, 485); //This need to be the name comming from the App!
    context.fillText(certHeader, 710, 355);
    context.fillText(certBody, 710, 570); //This need to be the certBody comming from the App!
    context.fillText(certBody1, 710, 610); //This need to be the certBody comming from the App!
    context.fillText(certBody2, 710, 650); //This need to be the certBody comming from the App!

    context.font = "normal normal 25px 'Ubuntu Light'"; //The dates need to be a slight lesser size
    { date_1 === undefined ? null : context.fillText(date_1, 1525, 425) };
    { date_2 === undefined ? null : context.fillText(date_2, 1525, 522) };
    { date_3 === undefined ? null : context.fillText(date_3, 1525, 620) };
    { date_4 === undefined ? null : context.fillText(date_4, 1525, 717) };
    { date_5 === undefined ? null : context.fillText(date_5, 1525, 814) };

    // const obtainedDate = prettyPrintCertDate(profile.certDate);
    // const obtainedString = `${profile.name} has obtained the Safe Delivery certificate on ${obtainedDate}.`;

    // context.font = "normal bold 21px Arial";
    // context.textAlign = "center";
    // context.fillStyle = "#000";
    // // context.fillText(obtainedString, 960, 330);

    // context.font = "italic normal 21px Arial";
    // context.textAlign = "center";
    // context.fillStyle = "#000";
    // // context.fillText(line1, 960, 380);
    // // context.fillText(line2, 960, 405);
    // // context.fillText(line3, 960, 450);

    // const validToDate = prettyPrintValidDate(profile.certDate);
    // context.font = "normal bold 21px Arial";
    // context.textAlign = "center";
    // context.fillStyle = "#000";
    // // context.fillText(`This certificate is viable until ${validToDate}.`, 960, 890);
    // // context.fillText("The certification is granted by Maternity Foundation, Copenhagen University and University of Southern Denmark.", 960, 950);
    // // context.fillText("In collaboration with", 960, 1010);

    return canvas.toBuffer();
}
