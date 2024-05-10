'use strict';

import { actionCardsModel } from './action-cards.model';
import { generatePDF } from './pdfGeneratorforActioncard'; 
import { generateExcel } from './excelGeneratorforActincard';
import pdfjs from 'pdfjs-dist';
import { getDocument } from 'pdfjs-dist'; 
import fs from 'fs';






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


// import fs from 'fs';
// import { getDocument } from 'pdfjs-dist';

// Assuming generateUniqueKey and insert functions are defined elsewhere in your code
// Adjust the functions as per your implementation

// const fs = require('fs');
// const { getDocument } = require('pdfjs-dist');
// const { insert } = require('./your-insert-function'); // Import your insert function from your module

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
