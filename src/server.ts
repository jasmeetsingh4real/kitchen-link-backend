import app from "./app";
import { connectDatasource } from "./db/connection";

//setting up config file
require("dotenv").config();
console.log(process.env.PORT);

//connecting to database
connectDatasource();

app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});
