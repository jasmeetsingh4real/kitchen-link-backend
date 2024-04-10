import * as express from "express";
import { Request, Response } from "express";
import { User } from "./entity/user.entity";
import { myDataSource } from "../app-data-source";

//establish database connection
myDataSource
  .initialize()
  .then(() => {
    console.log("Datasource has been initialized!");
  })
  .catch((err) => {
    console.log("Error during datasouce initilization: ", err);
  });

const app = express();

app.use(express.json());

app.get("/users", function (req: Request, res: Response) {
  res.send("working...");
});

app.listen(3000, () => {
  console.log("listning on port 3000");
});
