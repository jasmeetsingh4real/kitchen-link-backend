import { myDataSource } from "./datasource/app-data-source";

export const connectDatasource  = ()=>{
    myDataSource
    .initialize()
    .then(() => {
        console.log("Datasource has been initialized!");
    })
    .catch((err) => {
        console.log("Error during datasouce initilization: ", err);
    });
}