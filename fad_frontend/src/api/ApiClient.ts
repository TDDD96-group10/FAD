import { Api} from "../api/Api";

export const apiClient = new Api({ securityWorker: () => {
    const token = localStorage.getItem("authToken");
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  },
  baseUrl: "http://127.0.0.1:8000",
 });