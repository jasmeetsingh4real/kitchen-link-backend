import * as express from "express";
import { authRouter } from "./routes/authRoutes";
import { commonRouter } from "./routes/commonRoutes";
import { restaurantRouter } from "./routes/restaurantRoutes";
import { verifySellerToken, verifyToken } from "./middleware/authMiddleware";
import { userRouter } from "./routes/UserRoutes";
import { paymentRouter } from "./routes/paymentRoutes";
import { deliveryRouter } from "./routes/DeliveryRoutes";
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

//routes without middlewares
app.use("/common", commonRouter);

//routes for login signup
app.use("/auth", authRouter);

//routes for admin
app.use("/master", verifySellerToken, restaurantRouter);

app.use("/user", verifyToken, userRouter);

app.use("/payment", verifyToken, paymentRouter);

app.use("/delivery", verifyToken, deliveryRouter);

export default app;
