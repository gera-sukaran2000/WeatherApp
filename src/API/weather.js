import axios from "axios";

export default axios.create({
  baseURL:
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/",
});
