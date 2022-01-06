const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

//api endpoint routes 
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const uploadImageRoute = require("./routes/uploadimage");
const categoryRoute = require("./routes/category");
//app allow and json conf
dotenv.config();
app.use(cors());
  app.use(express.json());
  app.options('*', cors());

//mongodb connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("db connection successfully"))
  .catch((err) => {
    console.log(err);
  });
  
//add routes 
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/uploadImage", uploadImageRoute);
app.use("/api/category", categoryRoute);


//get images
app.use("/images", express.static(path.join(__dirname, "routes/images")));
//run at port
app.listen(process.env.PORT || 3000, () => {
    console.log("server running at "+ process.env.PORT);
  });