//users = []
const User = require('../models/user.model');
const bcrypt = require('bcrypt');

async function insert(user) {
    //users.push(user);
    //return user;
    user.hashedPasswords = bcrypt.hashSync(user.password, 10);
    delete user.passwords;
    // make a mongo call to user save in DB
    console.log(`saving user to DB`, user);
    return await new User(user).save();
}

async function getUserByEmailAndPassword(email, password) {
  let user = await User.findOne({ email });
  if (isUserValid(user, password, user.hashedPasswords))
  {
      user = user.toObject();
      delete user.hashedPasswords;
      return user;
  }
  else
  {
    return null;
  }
}

async function getUserById(id)
{
  let user = await User.findById(id);
  if (user)
  {
    user = user.toObject();
    delete user.hashedPasswords;
    return user;
  }
  else
  {
    return null;
  }
}

function isUserValid(user, password, hashedPasswords)
{
  return user && bcrypt.compareSync(password, hashedPasswords);
}

module.exports = {
    insert,
    getUserByEmailAndPassword,
    getUserById
};
