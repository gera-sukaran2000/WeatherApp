import { View } from "react-native";
import React, { useEffect } from "react";
import styles from "./styles";
import SafeWrap from "../../Components/SafeWrap";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { StackActions } from "@react-navigation/native";

const Splash = ({ navigation }) => {
  const sv1 = useSharedValue(100);
  useEffect(() => {
    sv1.value = withTiming(0, { duration: 1000 });
    // setTimeout(() => {
    //   navigation.dispatch(StackActions.replace("Main"));
    // }, 1500);
  }, []);

  return (
    <SafeWrap>
      <View style={styles.container}>
        <Animated.Text style={[styles.appName, { left: sv1 }]}>
          Weatherize
        </Animated.Text>
        <Animated.Text style={[styles.compName, { right: sv1 }]}>
          by fleetpulse
        </Animated.Text>
      </View>
    </SafeWrap>
  );
};

export default Splash;
