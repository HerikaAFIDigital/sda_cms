'use strict';

import { list, update, insert, remove, find } from './drugs.model';
import { generatePDF } from './pdfGenerator'; 
import { generateExcel } from './excelGenerator'; 
import fs from 'fs';
import pdfjs from 'pdfjs-dist';
import { importDrugsFromPDF } from './drugs.model';
import { getDocument } from 'pdfjs-dist'; 



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






// export const importDrugsFromPDFController = async (ctx, next) => {
//     const pdfPath = 'sample1.pdf';
//     const data = new Uint8Array(fs.readFileSync(pdfPath));

//     try {
//         const pdf = await pdfjs.getDocument(data).promise;
//         const numPages = pdf.numPages;
//         let text = '';

//         // Extract text from each page
//         for (let i = 1; i <= numPages; i++) {
//             const page = await pdf.getPage(i);
//             const content = await page.getTextContent();
//             content.items.forEach(item => {
//                 text += item.str + ' ';
//             });
//             // Output text for each page (optional)
//             console.log(`Text on page ${i}:`, text);
//         }

//         // Output entire text (optional)
//         console.log('Extracted text:', text);
        
//         // Respond with success message
//         ctx.status = 200;
//         ctx.body = { message: 'PDF imported successfully' };
//     } catch (error) {
//         // Handle errors
//         console.error('Error importing PDF:', error);
//         ctx.status = 500;
//         ctx.body = { error: 'Failed to import PDF' };
//     }

//     await next();
// };



function generateUniqueKey(name) {
  
  return name.replace(/\s+/g, '-').toLowerCase();
}


export const importDrugsFromPDFController = async (ctx, next) => {
  const pdfPath = 'sample1.pdf';
  const data = new Uint8Array(fs.readFileSync(pdfPath));

  try {
      const pdf = await getDocument(data).promise;
      const numPages = pdf.numPages;

      for (let i = 1; i <= numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();

          
          for (const item of content.items) {
              const medicineName = item.str;
              const medicineDescription = item.str; 
              const medicineLangId = ''; 

              
              const medicineKey = generateUniqueKey(medicineName);

              
              try {
                  const newMedicine = {
                      key: medicineKey, 
                      name: medicineName,
                      description: medicineDescription,
                      langId: medicineLangId
                  };
                  await insert(ctx.userId, newMedicine); 
              } catch (error) {
                  console.error(`Error inserting medicine "${medicineName}" on page ${i}:`, error);
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
