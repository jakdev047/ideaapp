const express = require('express');
const router = express.Router();

const {getAllIdeaController,getSingleIdeaController,getNewIdeaForm} = require('../controllers/ideasControllers');

// all idea route
router.get('/',getAllIdeaController);

// new idea form route
router.get('/new',getNewIdeaForm);

// single idea route
router.get('/:id',getSingleIdeaController);

module.exports = router;