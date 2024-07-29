import axios from "axios";
import { DataSource } from "typeorm";
import { CountriesEntity } from "../entity/countries.entity";
const path = require("path");

const myDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "Root@123",
  database: "kitchenlinkdb",
  synchronize: false, // if true, you don't really need migrations,
  entities: [CountriesEntity],
  migrations: ["src/db/datasource/migrations/*.ts"],
  logging: true,
});

const connectDatasource = () => {
  myDataSource
    .initialize()
    .then(() => {
      console.log("Datasource has been initialized!");
    })
    .catch((err) => {
      console.log("Error during datasouce initilization: ", err);
    });
};
const security_key = "ZlJtbVd5MEEwM0xWdTNKeGsxYUt5dk5ER3luakxOWmFrVlVSME1acg==";
const getAllCountriesData = async () => {
  const countriesRepo = myDataSource.getRepository(CountriesEntity);
  connectDatasource();
  const apiRes = await axios.get(
    "https://api.countrystatecity.in/v1/countries/",
    {
      headers: {
        "X-CSCAPI-KEY": security_key,
      },
    }
  );
  if (apiRes.status === 200) {
    // const res = await countriesRepo.save(apiRes.data);
    console.log(apiRes.data);
  }
};

// getAllCountriesData();
