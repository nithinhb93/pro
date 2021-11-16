import axios from "axios";

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: "https://run.mocky.io/v3/",
});

// Alter defaults after instance has been created
instance.defaults.headers.common["Authorization"] = "Bearer MY_TOKEN";
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default instance;

