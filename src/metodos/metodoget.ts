import axios from "axios";

const MetodoGet = async (url: string, jwt: string) => {
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt ?? ""}`,
      },
      method: "GET",
    });

    return response;
  } catch (error: any) {
    return error.response;
  }
};

export default MetodoGet;
