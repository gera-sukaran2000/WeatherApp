import { Text, View, Image, Appearance, useColorScheme } from "react-native";
import React, { useCallback, useState, useEffect } from "react";
import SafeWrap from "../../Components/SafeWrap";
import LocationInput from "../../Components/LocationInput";
import styles from "./styles";
import weather from "../../API/weather";
import { useDispatch, useSelector } from "react-redux";
import { addWeatherData } from "../../../store/store";
import ModalComp from "../../Components/ModalComp";
import { insertData, getData } from "../../../store/localDb";
import CachedDataCard from "../../Components/CachedDataCard";

const Main = ({ navigation }) => {
  const scheme = useColorScheme();
  console.log(scheme)
  const state = useSelector((state) => {
    return state.weatherInfo;
  });
  const dispatch = useDispatch();
  const [searching, setSearch] = useState(false);
  const [title, setTitle] = useState({
    title: "Please wait while we ask the clouds for the conditions",
    error: "N",
  });
  const [data, setCachedData] = useState(false);

  useEffect(() => {
    async function fetchDataFromDb() {
      const res = await getData();
      if (res) {
        dispatch(addWeatherData(res));
        setCachedData(true);
      } else {
        setCachedData(false);
      }
    }
    fetchDataFromDb();
  }, []);

  const searchLocation = useCallback((text) => {
    async function getWeatherData() {
      setSearch(true);
      try {
        const response = await weather.get(
          `${text}?key=${process.env.API_KEY}`
        );
        dispatch(addWeatherData(response.data));
        insertData(
          response.data.address,
          response.data.description,
          response.data.currentConditions,
          response.data.days
        );

        setSearch(false);
        navigation.navigate("Results");
      } catch (error) {
        setTitle({ title: error.response.data, error: "Y" });
        setTimeout(() => {
          setSearch(false);
          setTitle({
            title: "Please wait while we ask the clouds for the conditions",
            error: "N",
          });
        }, 2000);
      }
    }

    getWeatherData();
  }, []);

  let content = (
    <View style={styles.noSearches}>
      <Image source={require("../../../assets/Weatherize.png")} />
      <Text
        style={[
          styles.title,
          { color: scheme == "light" ? "#1d1d1d" : "white" },
        ]}
      >
        Discover the Weather In Your Searched City
      </Text>
      <Text
        style={[
          styles.subtitle,
          { color: scheme == "light" ? "#1d1d1d" : "white" },
        ]}
      >
        Search to know more about the searched location so you stay ahead of
        coming conditions
      </Text>
    </View>
  );

  if (data) {
    content = (
      <CachedDataCard
        address={state?.address}
        temp={state?.days[0]?.temp}
        conditions={state?.description}
      />
    );
  }

  return (
    <SafeWrap>
      {/* <ScrollView contentContainerStyle={{ flex: 1 }}> */}
      <LocationInput onFinishTyping={searchLocation} />
      {content}
      <ModalComp visible={searching} data={title.title} error={title.error} />
      {/* </ScrollView> */}
    </SafeWrap>
  );
};

export default Main;
