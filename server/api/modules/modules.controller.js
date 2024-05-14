'use strict';

import { list, update, insert, remove, find } from './modules.model';
import PDFDocument from 'pdfkit';
import fs from 'fs';




export const index = async (ctx, next) => {
  const langId = ctx.query.langId;
   let data = await list(langId, ctx.role);
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
  let data = await find(ctx.params.moduleKey, ctx.query.langId, ctx.role);
  ctx.status = 200;
  ctx.body = data;
  await next();
};

export const del = async (ctx, next) => {
  let data = await remove(ctx.params.moduleKey);
  ctx.status = 200;
  ctx.body = {ok: true};
  await next();
};




export const generatePDFController = async (ctx, next) => {
  
  const doc = new PDFDocument();
  const filename = 'modulewise_data.pdf';
  const filePath = `${filename}`; 

  
  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  
  doc.fontSize(20).text('Module-wise Data', { align: 'center' }).moveDown();

  const langId = ctx.query.langId;

  let modulesData = await list(langId, ctx.role);
   ctx.status = 200;
   ctx.body = modulesData;
   console.log(modulesData)


modulesData.forEach(module => {
  
  doc.fontSize(16).text(`Module: ${module.description}`);
  doc.text(`Icon: ${module.icon}`);
  doc.text(`Module Key: ${module.key}`);
  doc.text(`lanId: ${module.langId}`);
  
  
  if (module.actionCards.length > 0) {
      doc.moveDown();
      doc.text('Action Cards:');
      module.actionCards.forEach(actionCard => {
          doc.text(`- ${actionCard}`);
      });
      doc.moveDown();
  }

  
  if (module.procedures.length > 0) {
      doc.moveDown();
      doc.text('Procedures:');
      module.procedures.forEach(procedure => {
          doc.text(`- ${procedure}`);
      });
      doc.moveDown();
  }

  
  if (module.videos.length > 0) {
      doc.moveDown();
      doc.text('Videos:');
      module.videos.forEach(video => {
          doc.text(`- ${video}`);
      });
      doc.moveDown();
  }

  
  if (module.drugs.length > 0) {
      doc.moveDown();
      doc.text('Drugs:');
      module.drugs.forEach(drug => {
          doc.text(`- ${drug}`);
      });
      doc.moveDown();
  }

  
  if (module.keyLearningPoints.length > 0) {
      doc.moveDown();
      doc.text('Key Learning Points:');
      module.keyLearningPoints.forEach(point => {
          doc.text(`- ${point}`);
      });
      doc.moveDown();
  }

  
  doc.moveDown();
});


  
   

  
  doc.end();

  
  ctx.status = 200;
  ctx.body = { success: true, filePath };

  await next();
};

const getModuleWiseData = async (langId) => {
  try {
    
    const modulesData = await find({ langId: langId });
    console.log("hello");
    console.log(modulesData)

    return modulesData; 
  } catch (error) {
    
    console.error('Error fetching module-wise data:', error);
    throw error; 
  }
};
