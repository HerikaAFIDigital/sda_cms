
import PDFDocument from 'pdfkit';
import fs from 'fs';
import ExcelJS from 'exceljs'; 

export function generateExcel(drugsData) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Drugs');

  
  worksheet.columns = [
    { header: 'Index', key: 'index', width: 10 },
    { header: 'Description', key: 'description', width: 40 },
  ];

  
  drugsData.forEach((drug, index) => {
    worksheet.addRow({ index: index + 1, description: drug.description });
  });

  
  workbook.xlsx.writeFile('drugs_list1.xlsx').then(() => {
    console.log('Excel file generated successfully');
  });
}
