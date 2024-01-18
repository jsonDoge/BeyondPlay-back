import jwt from 'jsonwebtoken';

export const loginResolver = {
  Mutation: {
    // No parent resolver means root always undefined
    login(_: undefined, { username, password }: { username: string; password: string }) {
      if (username !== process.env.USERNAME || password !== process.env.PASSWORD) {
        throw new Error('Incorrect login details');
      }

      const token = jwt.sign({ username }, process.env.JWT_SECRET as string, {
        expiresIn: '1d',
      });

      return {
        token,
      };
    },
  },
};
