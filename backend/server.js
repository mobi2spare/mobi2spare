// require("dotenv").config();
import express, { json } from "express";
import * as path from 'path';
// import { initializeApp } from "firebase/app";
// import admin from 'firebase-admin'

// import serviceAccount from './serviceAccountKey.json'  assert { type: 'json' };

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

import {authRouter} from "./routes/auth.js";
import {categoryRouter} from "./routes/category.js";
import {brandRouter} from "./routes/brand.js"
import { productRouter } from "./routes/product.js";
import { adminRouter } from "./routes/admin.js";
import { cartRouter } from "./routes/cart.js";
import { attributeRouter } from "./routes/attributes.js";
import { modelsRouter } from "./routes/models.js";
import { phoneConfigurationRouter } from "./routes/ram_storage.js";
import { requestRouter } from "./routes/requests.js"; 

// const brandRouter = require("./routes/brand");
// const users = require("./routes/users");
// const modals = require("./routes/modals");
// const productRoutes = require("./routes/product");
// const bannersRoutes = require("./routes/banners");

// const firebaseConfig = {
//   apiKey: "AIzaSyC79ZPxKSwUj-BMM9YtPskgJGHpE_Z2_g0",
//   authDomain: "mobi2spare-a0b40.firebaseapp.com",
//   projectId: "mobi2spare-a0b40",
//   storageBucket: "mobi2spare-a0b40.appspot.com",
//   messagingSenderId: "196620416270",
//   appId: "1:196620416270:web:87df3efddad064ff42d35f",
//   measurementId: "G-ELTVQ1FB1W"
// };

// export const firebaseApp = initializeApp(firebaseConfig);
// export const auth = getAuth(firebaseApp);
const app = express();
const __dirname = path.resolve();
import morgan from 'morgan';

var dir = path.join(__dirname, 'uploads');
console.log(dir);

app.use('/uploads',express.static(dir));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
import cors from "cors";

app.use(cors({origin: ['http://localhost:8801','http://192.168.29.105:8801']}));
app.use(json());
app.use("/api",authRouter);
app.use("/api/category",categoryRouter);
app.use("/api/brands", brandRouter);
// app.use("/api/users", users);
// app.use("/api/modals", modals);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/attribute",attributeRouter);
app.use("/api/models",modelsRouter);
app.use("/api/phoneconfig",phoneConfigurationRouter);
app.use("/api/admin",adminRouter);
app.use("/api/cart",cartRouter);
app.use("/api/requests",requestRouter);

// //Port and Connect to DB
const port = process.env.PORT || 8800;

const start = async () => {
  try {
    // const connectionParams = {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // };
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
    console.log("error =>", error);
  }
};
start();
