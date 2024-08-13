import AppError from "../utils/appError.js";

const isAuthenticated = (req, res, next) => {
  const user = req.session?.user;
  if (user) {
    next();
  } else {
    throw new AppError(400, "Please Login...!");
  }
};

export { isAuthenticated };
