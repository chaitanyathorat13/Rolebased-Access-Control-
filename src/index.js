import "dotenv/config";

import app from "./app.js";
import connectToMongoDb from "./database/connection.js";
import config from "./config/config.js";
// import { seedDatabase } from "./seedDB.js";
import { createAdminUser } from "./adminUser.js";

process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit();
});

const PORT = config.PORT || 8080;
connectToMongoDb()
  .then(() => {
    console.log("mongo connection successful...");
    return app.listen(PORT);
  })
  .then(() => {
    console.log(`server started on a port ${PORT}`);
    return createAdminUser();
  })
  .then(() => {
    console.log("admin user created successfully( in index)");
    })
  .catch((err) => {
    console.log(err);
  });
