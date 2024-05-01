'use strict';

import { list, update, insert, remove, find } from './drugs.model';
import { generatePDF } from './pdfGenerator'; 
import { generateExcel } from './excelGenerator'; 

export const index = async (ctx, next) => {
  const langId = ctx.query.langId;
  const showAll = ctx.query.showAll === 'true';
  let data = await list(langId, showAll);
  console.log("List drugs - got this many:", data.length);
  ctx.status = 200;
  ctx.body = data;
  await next();
};

export const put = async (ctx, next) => {
  let data = await update(ctx.userId, ctx.request.body);
  ctx.status = 200;
  ctx.body = data;
  await next();
};

export const post = async (ctx, next) => {
  let data = await insert(ctx.userId, ctx.request.body);
  ctx.status = 200;
  ctx.body = data;
  await next();
};

export const get = async (ctx, next) => {
  let data = await find(ctx.params.drugKey, ctx.query.langId, true);
  ctx.status = 200;
  ctx.body = data;
  await next();
};

export const del = async (ctx, next) => {
  let data = await remove(ctx.params.drugKey);
  ctx.status = 200;
  ctx.body = { ok: true };
  await next();
};


export const generatePDFController = async (ctx, next) => {
  try {
    const drugsData = await list(ctx.query.langId, ctx.query.showAll === 'true');
    console.log(drugsData);
    generatePDF(drugsData); 
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
    const drugsData = await list(ctx.query.langId, ctx.query.showAll === 'true');
    console.log(drugsData);
    generateExcel(drugsData); 
    ctx.status = 200;
    ctx.body = { message: 'Excel generated successfully' };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to generate Excel' };
  }
  await next();
};