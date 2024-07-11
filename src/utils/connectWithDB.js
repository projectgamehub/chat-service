import mongoose from "mongoose";
import { MONGOOSE_URL } from "../config/index.js";

const connectWithDB = async () => {
    await mongoose.connect(MONGOOSE_URL);
};

export default connectWithDB;
