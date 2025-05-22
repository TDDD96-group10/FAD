import { Api} from "./Api";

/**
 * TODO: Make the API base url easier to change
 */

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
  
  baseUrl: "http://192.168.1.177:8000",
 });