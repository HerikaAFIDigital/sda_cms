const fs = require('fs');
const PDFDocument = require('pdfkit');

const actioncards = [
    'action card 5',
    
    
];

const doc = new PDFDocument();
const outputPath = 'actioncard.pdf';

const stream = fs.createWriteStream(outputPath);
doc.pipe(stream);

actioncards.forEach((actioncard) => {
    
    doc.fontSize(20).text(actioncard, { align: 'center' });
    doc.moveDown(0.5);
});

doc.end();
console.log(`PDF file generated at ${outputPath}`);
