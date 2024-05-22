'use strict';

import { actionCardsModel } from './action-cards.model';
import { generatePDF } from './pdfGeneratorforActioncard'; 
import { generateExcel } from './excelGeneratorforActincard';
import pdfjs from 'pdfjs-dist';
import { getDocument } from 'pdfjs-dist'; 
import fs from 'fs';
const ExcelJS = require('exceljs');
import PDFDocument from 'pdfkit';
import { parse } from 'node-html-parser';



export const index = async (ctx, next) => {
  const langId = ctx.query.langId;
  const showAll = ctx.query.showAll === 'true';
  let data = await actionCardsModel.list(langId, ctx.role, ctx.role === 'admin' && showAll);
  ctx.status = 200;
  ctx.body = data;
  await next();
};

export const put = async (ctx, next) => {
  let data = await actionCardsModel.update(ctx.userId, ctx.request.body);
  ctx.status = 200;
  ctx.body = data;
  await next();
};

export const post = async (ctx, next) => {
  let data = await actionCardsModel.insert(ctx.userId, ctx.request.body);
  ctx.status = 200;
  ctx.body = data;
  await next();
};

export const get = async (ctx, next) => {
  let data = await actionCardsModel.find(ctx.params.cardKey, ctx.query.langId, ctx.role, ctx.role === 'admin');
  ctx.status = 200;
  ctx.body = data;
  await next();
};

export const del = async (ctx, next) => {
  let data = await actionCardsModel.remove(ctx.params.cardKey);
  ctx.status = 200;
  ctx.body = {ok: true};
  await next();
};


export const generatePDFController = async (ctx, next) => {
  try {
    const langId = ctx.query.langId;
    const showAll = ctx.query.showAll === 'true';
    let actioncardData = await actionCardsModel.list(langId, ctx.role, ctx.role === 'admin' && showAll);
    console.log("hello");
    console.log(actioncardData);
    generatePDF(actioncardData); 
    ctx.status = 200;
    ctx.body = { message: 'PDF generated successfully' };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to generate PDF' };
  }
  await next();
};

export const generateExcelController = async (ctx, next) => {
  try {
    const langId = ctx.query.langId;
    const showAll = ctx.query.showAll === 'true';
    let actioncardData = await actionCardsModel.list(langId, ctx.role, ctx.role === 'admin' && showAll);
    console.log(actioncardData);
    generateExcel(actioncardData); 
    ctx.status = 200;
    ctx.body = { message: 'Excel generated successfully' };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to generate Excel' };
  }
  await next();
};

function generateUniqueKey(name) {
  
  return name.replace(/\s+/g, '-').toLowerCase();
}




function generateUniqueKey(name) {
  
  return name.replace(/\s+/g, '-').toLowerCase();
}


export const importActioncardFromPDFController = async (ctx, next) => {
  const pdfPath = 'actioncard.pdf';
  const data = new Uint8Array(fs.readFileSync(pdfPath));

  try {
      const pdf = await getDocument(data).promise;
      const numPages = pdf.numPages;

      for (let i = 1; i <= numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();

          
          for (const item of content.items) {
              const actioncardName = item.str;
              const actioncardDescription = item.str; 
              const actioncardLangId = ''; 

              
              const actioncardKey = generateUniqueKey(actioncardName);

              
              try {
                  const newActioncard = {
                      key: actioncardKey, 
                      name: actioncardName,
                      description: actioncardDescription,
                      langId: actioncardLangId
                  };
                  // await insert(ctx.userId, newActioncard); 
                  await actionCardsModel.insert(ctx.userId, newActioncard);

              } catch (error) {
                  console.error(`Error inserting medicine "${actioncardName}" on page ${i}:`, error);
              }
          }
      }

      ctx.status = 200;
      ctx.body = { message: 'PDF imported successfully' };
  } catch (error) {
      console.error('Error importing PDF:', error);
      ctx.status = 500;
      ctx.body = { error: 'Failed to import PDF' };
  }

  await next();
};




export const importActioncardFromExcelController = async (ctx, next) => {
  const excelPath = 'actioncard2.xls.xlsx'; 

  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(excelPath);
    const worksheet = workbook.getWorksheet(1); 

    worksheet.eachRow(async (row, rowNumber) => {
      // if (rowNumber === 1) return;
      
      const actioncardName = row.getCell(1).value; 
      const actioncardDescription = row.getCell(1).value; 
      const actioncardLangId = ''; 

      const actioncardKey = generateUniqueKey(actioncardName);

      try {
        const newActioncard = {
          key: actioncardKey,
          name: actioncardName,
          description: actioncardDescription,
          langId: actioncardLangId
        };
        // await insert(ctx.userId, newActioncard); 
        await actionCardsModel.insert(ctx.userId, newActioncard);
        console.log("hellooo");
        

      } catch (error) {
        console.error(`Error inserting actioncard "${actioncardName}":`, error);
      }
    });

    ctx.status = 200;
    ctx.body = { message: 'Excel imported successfully' };
  } catch (error) {
    console.error('Error importing Excel:', error);
    ctx.status = 500;
    ctx.body = { error: 'Failed to import Excel' };
  }

  await next();
};







