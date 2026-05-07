import axios from "axios";

const API = axios.create({
  baseURL: "team-task-manager-production-50cc.up.railway.app"
});

export default API;