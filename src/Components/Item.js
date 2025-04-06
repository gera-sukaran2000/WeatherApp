import { Appearance, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Feather } from "@expo/vector-icons";
import globalStyles from "../../global-styles";

const Item = ({ time, temp }) => {
  const scheme = Appearance.getColorScheme();
  return (
    <View
      style={{
        backgroundColor: scheme == "light" ? "#d0d0d0" : "#333333",
        width: wp(17),
        height: hp(16),
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        gap: hp(1),
      }}
    >
      <Text
        style={[
          globalStyles.label13Medium,
          { color: scheme == "light" ? "#1d1d1d" : "white" },
        ]}
      >
        {time}
      </Text>
      <Feather
        name="cloud-snow"
        size={20}
        color={scheme == "light" ? "#1d1d1d" : "white"}
      />
      <Text
        style={[
          globalStyles.label16Medium,
          { color: scheme == "light" ? "#1d1d1d" : "white" },
        ]}
      >
        {temp}°C
      </Text>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({});
