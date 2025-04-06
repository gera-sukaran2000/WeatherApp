import { Appearance, FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import globalStyles from "../../global-styles";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const ThreeDayCard = () => {
  const scheme = Appearance.getColorScheme();
  const { days } = useSelector((state) => state.weatherInfo);
  const data = [
    {
      subtitle: `${dateFormat(days[1].datetime)}`,
      title: `${days[1].temp}°C`,
    },
    {
      subtitle: `${dateFormat(days[2].datetime)}`,
      title: `${days[2].temp}°C`,
    },
    { subtitle: `${dateFormat(days[3].datetime)}`, title: `${days[3].temp}°C` },
  ];

  function dateFormat(date) {
    let dates = new Date(date);
    const day = dates.toLocaleString("default", { day: "2-digit" });
    const month = dates.toLocaleString("default", { month: "short" });
    return day + " " + month;
  }
  return (
    <View
      style={[
        styles.mainView,
        { backgroundColor: scheme == "light" ? "#d0d0d0" : "#333333" },
      ]}
    >
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.listElem}
        data={data}
        renderItem={({ item, index }) => (
          <View key={index} style={{ alignItems: "center" }}>
            <Feather
              name="wind"
              color={scheme == "light" ? "#1d1d1d" : "white"}
              size={20}
            />
            <Text
              style={[
                styles.title,
                { color: scheme == "light" ? "#1d1d1d" : "white" },
              ]}
            >
              {item.title}
            </Text>
            <Text
              style={[
                styles.subtitle,
                { color: scheme == "light" ? "#1d1d1d" : "white" },
              ]}
            >
              {item.subtitle}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default ThreeDayCard;

const styles = StyleSheet.create({
  mainView: {
    borderRadius: 18,
    height: hp(15),
    paddingLeft: wp(2),
    paddingRight: wp(2),
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp(5.5),
  },
  title: [globalStyles.label16Medium],
  subtitle: [globalStyles.label13Light],
  listElem: { flex: 1, justifyContent: "space-evenly" },
});
