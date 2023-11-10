import axios from "axios";

export const MetodoDelete = async (url: string) => {
  try {
    const response = await axios.delete(url);
    return response;
  } catch (error: any) {
    return error.response;
  }
};
