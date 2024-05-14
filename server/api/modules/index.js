'use strict';

import { index, del, put, get, post,generatePDFController } from './modules.controller';
import router from 'koa-router';

const modules = router();

modules.get('/', index);
modules.put('/', put);
modules.get('/:moduleKey', get);
modules.post('/', post);
modules.delete('/:moduleKey', del);
modules.get('/module-wise-export',generatePDFController)



export default modules;
