const { PORT, NODE_ENV, SALT_ROUND, JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN } = process.env;

const defaultAccessToken =
  '7ed8cc9d493286e316e80e8c091a564c9ea165e22c5112ffaa0df3437ed120c2ba5bb320c8ff08280bfceff295a0cce50ed06cbec6d8545bb9db742904993172';

const defaultRefreshToken =
  '0f5b490b159d24c8a2583db1bc3d6cf8d421a16fcd6671986272ba4276c384c369c80a4435fb4061a5165099d7e925125a9062743b768cde88f4aacd985ebb25';

module.exports = {
  port: parseInt(PORT) || 3000,
  nodeEnvironment: NODE_ENV || 'production',
  saltRound: parseInt(SALT_ROUND) || 10,
  jwtAccessToken: JWT_ACCESS_TOKEN || defaultAccessToken,
  jwtRefreshToken: JWT_REFRESH_TOKEN || defaultRefreshToken,
};
