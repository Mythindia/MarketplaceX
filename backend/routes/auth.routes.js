const express = require('express');
const AuthController = require('../controllers/auth.controller');
const { validateRegistration, validateLogin } = require('../middleware/validation.middleware');

const router = express.Router();

// POST /api/auth/register
router.post('/register', validateRegistration, AuthController.register);

// POST /api/auth/login
router.post('/login', validateLogin, AuthController.login);

module.exports = router;
