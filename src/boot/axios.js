import { boot } from "quasar/wrappers";
import axios from "axios";
import { useTokenStore } from "src/stores/token-store";

// Create an axios instance
const api = axios.create({
  baseURL: "http://15.165.109.152:8080",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export default boot(({ app }) => {
  const store = useTokenStore();

  api.interceptors.request.use(
    async (config) => {
      const atk = store.atk;
      const atkExpiration = store.atkExpiration;

      if (config.url.includes("/api/v1/auth/renew")) {
        return config;
      }

      if (!atk || new Date(atkExpiration) <= new Date()) {
        if (!isRefreshing) {
          isRefreshing = true;

          try {
            const response = await api.get("/api/v1/auth/renew", {
              withCredentials: true,
            });

            if (response.status === 200) {
              const { atk, atkExpiration, rtkExpiration } = response.data.data;
              store.setSigninResponse(atk, atkExpiration, rtkExpiration);
              processQueue(null, atk);
              config.headers.Authorization = `Bearer ${atk}`;
            } else {
              throw new Error("Token renewal failed");
            }
          } catch (error) {
            processQueue(error, null);
            window.location.href = "/signin";
            return Promise.reject(error);
          } finally {
            isRefreshing = false;
          }
        }

        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              config.headers.Authorization = `Bearer ${token}`;
              resolve(config);
            },
            reject: (error) => {
              reject(error);
            },
          });
        });
      } else {
        config.headers.Authorization = `Bearer ${atk}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api };
