const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const utlity = require("../utility");
const path = require("path");
const fs = require("fs");

/**
 * This function is used to handle file uplaod wrt user
 * @param {object} req
 * @param {object} res
 * @returns
 */
exports.uplaodFile = async (req, res) => {
  try {
    const file = req.file;
    const allowedExtensions = [".jpg", ".jpeg", ".png"];
    const extension = path.extname(file.originalname);

    if (!allowedExtensions.includes(extension)) {
      fs.unlink(file.path, (err) => {
        if (err) {
          console.log("error deleting file");
        }
      });
      return res.send({
        status: {
          code: -1,
          message: "Invalid file type",
        },
      });
    }
    await prisma.files.create({
      data: {
        name: file.filename,
        uploaded_at: new Date(),
        users: {
          connect: {
            id: req.user.id,
          },
        },
      },
    });

    return res.send({
      status: {
        code: 0,
        message: "Image uploaded successfully !",
      },
    });
  } catch (error) {
    console.log(error);
    return res.send(utlity.somethingWentWrong());
  }
};

/**
 * This function is used to get all uploaded files wrt user
 * @param {object} req
 * @param {object} res
 * @returns
 */
exports.allFiles = async (req, res) => {
  try {
    const pageNo = +req.params.pageNo;
    const limit = 6;
    const offset = (pageNo - 1) * limit;
    const data = await prisma.files.findMany({
      orderBy: {
        uploaded_at: "desc",
      },
      take: limit,
      skip: offset,
      where: {
        user_id: req.user.id,
        is_enable: true,
      },
    });

    const total = await prisma.files.count({
      where: {
        user_id: req.user.id,
        is_enable: true,
      },
    });

    data.forEach((file) => {
      file.url = `${process.env.BASE_PATH}/uploads/${file.name}`;
    });

    return res.send({
      status: {
        code: 0,
        message: "All files fetched successfully",
      },
      files: data,
      total,
    });
  } catch (error) {
    console.log(error);
    return res.send(utlity.somethingWentWrong());
  }
};

/**
 * This function is used to delete file by id
 * @param {object} req
 * @param {object} res
 * @returns
 */
exports.deleteUserFile = async (req, res) => {
  try {
    await prisma.files.update({
      where: {
        id: +req.body.id,
      },
      data: {
        is_enable: false,
      },
    });

    return res.send({
      status: {
        code: 0,
        message: "File deleted successfully !",
      },
    });
  } catch (error) {
    console.log(error);
    return res.send(utlity.somethingWentWrong());
  }
};
