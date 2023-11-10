import axios from "axios";

export const MetodoPost = async (url: string, data: object) => {
  try {
    const response = await axios.post(url, data);
    return response;
  } catch (error: any) {
    return error.response;
  }
};
