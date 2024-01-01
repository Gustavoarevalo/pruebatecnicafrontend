import axios from "axios";

export const MetodoDelete = async (url: string, JWT: string) => {
  try {
    const response = await axios.delete(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWT ?? ""}`,
      },
      method: "DELETE",
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
};
