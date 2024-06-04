import axios from "axios";

// Data
import { API_BASE_URL } from "@/constants/misc";

const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
