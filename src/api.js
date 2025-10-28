// src/api.js
import axios from "axios";

// ⚠️ Substitua pelo IP da sua máquina
// Para ver seu IP: abra o terminal e digite ipconfig (Windows)
const api = axios.create({
  baseURL: "http://172.29.144.1:3000", // exemplo — troque pelo seu IP local
});

export default api;
