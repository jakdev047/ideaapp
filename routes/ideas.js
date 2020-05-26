const express = require('express');
const router = express.Router();

const {getAllIdeaController} = require('../controllers/ideasControllers');

// all idea route
router.get('/',getAllIdeaController);

module.exports = router;