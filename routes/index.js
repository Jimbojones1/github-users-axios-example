var express = require('express');
var router = express.Router();
const githubAPIController = require('../controllers/github-api')


/* GET home page. */
router.get('/', githubAPIController.index) 

module.exports = router;

