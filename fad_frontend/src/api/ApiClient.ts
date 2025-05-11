import { Api} from "./Api";

export const apiClient = new Api({ securityWorker: () => {
    const token = undefined// localStorage.getItem("access");
    return token
    ? {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    : {};
  },
  baseUrl: "http://127.0.0.1:8000",
 });