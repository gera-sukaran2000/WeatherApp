import { configureStore, createSlice } from "@reduxjs/toolkit";
import { insertData, getData } from "./localDb";

const weatherData = createSlice({
  name: "weatherInfo",
  initialState: {},
  reducers: {
    addWeatherData(state, action) {
      const { address, description, currentConditions, days } = action.payload;
      state.address = address;
      state.description = description;
      state.currentConditions = currentConditions;
      state.days = days;
      // insertData(address, description, currentConditions, days);
    },
  },
});

export const { addWeatherData, insertDataFromDb } = weatherData.actions;

export default configureStore({
  reducer: { weatherInfo: weatherData.reducer },
});
