// require("dotenv").config();
import express, { json } from "express";
import * as path from 'path';

import { validateConnection } from './db/connect.js';
// var bodyParser = require("body-parser");


import {authRouter} from "./routes/auth.js";
import {acquireConnection,releaseConnection} from "./middleware/connection.js";
import {categoryRouter} from "./routes/category.js";
import {brandRouter} from "./routes/brand.js"
import { productRouter } from "./routes/product.js";
import { cartRouter } from "./routes/cart.js";
import { attributeRouter } from "./routes/attributes.js";
// const brandRouter = require("./routes/brand");
// const users = require("./routes/users");
// const modals = require("./routes/modals");
// const productRoutes = require("./routes/product");
// const bannersRoutes = require("./routes/banners");

const app = express();
const __dirname = path.resolve();

var dir = path.join(__dirname, 'uploads');
console.log(dir);

app.use('/uploads',express.static(dir));
app.use(express.urlencoded({ extended: true }));

import cors from "cors";


const logRequest = (req, res, next) => {
  const { method, url, headers } = req;
  const { statusCode, statusMessage } = res;
  console.log(`[${new Date().toISOString()}] ${method} ${url} ${statusCode} ${statusMessage} - ${headers['user-agent']}`);
  next();
};

app.use(cors({origin: 'http://localhost:8801'}));
app.use(json());
app.use(logRequest);



app.use("/api", acquireConnection,authRouter);
app.use("/api/category", acquireConnection,categoryRouter);
app.use("/api/brand", brandRouter);
// app.use("/api/users", users);
// app.use("/api/modals", modals);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/attribute", attributeRouter);

// //Port and Connect to DB
const port = process.env.PORT || 8800;
let pool;

const start = async () => {
  try {
    // const connectionParams = {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // };
    pool = await validateConnection();
    console.log("database connected");

    // app.use(
    //   bodyParser.urlencoded({
    //     extended: true,
    //   })
    // );
    // app.use(bodyParser.json());
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    // console.log("gand fat gai"); //important
    console.log("error =>", error);
  }
};
start();
