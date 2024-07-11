import dotenv from "dotenv";
dotenv.config();

const MONGOOSE_URL = process.env.MONGOOSE_URL;
const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT;

export { MONGOOSE_URL, NODE_ENV, PORT }