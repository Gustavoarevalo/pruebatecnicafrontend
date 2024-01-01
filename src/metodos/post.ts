import axios from "axios";

export const MetodoPost = async (url: string, data: object, JWT: string) => {
  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWT ?? ""}`,
      },
      method: "POST",
    });

    return response;
  } catch (error: any) {
    return error.response;
  }
};
