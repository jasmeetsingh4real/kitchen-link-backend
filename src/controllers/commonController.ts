import { myDataSource } from "../db/datasource/app-data-source";
import { CitiesEntity } from "../entity/cities.entity";
import { StatesEntity } from "../entity/states.entity";
import { CountriesService } from "../services/countriesService";
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
      const { countryCode, countryId } = req.body;
      if (!countryCode || !countryId) {
        throw new Error("Invalid Request");
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
      const { stateCode, countryCode, stateId, countryId } = req.body;
      if (!stateCode || !countryCode || !stateId || !countryId) {
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
}
