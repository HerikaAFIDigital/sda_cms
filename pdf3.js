const fs = require('fs');
const PDFDocument = require('pdfkit');

const medicines = [
    'Citrigin',
    // 'Aspirin',
    // 'Ibuprofen',
    // Add more medicines as needed
];

const doc = new PDFDocument();
const outputPath = 'sample1.pdf';

const stream = fs.createWriteStream(outputPath);
doc.pipe(stream);

medicines.forEach((medicine) => {
    
    doc.fontSize(20).text(medicine, { align: 'center' });
    doc.moveDown(0.5);
});

doc.end();
console.log(`PDF file generated at ${outputPath}`);
