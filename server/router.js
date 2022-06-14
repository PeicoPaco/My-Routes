const router = require('express').Router();
const userController = require('./controllers/user');
const authMiddleware = require('./middleware/auth');

// add the paths for register, login, me, and logout here

// REMOVE-START
router.post('/register', userController.create);
router.post('/login', userController.login);
router.get('/me', authMiddleware, userController.profile);
// REMOVE-END

module.exports = router;
