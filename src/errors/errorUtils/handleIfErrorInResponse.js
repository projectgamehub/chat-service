import { customError } from "./index.js";

const handleIfErrorInResponse = (axiosResponse) => {
    const status = axiosResponse.status;
    if (status >= 400) {
        const message = axiosResponse?.data?.message;
        throw new customError(status, message);
    }
};

export default handleIfErrorInResponse;
