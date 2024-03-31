var express = require('express');
var router = express.Router();
var db = require("../config/database");
const UserError = require("../helpers/error/UserError");
const {successPrint, errorPrint} = require("../helpers/debug/debugprinters");
var bcrypt = require("bcrypt");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
