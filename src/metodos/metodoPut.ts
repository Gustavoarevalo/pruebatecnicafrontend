import axios from "axios";

export const MetodoPut = async (url: string, data: object) => {
  try {
    const response = await axios.put(url, data);
    return response;
  } catch (error: any) {
    return error.response;
  }
};
