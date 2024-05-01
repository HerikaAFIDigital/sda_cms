// pdfGenerator.js

import PDFDocument from 'pdfkit';
import fs from 'fs';

export function generatePDF(drugsData) {
  


  const doc = new PDFDocument();
  const stream = doc.pipe(fs.createWriteStream('drugs_list1.pdf'));

  doc.fontSize(20).text('List of Drugs', { align: 'center' });
  doc.moveDown();
  

  drugsData.forEach((drug, index) => {
    doc.fontSize(14).text(`${index + 1}. ${drug.description}`);
    doc.moveDown();
  });

  doc.end();
}
