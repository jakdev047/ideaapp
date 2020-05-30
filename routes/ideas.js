const express = require('express');
const router = express.Router();
const {check} = require('express-validator');

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
router.post('/',[
  check('title').trim().notEmpty().withMessage('Title is required').isLength({min:5,max:50}).withMessage('Title is required & must be 5 to 50 character'),
  check('description').trim().notEmpty().withMessage('Description is required').isLength({min:10}).withMessage('Description is required & must be 10 character'),
  check('status').notEmpty().isIn(['public','private'])],addIdeaController);

// edit idea form route
router.get('/:id/edit',getEditIdeaForm);

// edit idea route
router.put('/:id',[
  check('title').trim().notEmpty().withMessage('Title is required').isLength({min:5,max:50}).withMessage('Title is required & must be 5 to 50 character'),
  check('description').trim().notEmpty().withMessage('Description is required').isLength({min:10}).withMessage('Description is required & must be 10 character'),
  check('status').notEmpty().isIn(['public','private'])],updateIdeaController);

// delete idea route
router.delete('/:id',deleteIdeaController);

// single idea route
router.get('/:id',getSingleIdeaController);

module.exports = router;