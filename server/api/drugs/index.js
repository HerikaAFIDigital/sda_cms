'use strict';

import { index, del, put, get, post,generatePDFController } from './drugs.controller';
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

export default drugs;
