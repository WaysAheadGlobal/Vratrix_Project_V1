import axios from "axios";

const api = axios.create({
  //baseURL: 'http://192.168.137.1/api',
  /* baseURL: "http://localhost:8000", */
  baseURL: "https://poc.vratrix.waysdatalabs.com/api",
  // baseURL: 'https://halahomes.ca/api',
  withCredentials: true,
});

export default api;
