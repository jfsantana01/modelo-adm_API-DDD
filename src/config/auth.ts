export default {
  jwt: {
    secret: process.env.JWT_SCRET_KEY,
    expiresIn: process.env.JWT_EXPIRATION_SECONDS,
  },
};
