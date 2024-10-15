# kitchen-link-backend

This project is nodejs + typeorm backend api

<!-- Create Migration -->
npm run migration:create src/db/datasource/migrations/[Migration-name]

<!-- Generate Migration -->

npm run migration:generate src/db/datasource/migrations/[Migration-name]

<!-- Migration run development -->

npm run migration:runDev

<!-- Migration revert dev -->

npm run migration:revertDev