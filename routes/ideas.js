const express = require('express');
const router = express.Router();

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
router.get('/new',getNewIdeaForm);

// new idea form route
router.post('/',addIdeaController);

// edit idea form route
router.get('/:id/edit',getEditIdeaForm);

// edit idea route
router.put('/:id',updateIdeaController);

// delete idea route
router.delete('/:id',deleteIdeaController);

// single idea route
router.get('/:id',getSingleIdeaController);

module.exports = router;