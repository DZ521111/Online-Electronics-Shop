const express = require('express');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const uc = require('../controllers/user.controller');
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const passport = require('../middleware/passport');


const router = express.Router();

// api path: localhost:4040/api/auth/register
router.post('/register', asyncHandler(insert), login);

// login api path
router.post('/login', passport.authenticate('local', {session: false}), login);

// findme
router.get('/findme', passport.authenticate('jwt', {session: false}), login);


async function insert(req, res, next) {
    const user = req.body;
    console.log(`Registering user`, user);
    req.user = await uc.insert(user);
    next();
}

async function getUserByEmailAndPassword(req, res, next)
{
  const user = req.body;
  console.log(`searching the user`, user);
  const su = await userController.getUserByEmailAndPassword(user.email, user.password);
  req.user = su;
  next();
}

async function login(req, res)
{
  const user = await req.user;
  const token = authController.generateToken(user);
  console.log(user, token);
  return res.json({user, token});
}



module.exports = router;
