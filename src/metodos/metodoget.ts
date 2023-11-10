import axios from "axios";

const MetodoGet = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export default MetodoGet;
