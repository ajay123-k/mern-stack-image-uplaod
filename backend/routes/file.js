const router = require("express").Router();
const fileController = require("../controllers/file");
const multer = require("multer");
const path = require("path");
const isAuth = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: (req, file, cb) => {
    const date = new Date().getTime();
    const originalName = path.parse(file.originalname).name;
    const extension = path.extname(file.originalname);
    const finalFilename = `${originalName}_${date}${extension}`;
    cb(null, finalFilename);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 },
});

router.post(
  "/upload",
  isAuth,
  upload.single("file"),
  fileController.uplaodFile
);

router.get("/:pageNo", isAuth, fileController.allFiles);

router.patch("/delete", isAuth, fileController.deleteUserFile);

module.exports = router;
