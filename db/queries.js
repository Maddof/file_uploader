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

const saveFile = async (newFile) => {
  try {
    const { name, url, folderId } = newFile;
    const newSave = prisma.file.create({
      data: {
        name: name,
        url: url,
        folderId: folderId,
      },
    });
    return newSave;
  } catch (error) {
    console.error("Error with saving file to db", error);
  }
};

const getAllFilesInFolderByFolderId = async (folderId) => {
  try {
    const allFiles = prisma.file.findMany({
      where: {
        folderId: folderId,
      },
    });
    return allFiles;
  } catch (error) {
    console.error("Error reading files in folder: ", error);
  }
};

export {
  getUserById,
  getUserByUsername,
  createUser,
  saveFile,
  getAllFilesInFolderByFolderId,
};
