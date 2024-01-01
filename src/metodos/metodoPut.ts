import axios from "axios";

export const MetodoPut = async (url: string, data: object, JWT: string) => {
  try {
    const response = await axios.put(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWT ?? ""}`,
      },
      method: "PUT",
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
};
