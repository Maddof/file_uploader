import prisma from "../config/prismaClient.js";

// const createUser = async (username, password) => {
//   try {
//     const newUser = prisma.user.create({
//       data: {
//         username: username,
//         password: password,
//       },
//     });
//     return newUser;
//   } catch (error) {
//     console.log("Error inserting user: ", error);
//   }
// };

const createFolder = async (userId, folderName) => {
  try {
    const newFolder = prisma.folder.create({
      data: {
        name: folderName,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return newFolder;
  } catch (error) {
    console.error("Error creating folder: ", error);
    // throw error;
  }
};

const getAllFoldersByUserId = async (userId) => {
  try {
    const allFolders = prisma.folder.findMany({
      where: {
        user: {
          id: userId,
        },
      },
    });
    return allFolders;
  } catch (error) {
    console.error("Error reading folders: ", error);
  }
};

const deleteFolderById = async (folderId) => {
  try {
    const deletedFolder = prisma.folder.delete({
      where: {
        id: folderId,
      },
    });
    return deletedFolder;
  } catch (error) {
    console.error("Error whene deleting folder: ", error);
  }
};

export { createFolder, getAllFoldersByUserId, deleteFolderById };
