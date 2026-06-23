export const BASE_URL = import.meta.env.VITE_API_URL || "";

// Backward-compat for existing callers that use baseUrl()
const baseUrl = () => BASE_URL + "/";
export default baseUrl;