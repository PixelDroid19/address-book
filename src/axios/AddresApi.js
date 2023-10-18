import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://618aac0d34b4f400177c480e.mockapi.io/api/v1",
});

