import axios from "axios";

export const MetodoPostLogin = async (url: string, data: object) => {
  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
};
