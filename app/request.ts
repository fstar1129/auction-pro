import axios from "axios";

export default axios.create({
  baseURL: process.env.PUBLIC_NEXT_API_BASE_URL,
});
