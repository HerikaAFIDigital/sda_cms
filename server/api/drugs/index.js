'use strict';

import { index, del, put, get, post,generatePDFController,importDrugsFromPDFController } from './drugs.controller';
import router from 'koa-router';
import { generateExcelController } from './drugs.controller'; 





const drugs = router();

drugs.get('/', index);
drugs.put('/', put);
drugs.get('/:drugKey', get);
drugs.post('/', post);
drugs.delete('/:drugKey', del);
drugs.get('/pdf', generatePDFController);
drugs.get('/excel', generateExcelController);
// drugs.post('/import-pdf', upload.single('pdfFile'), importDrugsFromPDFController);
drugs.post('/import-pdf', importDrugsFromPDFController);




export default drugs;



