import axios from 'axios';
import { account } from './appwrite';
import { BASE_URL } from './URLs';

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  async (config) => {
    try {
      // Generate a fresh JWT from Appwrite dynamically
      const session = await account.createJWT();
      if (session && session.jwt) {
        config.headers.Authorization = `Bearer ${session.jwt}`;
      }
    } catch {
      // Fallback: unauthenticated or offline
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
