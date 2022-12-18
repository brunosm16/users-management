const jwt = require('jsonwebtoken');
const environment = require('../config/environment.js');

const { jwtAccessToken, jwtRefreshToken } = environment;

const DEFAULT_EXPIRATION = '1d';

const generateAccessToken = (payload, options = {}) => {
  const { expiresIn = DEFAULT_EXPIRATION } = options;

  return jwt.sign(payload, jwtAccessToken, { expiresIn });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, jwtRefreshToken);
};

const verifyAccessToken = (accessToken) => {
  return jwt.verify(accessToken, jwtAccessToken);
};

const verifyRefreshToken = (refreshToken) => {
  return jwt.verify(refreshToken, jwtRefreshToken);
};

module.exports = { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken };
