const fs = require('fs');
const pdfjs = require('pdfjs-dist');

const pdfPath = 'sample1.pdf';
const data = new Uint8Array(fs.readFileSync(pdfPath));

pdfjs.getDocument(data).promise.then(pdf => {
    const numPages = pdf.numPages;
    let text = '';

    // Extract text from each page
    for (let i = 1; i <= numPages; i++) {
        pdf.getPage(i).then(page => {
            return page.getTextContent();
        }).then(content => {
            content.items.forEach(item => {
                text += item.str + ' ';
            });
            
            console.log(`Text on page ${i}:`, text);
        }).catch(err => {
            console.error('Error extracting text:', err);
        });
    }

    
    console.log('Extracted text:', text);
}).catch(err => {
    console.error('Error loading PDF:', err);
});
