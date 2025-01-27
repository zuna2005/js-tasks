import { prisma } from "../configs/prismaClient";

interface User {
  firstName: string;
  lastName: string;
  bio: string;
  profilePic: string;
  username: string;
  password: string;
}

export const createUser = async (data: User) => {
  return await prisma.user.create({ data });
};

export const getUserByUsername = async (username: string) => {
  return await prisma.user.findUnique({ where: { username } });
};

export const updateUserInfo = async (
  username: string,
  formData: Partial<User>,
) => {
  return await prisma.user.update({ where: { username }, data: formData });
};
