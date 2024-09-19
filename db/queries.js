import prisma from "../config/prismaClient.js";

const getUserById = async (id) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

const getUserByUsername = async (username) => {
  return prisma.user.findUnique({
    where: { username: username },
  });
};

const createUser = async (username, password) => {
  try {
    const newUser = prisma.user.create({
      data: {
        username: username,
        password: password,
      },
    });
    return newUser;
  } catch (error) {
    console.log("Error inserting user: ", error);
  }
};

export { getUserById, getUserByUsername, createUser };
