import prisma from "../config/prismaClient.js";

const file = {
  async getFileById(fileId) {
    try {
      const file = await prisma.file.findUnique({
        where: {
          id: fileId,
        },
      });
      return file;
    } catch (error) {
      console.error("Error reading file: ", error);
    }
  },

  async saveFile(newFile) {
    try {
      const { name, url, folderId, bytes, public_id } = newFile;
      const newSave = await prisma.file.create({
        data: {
          name: name,
          url: url,
          bytes: bytes,
          folderId: folderId,
          public_id: public_id,
        },
      });
      return newSave;
    } catch (error) {
      console.error("Error with saving file to db", error);
    }
  },

  async getAllFilesInFolderByFolderId(folderId) {
    try {
      const allFiles = await prisma.file.findMany({
        where: {
          folderId: folderId,
        },
      });
      return allFiles;
    } catch (error) {
      console.error("Error reading files in folder: ", error);
    }
  },

  async deleteFileById(fileId) {
    try {
      const deletedFile = await prisma.file.delete({
        where: {
          id: fileId,
        },
      });
      return deletedFile;
    } catch (error) {
      console.error("Error whene deleting file: ", error);
    }
  },
};

export { file };
