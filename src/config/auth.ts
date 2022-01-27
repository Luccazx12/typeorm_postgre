export default {
    jwt: {
      secret: process.env.JWT_KEY || "default",
      expiresIn: 86400,
    },
  };