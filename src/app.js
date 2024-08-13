import express, { urlencoded } from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import routes from "./routes/index.js";
import config from "./config/config.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: config.MONGODB_URL,
    }),
  })
);


// Routes
app.use("/api", routes);

app.use(globalErrorHandler);

export default app;
