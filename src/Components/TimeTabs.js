import {
  Appearance,
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Item from "./Item";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useSelector } from "react-redux";
import ThreeDayCard from "./ThreeDayCard";
const TimeTabs = () => {
  const scheme = Appearance.getColorScheme();
  const [index, setIndex] = React.useState(0);
  const layout = useWindowDimensions();
  const { days } = useSelector((state) => state.weatherInfo);

  function formatTime(timeString) {
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM");
  }

  const FirstRoute = () => (
    <View style={styles.hoursItemView}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={{ gap: wp(2.5) }}
        data={days[0].hours}
        renderItem={({ item, index }) => (
          <Item time={formatTime(item.datetime)} temp={item.temp} key={index} />
        )}
      />
    </View>
  );
  const SecondRoute = () => (
    <View style={styles.hoursItemView}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={{ gap: wp(2.5) }}
        data={days[1].hours}
        renderItem={({ item, index }) => (
          <Item time={formatTime(item.datetime)} temp={item.temp} key={index} />
        )}
      />
    </View>
  );

  const ThirdRoute = () => {
    return (
      <View style={{ flex: 1 }}>
        <ThreeDayCard />
      </View>
    );
  };

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  const routes = [
    { key: "first", title: "Today" },
    { key: "second", title: "Tommorrow" },
    { key: "third", title: "Next 3 Days" },
  ];

  const renderTabBar = (props) => (
    <TabBar
      android_ripple={{ color: "transparent" }}
      {...props}
      style={{ backgroundColor: scheme == "light" ? "" : "" }}
      activeColor={scheme == "light" ? "#1d1d1d" : "white"}
      inactiveColor={scheme == "light" ? "#1d1d1d" : "white"}
      indicatorStyle={[
        styles.indicatorStyle,
        { backgroundColor: scheme == "light" ? "#1d1d1d" : "white" },
      ]}
    />
  );

  return (
    <TabView
      style={{
        marginTop: hp(2),
        borderRadius: 16,
      }}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
      initialLayout={{ width: layout.width }}
    />
  );
};

export default TimeTabs;

const styles = StyleSheet.create({
  hoursItemView: {
    flex: 1,
    justifyContent: "center",
    marginBottom: hp(1),
    marginTop: hp(5),
  },
  indicatorStyle: {
    alignSelf: "center",
    marginLeft: wp(13.5),
    width: 5,
    borderRadius: 5 / 2,
    height: 5,
  },
});
