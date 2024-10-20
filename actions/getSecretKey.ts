'use server';

export const getSecretKey = () => {
  return new Promise((resolve) => resolve(process.env.SECRET_KEY));
};
