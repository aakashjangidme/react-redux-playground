import type { AxiosInstance } from "axios"
import axios from "axios"

const httpClient: AxiosInstance = axios.create({
  baseURL: `https://jsonplaceholder.typicode.com`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

export default httpClient
