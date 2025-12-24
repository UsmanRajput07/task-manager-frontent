import axios from "axios";

const axiosWrapper = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  //   withCredentials: true,
});

interface Auth {
  accessToken: string;
  refreshToken: string;
  user: {
    [key: string]: string;
  };
}

axiosWrapper.interceptors.request.use(
  (config) => {
    const persistAuth = localStorage.getItem("persist:auth");

    if (persistAuth) {
      // persist:auth is saved as a stringified object containing nested strings
      const parsed = JSON.parse(persistAuth);

      // parsed.auth is STILL a JSON string → need 2nd parse
      const auth: Auth = JSON.parse(parsed.auth);

      if (auth?.accessToken) {
        config.headers.Authorization = `Bearer ${auth.accessToken}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosWrapper;
