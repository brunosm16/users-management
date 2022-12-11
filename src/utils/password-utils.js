import bcrypt from 'bcrypt';
import environment from '../config/environment.js';

const { saltRound } = environment;

const hashPassword = async (password) => {
  return bcrypt.hash(password, saltRound);
};

const comparePasswords = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

module.exports = { hashPassword, comparePasswords };
