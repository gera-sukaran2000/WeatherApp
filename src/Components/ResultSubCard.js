import { Appearance, FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import globalStyles from "../../global-styles";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const ResultSubCard = () => {
  const scheme = Appearance.getColorScheme();
  const { currentConditions } = useSelector((state) => state.weatherInfo);
  const data = [
    {
      title: `${currentConditions.windspeed} m/s`,
      subtitle: "wind",
    },
    {
      title: `${currentConditions.humidity}%`,
      subtitle: "Humidity",
    },
    { title: `${currentConditions.precipprob}%`, subtitle: "Rain" },
  ];
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

export default ResultSubCard;

const styles = StyleSheet.create({
  mainView: {
    borderRadius: 18,
    height: hp(15),
    paddingRight: wp(2),
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp(5.5),
  },
  title: [globalStyles.label16Medium, { color: "white" }],
  subtitle: [globalStyles.label13Light, { color: "white" }],
  listElem: { flex: 1, justifyContent: "space-evenly" },
});
