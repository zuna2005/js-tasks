import { prisma } from "../prismaClient";

export const createUser = async (data: {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}) => {
  return await prisma.user.create({ data });
};

export const getUserByUsername = async (data: { username: string; }) => {
  return await prisma.user.findUniqueOrThrow({ where: data });
};
