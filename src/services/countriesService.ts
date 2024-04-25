import { Like } from "typeorm";
import { myDataSource } from "../db/datasource/app-data-source";
import { CountriesEntity } from "../entity/countries.entity";
import { StatesEntity } from "../entity/states.entity";
import axios from "axios";
import { CitiesEntity } from "../entity/cities.entity";

export class CountriesService {
  static getCountriesByName = async (keyword: string) => {
    const countriesRepo = myDataSource.getRepository(CountriesEntity);
    const countries = await countriesRepo.find({
      where: [
        {
          name: Like(`%${keyword}%`),
        },
        {
          iso2: Like(`%${keyword}%`),
        },
        {
          iso3: Like(`%${keyword}%`),
        },
      ],
      take: 10,
    });
    return countries;
  };

  static getStatesByCountryCode = async (countryCode: string) => {
    const statesRepo = myDataSource.getRepository(StatesEntity);
    const states = await statesRepo.find({
      where: {
        country_code: countryCode,
      },
    });
    return states;
  };

  static getStatesFromApi = async (countryCode: string) => {
    const security_key =
      "ZlJtbVd5MEEwM0xWdTNKeGsxYUt5dk5ER3luakxOWmFrVlVSME1acg==";
    const apiRes = await axios.get(
      `${process.env.COUNTRIES_API_URL}/countries/${countryCode}/states`,
      {
        headers: {
          "X-CSCAPI-KEY": security_key,
        },
      }
    );
    if (apiRes.status === 200) {
      return apiRes.data;
    } else {
      throw new Error(apiRes.data.errorMessage || "Something went wrong");
    }
  };

  static getCitiesByStateCode = async (stateCode: string) => {
    const citiesRepo = myDataSource.getRepository(CitiesEntity);

    const cities = await citiesRepo.find({
      where: {
        stateCode: stateCode,
      },
    });
    return cities;
  };

  static getCitiesByStateCodeFromApi = async (
    stateCode: string,
    countryCode: string
  ) => {
    const security_key = process.env.X_CSCAPI_KEY;
    const apiRes = await axios.get(
      `${process.env.COUNTRIES_API_URL}/countries/${countryCode}/states/${stateCode}/cities`,
      {
        headers: {
          "X-CSCAPI-KEY": security_key,
        },
      }
    );
    if (apiRes.status === 200) {
      return apiRes.data;
    } else {
      throw new Error(apiRes.data.errorMessage || "Something went wrong");
    }
  };
}
