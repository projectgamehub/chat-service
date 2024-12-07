import axios from "axios";
import { USER_SERVICE_URL } from "../config/index.js";

const verifyAccessTokenForSocket = async (accessToken) => {
    try {
        const verifiedTokenDetails = await axios.get(
            USER_SERVICE_URL + "/verify-token",
            {
                headers: {
                    "access-token": accessToken
                }
            }
        );
        return verifiedTokenDetails.data.data.id;
    } catch (error) {
        return undefined;
    }
};

export default verifyAccessTokenForSocket;
