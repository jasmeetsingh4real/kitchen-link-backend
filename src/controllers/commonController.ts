import { myDataSource } from "../db/datasource/app-data-source";
import { CitiesEntity } from "../entity/cities.entity";
import { CountriesEntity } from "../entity/countries.entity";
import { StatesEntity } from "../entity/states.entity";
import { CountriesService } from "../services/countriesService";
import { RestaurantService } from "../services/restaurantService";
import { TState } from "../types/RestaurentsTypes";

export class CommonController {
  static getCountriesByName = async (req, res) => {
    try {
      const { keyword } = req.body;
      if (keyword) {
        const countries = await CountriesService.getCountriesByName(keyword);
        return res.json({
          result: countries,
          success: true,
          errorMessage: null,
        });
      }
      return res.json({
        data: [],
        success: true,
        errorMessage: null,
      });
    } catch (error) {
      return res.json({
        data: null,
        success: false,
        errorMessage: error.message || "something went wrong",
      });
    }
  };

  static getStatesByCountryCode = async (req, res) => {
    try {
      let countryCode = req.body.countryCode;
      const { countryId } = req.body;
      const countriesRepo = myDataSource.getRepository(CountriesEntity);
      if (!countryId) {
        throw new Error("Invalid Request");
      }

      if (!countryCode) {
        const contryDetails = await countriesRepo.findOne({
          where: {
            id: countryId,
          },
        });
        countryCode = contryDetails.iso2;
      }
      if (!countryCode) {
        throw new Error("Country code not found");
      }
      const statesRepo = myDataSource.getRepository(StatesEntity);
      const statesInDb = await CountriesService.getStatesByCountryCode(
        countryCode
      );
      if (!statesInDb.length) {
        const statesFromAPI: StatesEntity[] =
          await CountriesService.getStatesFromApi(countryCode);
        statesFromAPI.forEach((state) => {
          state["country_code"] = countryCode;
          state["country_id"] = countryId;
          return state;
        });
        statesRepo.save(statesFromAPI);

        return res.json({
          result: statesFromAPI,
          success: true,
          errorMessage: null,
        });
      }

      return res.json({
        result: statesInDb,
        success: true,
        errorMessage: null,
      });
    } catch (error) {
      return res.json({
        result: null,
        success: false,
        errorMessage: error.message || "something went wrong",
      });
    }
  };

  static getCitiesByStateCode = async (req, res) => {
    try {
      const citiesRepo = myDataSource.getRepository(CitiesEntity);
      let { stateCode, countryCode, stateId, countryId } = req.body;

      if (!stateId || !countryId) {
        throw new Error("Invalid Request");
      }
      const statedRepo = myDataSource.getRepository(StatesEntity);
      if (!stateCode) {
        const stateDetails = await statedRepo.findOne({
          where: {
            id: stateId,
          },
        });
        stateCode = stateDetails.iso2;
      }
      const countryRepo = myDataSource.getRepository(CountriesEntity);
      if (!countryCode) {
        const countryDetails = await countryRepo.findOne({
          where: { id: countryId },
        });
        countryCode = countryDetails.iso2;
      }
      if (!stateCode || !countryCode) {
        throw new Error("Invalid Request");
      }
      const citiesInDB = await CountriesService.getCitiesByStateCode(stateCode);
      if (!citiesInDB.length) {
        const citiesFromApi =
          await CountriesService.getCitiesByStateCodeFromApi(
            stateCode,
            countryCode
          );
        if (citiesFromApi && citiesFromApi.length > 0) {
          citiesFromApi.forEach((city: CitiesEntity) => {
            city["stateId"] = stateId;
            city["countryId"] = countryId;
            city["countryCode"] = countryCode;
            city["stateCode"] = stateCode;
          });
          citiesRepo.save(citiesFromApi);

          return res.json({
            result: citiesFromApi,
            success: true,
            errorMessage: null,
          });
        }
      }
      return res.json({
        result: citiesInDB,
        success: true,
        errorMessage: null,
      });
    } catch (err) {
      return res.json({
        result: null,
        success: false,
        errorMessage: err.message || "something went wrong",
      });
    }
  };

  static getCountryById = async (req, res) => {
    try {
      const countryRepo = myDataSource.getRepository(CountriesEntity);
      const country = await countryRepo.findOne({
        where: {
          id: req.body.id,
        },
      });
      if (!country) {
        throw new Error("Country not found");
      }
      return res.json({
        result: {
          label: country.name,
          value: { id: country.id, code: country.iso2 },
        },
        success: true,
        errorMessage: null,
      });
    } catch (err) {
      return res.json({
        result: null,
        success: false,
        errorMessage: err.message || "something went wrong",
      });
    }
  };

  static searchRestaurants = async (req, res) => {
    try {
      const stateId = req.body.id;
      const keyword = req.body.keyword;
      let restaurants = [];
      if (keyword) {
        restaurants = await RestaurantService.searchRestaurants({
          stateId,
          keyword,
        });
      }
      return res.json({
        result: restaurants,
        success: true,
        errorMessage: null,
      });
    } catch (err) {
      return res.json({
        result: null,
        success: false,
        errorMessage: err.message || "something went wrong",
      });
    }
  };

  static getRestaurantsByStateName = async (req, res) => {
    try {
      const { stateName, page } = req.body;
      if (!stateName || !page) {
        throw new Error("Invalid request");
      }
      const { restaurants, pagination } =
        await RestaurantService.getRestaurantsByStateName(stateName, page);
      return res.json({
        pagination,
        result: restaurants,
        success: true,
        errorMessage: null,
      });
    } catch (err) {
      return res.json({
        result: null,
        success: false,
        errorMessage: err.message || "something went wrong",
      });
    }
  };
}
