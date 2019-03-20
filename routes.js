const express = require("express");
var bodyParser = require("body-parser");
const controller = require("./controller");

const router = express.Router();



router.get('/',controller.getHome);
router.get('/view_file',controller.getFileData)

module.exports = router;