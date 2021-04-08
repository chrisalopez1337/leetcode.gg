const express = require('express');
const javascriptRouter = express.Router();
const controllers = require('../controllers/javascriptCodeControllers.js');

javascriptRouter.post('/eval-code', controllers.evalCode);
javascriptRouter.post('/eval-all', controllers.evalMultiple);

module.exports = javascriptRouter;
