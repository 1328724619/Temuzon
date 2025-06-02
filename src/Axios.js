import axios from "axios";

const instance = axios.create({
  baseURL: "https://api-voj2lqn4iq-uc.a.run.app",

  // "http://localhost:5001/clone-d9244/us-central1/api",
});

export default instance;
