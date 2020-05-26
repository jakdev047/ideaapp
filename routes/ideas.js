const express = require('express');
const router = express.Router();

const {getAllIdeaController,getSingleIdeaController} = require('../controllers/ideasControllers');

// all idea route
router.get('/',getAllIdeaController);

// single idea route
router.get('/:id',getSingleIdeaController);

module.exports = router;