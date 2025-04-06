import axios from "axios";

export default axios.create({
  baseURL: `https://api.geoapify.com/v1/geocode/autocomplete`,
});
