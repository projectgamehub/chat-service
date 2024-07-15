import dotenv from "dotenv";
dotenv.config();

const MONGOOSE_URL = process.env.MONGOOSE_URL;
const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT;
const USER_SERVICE_URL = process.env.USER_SERVICE_URL;

export { MONGOOSE_URL, NODE_ENV, PORT, USER_SERVICE_URL };
