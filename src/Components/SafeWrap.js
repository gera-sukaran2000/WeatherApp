import {
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Appearance,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const SafeWrap = ({ children }) => {
  const scheme = Appearance.getColorScheme();
  if (scheme == "light")
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.lightView}>{children}</SafeAreaView>
      </TouchableWithoutFeedback>
    );
  return (
    <ImageBackground
      source={require("../../assets/stars.jpg")}
      style={styles.imgBg}
      imageStyle={{ opacity: 0.2 }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.mainView}>{children}</SafeAreaView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

export default SafeWrap;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginHorizontal: wp(6),
    marginTop: Platform.OS == "android" ? hp(5) : 0,
  },
  imgBg: {
    flex: 1,
  },
  lightView: {
    flex: 1,
    marginHorizontal: wp(6),
    backgroundColor: "#e1e1e1",
    marginTop: Platform.OS == "android" ? hp(5) : 0,
  },
});
