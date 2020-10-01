//Routes for user autenticate 
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auths = require('../middleware/auths');

//Log in
//api/auth
router.post('/',
    authController.autenticarUsuario
);

//obtain the authenticated user
router.get('/',
    auths,
    authController.usuarioAutenticado
)

module.exports =  router;