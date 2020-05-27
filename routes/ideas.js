const express = require('express');
const router = express.Router();

const {getAllIdeaController,getSingleIdeaController,getNewIdeaForm,addIdeaController,getEditIdeaForm} = require('../controllers/ideasControllers');

// all idea route
router.get('/',getAllIdeaController);

// new idea form route
router.get('/new',getNewIdeaForm);

// new idea form route
router.post('/',addIdeaController);

// edit idea form route
router.get('/:id/edit',getEditIdeaForm);

// single idea route
router.get('/:id',getSingleIdeaController);

module.exports = router;