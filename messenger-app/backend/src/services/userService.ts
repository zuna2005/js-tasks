import { prisma } from "../configs/prismaClient";

export const createUser = async (data: {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}) => {
  return await prisma.user.create({ data });
};

export const getUserByUsername = async (username: string) => {
  return await prisma.user.findUnique({ where: { username } });
};
