import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Appearance,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";

const CachedDataCard = ({ temp, address, conditions }) => {
  const scheme = Appearance.getColorScheme();
  return (
    <View style={styles.cardLayout}>
      <Text
        style={[
          styles.prevSearchedText,
          { color: scheme == "light" ? "#1d1d1d" : "white" },
        ]}
      >
        Previously searched for
      </Text>
      <ImageBackground
        imageStyle={{ borderRadius: 16 }}
        source={
          scheme == "light"
            ? require("../../assets/lightImg.png")
            : require("../../assets/BGElem.png")
        }
      >
        <View style={styles.innerCont}>
          <View style={styles.innerSubCont}>
            <View>
              <Text
                style={[
                  styles.tempText,
                  { color: scheme == "light" ? "#1d1d1d" : "white" },
                ]}
              >
                {temp}°C
              </Text>
              <Text
                style={[
                  styles.addressText,
                  { color: scheme == "light" ? "#1d1d1d" : "white" },
                ]}
              >
                {address}
              </Text>
            </View>
            <Image
              style={styles.image}
              source={require("../../assets/Weatherize.png")}
            />
          </View>
          <Text
            style={{
              fontFamily: "KNLight",
              fontSize: widthPercentageToDP(3.5),
              color: scheme == "light" ? "#1d1d1d" : "white",
              overflow: "hidden",
              marginTop: heightPercentageToDP(1),
            }}
          >
            {conditions}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default CachedDataCard;

const styles = StyleSheet.create({
  cardLayout: { flex: 1, paddingTop: heightPercentageToDP(5) },
  prevSearchedText: {
    fontFamily: "KN",
    marginBottom: heightPercentageToDP(5),
  },
  innerCont: {
    padding: 10,
    borderRadius: 14,
    marginHorizontal: widthPercentageToDP(5),
  },
  tempText: {
    fontFamily: "KNLight",
    fontSize: widthPercentageToDP(12),
    textAlign: "left",
  },
  innerSubCont: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addressText: {
    fontFamily: "KNLight",
    fontSize: widthPercentageToDP(8),
    textAlign: "left",
  },
  image: {
    width: widthPercentageToDP(30),
    height: heightPercentageToDP(15),
  },
});
