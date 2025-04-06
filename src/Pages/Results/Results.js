import {
  Appearance,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import React from "react";
import SafeWrap from "../../Components/SafeWrap";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ResultCard from "../../Components/ResultCard";
import ResultSubCard from "../../Components/ResultSubCard";
import styles from "./styles";
import TimeTabs from "../../Components/TimeTabs";
import { useSelector } from "react-redux";

const Results = () => {
  const scheme = Appearance.getColorScheme();
  const data = useSelector((state) => state.weatherInfo);
  return (
    <SafeWrap>
      <View style={{ marginTop: hp(2) }}>
        <Text
          style={[
            styles.location,
            { color: scheme == "light" ? "#1d1d1d" : "white" },
          ]}
        >
          {data.address}
        </Text>
        <Text
          style={[
            styles.title,
            { color: scheme == "light" ? "#1d1d1d" : "white" },
          ]}
        >
          {data.description}
        </Text>
      </View>

      <ResultCard />

      <ResultSubCard />

      <TimeTabs />
    </SafeWrap>
  );
};

export default Results;
