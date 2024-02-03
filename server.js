import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import promocodeRoutes from "./routes/promocodeRoutes.js";
import cors from "cors";
dotenv.config(); //configure env

//database configure
connectDb();
/**  if our env file is not at root then we use to 
 dotenv.config({path:"/"}) and indicate env path
 */
const app = express(); //rest object for express fuction call

//middlewares
app.use(cors());
app.use(express.json()); //enable json
app.use(morgan("dev")); //morgan configure

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/promocodes", promocodeRoutes);

//rest api
app.get("/", (req, res) => {
  // res.send({
  //   message: "Welcome to e-commerce application",
  // });
  res.send("<h1>Welcome to our app</h1>");
});

//PORT (if env port is not working then use 8080 port thats why || 8080)
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on ${PORT}`.bgBlue.white
  );
});
