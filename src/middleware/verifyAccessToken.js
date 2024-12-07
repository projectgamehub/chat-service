import axios from "axios";
import { asyncEventHandler, customError } from "../errors/errorUtils/index.js";
import { USER_SERVICE_URL } from "../config/index.js";

const verifyAccessToken = asyncEventHandler(async (req, _, next) => {
    const accessToken = req.headers["access-token"];
    if (!accessToken) {
        throw new customError(401, "Token is required");
    }

    try {
        const verifiedTokenDetails = await axios.get(
            USER_SERVICE_URL + "/verify-token",
            {
                headers: {
                    "access-token": accessToken
                }
            }
        );
        req.senderId = verifiedTokenDetails?.data?.data?.id;
        next();
    } catch (error) {
        throw new customError(
            error?.response?.data?.error?.statusCode,
            error?.response?.data?.message
        );
    }
});

export default verifyAccessToken;