export const generatePDFwithTranslatedData = async (ctx, next) => {
  const doc = new PDFDocument();
  const filename = 'actioncard_with_adapted_and_translated_data5.pdf';
  const filePath = `${filename}`;
  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);
  const hindiFontPath = 'NotoSansDevanagari\\static\\NotoSansDevanagari-Regular.ttf'; 
  doc.registerFont('NotoSansDevanagari', hindiFontPath);

  try {
    const titleFont = 'Helvetica-Bold';
    const contentFont = 'Helvetica';
    const hindifont = 'NotoSansDevanagari';
    

    const fontSizeTitle = 20;
    const fontSizeSubtitle = 16;
    const fontSizeText = 12;
    const margin = 50;

    const data = await actionCardsModel.list(ctx.query.langId, ctx.role, ctx.role === 'admin' && ctx.query.showAll === 'true');
    if (!data) {
      throw new Error('No data retrieved from the list function');
    }

    doc.fontSize(fontSizeTitle).font(titleFont).text(`Actioncard Details of LangId: ${ctx.query.langId}`, { align: 'center' }).moveDown();

    const renderTableToPDF = (doc, htmlContent) => {
      const root = parse(htmlContent);
      const tables = root.querySelectorAll('table');

      tables.forEach(table => {
        const rows = table.querySelectorAll('tr');
        rows.forEach(row => {
          const columns = row.querySelectorAll('td, th');
          columns.forEach((column, index) => {
            doc.text(column.text.trim(), { continued: index !== 0 });
          });
          doc.moveDown();
        });
      });
    };

    data.forEach(chapter => {
      if (!chapter) return;
      doc.fontSize(fontSizeSubtitle).font(titleFont).text(`Description: ${chapter.description || ''}`).moveDown();
      (chapter.chapters || []).forEach(chapter => {
        if (!chapter) return;
        doc.fontSize(fontSizeSubtitle).font(titleFont).text(`Chapter Key: ${chapter.key || ''}`).moveDown();
        (chapter.cards || []).forEach(card => {
          if (!card) return;
          doc.fontSize(fontSizeText).font(contentFont).text(`Card ID: ${card.id || ''}`).moveDown();

          if (card.type === "table") {
            if (card.content && card.content.html) {
              renderTableToPDF(doc, card.content.html);
            } else if (card.translated && card.translated.html) {
              renderTableToPDF(doc, card.translated.html); // Render translated table
            } else if (card.adapted && card.adapted.html) {
              renderTableToPDF(doc, card.adapted.html); 
            }
          } else {
            const logBlockTexts = (label, blocks) => {
              if (blocks && blocks.length > 0) {
                const validBlocks = blocks.filter(block => block && block.text);
                if (validBlocks.length > 0) {
                  const text = validBlocks.map(block => block.text).join('\n');
                  console.log(`Rendering ${label} Text:`, text);
                  doc.fontSize(fontSizeText).font(contentFont).text(`${label}: ${text}`).moveDown();
                }
              }
            };

            if (card.content && card.content.blocks) {
              logBlockTexts('Master', card.content.blocks);
            }
            if (card.adapted && card.adapted.blocks) {
              logBlockTexts('Adapted', card.adapted.blocks);
            }

            if (card.translated && card.translated.blocks && card.translated.blocks.length > 0) {
              const translatedBlocks = card.translated.blocks.filter(block => block && block.text);
              if (translatedBlocks.length > 0) {
                const translatedText = translatedBlocks.map(block => block.text).join('\n');
                console.log('Rendering Translated Text:', translatedText);
                try {
                  doc.fontSize(fontSizeText).font(hindifont).text(`Translated: ${translatedText}`).moveDown();
                } catch (err) {
                  console.error('Error rendering translated text:', err);
                }
              }
            } else {
              console.log('Translated text missing for card ID:', card.id); 
            }
          }

          doc.moveDown(2);
        });
      });
    });

    doc.end();

    ctx.status = 200;
    ctx.body = { success: true, filePath };
  } catch (error) {
    console.error('Error retrieving data from the database:', error);
    ctx.status = 500;
    ctx.body = { success: false, error: 'Internal server error' };
  }

  await next();
};



