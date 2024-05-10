
import PDFDocument from 'pdfkit';
import fs from 'fs';
import ExcelJS from 'exceljs'; 

export function generateExcel(actioncardData) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Actioncard');

  
  worksheet.columns = [
    { header: 'Index', key: 'index', width: 10 },
    { header: 'Description', key: 'description', width: 40 },
  ];

  
  actioncardData.forEach((actioncard, index) => {
    worksheet.addRow({ index: index + 1, description: actioncard.description });
  });

  
  workbook.xlsx.writeFile('actioncard_listt.xlsx').then(() => {
    console.log('Excel file generated successfully');
  });
}
