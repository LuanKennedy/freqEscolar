import axios from "axios";

const useApi = () => {
  const baseUrl = "http://localhost:8080/api";

  async function useGet(url) {
    const response = await axios.get(baseUrl + url);
    return response;
  }

  async function useDelete(url) {
    const response = await axios.delete(baseUrl + url);
    return response;
  }

  async function usePost(url, data) {
    const response = await axios.post(baseUrl + url, data);
    return response;
  }

  async function usePut(url, data) {
    const response = await axios.put(baseUrl + url, data);
    return response;
  }

  return {
    useGet,
    useDelete,
    usePost,
    usePut,
  };
};

export { useApi };
