import * as express from "express";
import { Request, Response } from "express";
import { myDataSource } from "./db/datasource/app-data-source";
import { authRouter } from "./routes/authRoutes";
const cors = require("cors");

const bodyParser = require("body-parser");
//establish database connection

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// enabling cross origin resource sharing
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    exposedHeaders: ["Set-cookie"],
  })
);

app.use(express.json());

app.use("/auth", authRouter);

export default app;
