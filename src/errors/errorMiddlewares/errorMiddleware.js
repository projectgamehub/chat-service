import { NODE_ENV } from "../../config/index.js";
import { devError, prodError } from "../errorUtils/index.js";

const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    if (NODE_ENV == "development") {
        devError(res, err);
    } else if (NODE_ENV == "production") {
        prodError(res, err);
    }
};

export default errorMiddleware;
