// pdfGenerator.js

import PDFDocument from 'pdfkit';
import fs from 'fs';

export function generatePDF(actioncardData) {
  


  const doc = new PDFDocument();
  const stream = doc.pipe(fs.createWriteStream('actioncard_list.pdf'));
  doc.font('Helvetica');


  doc.fontSize(20).text('List of Actioncards', { align: 'center' });
  doc.moveDown();
  

  actioncardData.forEach((actioncard, index) => {
    doc.fontSize(14).text(`${index + 1}. ${actioncard.description}`);
    doc.moveDown();
  });

  doc.end();
}
