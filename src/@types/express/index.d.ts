declare namespace Express {
  interface Request {
    user: {
      id: string;
      info: {
          id: string,
          username: string,
          email: string,
          role: string,
          token: string
      };
    };
  }
}