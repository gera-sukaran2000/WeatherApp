import { StyleSheet, Text, View, Image, Appearance } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import globalStyles from "../../global-styles";
import { useSelector } from "react-redux";

const ResultCard = () => {
  const scheme = Appearance.getColorScheme();
  const { days } = useSelector((state) => state.weatherInfo);

  function dateFormat(date) {
    let dates = new Date(date);
    const day = dates.toLocaleString("default", { day: "2-digit" });
    const month = dates.toLocaleString("default", { month: "short" });
    const year = dates.toLocaleString("default", { year: "numeric" });
    return day + " " + month + " " + year;
  }
  return (
    <View
      style={[
        styles.mainView,
        { backgroundColor: scheme == "light" ? "#d0d0d0" : "#333333" },
      ]}
    >
      <View style={{ marginTop: hp(0.8) }}>
        <Text
          style={[
            styles.date,
            { color: scheme == "light" ? "#1d1d1d" : "white" },
          ]}
        >
          {dateFormat(days[0].datetime)}
        </Text>
        <Text
          style={[
            styles.type,
            { color: scheme == "light" ? "#1d1d1d" : "white" },
          ]}
        >
          {days[0].conditions}
        </Text>
        <Text
          style={[
            styles.temp,
            { color: scheme == "light" ? "#1d1d1d" : "white" },
          ]}
        >
          {days[0].temp}°C
        </Text>
      </View>
      <Image
        source={require("../../assets/Weatherize.png")}
        style={styles.image}
      />
    </View>
  );
};

export default ResultCard;

const styles = StyleSheet.create({
  mainView: {
    borderRadius: 18,
    height: hp(22),
    paddingTop: hp(3),
    paddingLeft: wp(6),
    paddingRight: wp(6),
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp(5),
    width: "100%",
  },
  date: [globalStyles.label13Light],
  type: [globalStyles.label16Medium, { marginBottom: hp(2) }],
  temp: { fontSize: 40, fontFamily: "KNMedium" },
  image: { width: wp(29), height: hp(13) },
});
