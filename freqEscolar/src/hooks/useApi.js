import axios from "axios";

const useApi = () => {
  async function useGet(url) {
    const response = await axios.get(
      "https://lk-api-falta.henriquehiga.com/api" + url
    );
    return response;
  }

  async function useDelete(url) {
    const response = await axios.delete(
      "https://lk-api-falta.henriquehiga.com/api" + url
    );
    return response;
  }

  async function usePost(url, data) {
    const response = await axios.post(
      "https://lk-api-falta.henriquehiga.com/api" + url,
      data
    );
    return response;
  }

  async function usePut(url, data) {
    const response = await axios.put(
      "https://lk-api-falta.henriquehiga.com/api" + url,
      data
    );
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
