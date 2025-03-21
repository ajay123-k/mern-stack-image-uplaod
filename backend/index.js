require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4001;
const cors = require("cors");
const helmet = require("helmet");
const userRoutes = require("./routes/users");
const fileRoutes = require("./routes/file");
const path = require("path");

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(
  cors({
    origin: process.env.SITE_URL, // frontend url
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("------------");
  console.log(req.method, req.url);
  next();
});

app.use("/api/users", userRoutes);
app.use("/api/file", fileRoutes);
app.use(
  "/uploads",
  express.static(path.join(__dirname, "public/uploads"), {
    setHeaders: (res, path, stat) => {
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
      res.set("Access-Control-Allow-Headers", "Content-Type");
    },
  })
);
app.listen(PORT, () => console.log("Server running successfully"));
