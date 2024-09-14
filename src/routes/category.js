const express = require('express');
const { getAll, getDetail, remove, create, update } = require('../controller/category');
const categoryRouter = express.Router();


categoryRouter.get('/', getAll);
categoryRouter.get('/:id', getDetail);
categoryRouter.delete('/:id', remove);
categoryRouter.post('/', create);
categoryRouter.put('/:id', update);

module.exports = categoryRouter;