const express = require('express');
const router = express.Router();
const ideaValidator = require('../validators/ideaValidator');
const addIdeavalidator = require('../validators/addIdeavalidator');
const updateIdeaValidator = require('../validators/updateIdeaValidator');
const {isAuth} = require('../middleware/auth');

const {
  getAllIdeaController,
  getSingleIdeaController
  ,getNewIdeaForm,
  addIdeaController,
  getEditIdeaForm,
  updateIdeaController,
  deleteIdeaController
} = require('../controllers/ideasControllers');

// all idea route
router.get('/',getAllIdeaController);

// new idea form route
router.get('/new',isAuth,getNewIdeaForm);

// new idea form route
router.post('/',isAuth,[ideaValidator(),addIdeavalidator],addIdeaController);

// edit idea form route
router.get('/:id/edit',isAuth,getEditIdeaForm);

// edit idea route
router.put('/:id',isAuth,[ideaValidator(),updateIdeaValidator],updateIdeaController);

// delete idea route
router.delete('/:id',isAuth,deleteIdeaController);

// single idea route
router.get('/:id',getSingleIdeaController);

module.exports = router;