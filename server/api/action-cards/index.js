'use strict';

import { index, del, put, get, post, generatePDFController, generateExcelController, importActioncardFromPDFController } from './action-cards.controller';
import router from 'koa-router';

const actionCards = router();

actionCards.get('/', index);
actionCards.put('/', put);
actionCards.get('/:cardKey', get);
actionCards.post('/', post);
actionCards.delete('/:cardKey', del);
actionCards.get('/export-actioncards-pdf', generatePDFController);
actionCards.get('/export-actioncard-excel', generateExcelController);
actionCards.post('/import-actioncard-pdf', importActioncardFromPDFController);




export default actionCards;
