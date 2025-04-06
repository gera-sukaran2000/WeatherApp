import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Appearance,
  FlatList,
  Pressable,
  Platform,
} from "react-native";
import React, { memo, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import autocomplete from "../API/autocomplete";

const LocationInput = ({ onFinishTyping }) => {
  const scheme = Appearance.getColorScheme();
  const [location, setLocation] = useState("");
  const [error, setError] = useState(false);
  const [suggestion, setSuggestion] = useState(false);
  const [data, searchData] = useState([]);

  const debounce = (func, delay) => {
    let timeoutId;

    return (...args) => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const debouncedSearch = debounce(fetchAutoComplete, 1000);

  const validatingApiRequest = () => {
    if (location == "") {
      setError(true);
    } else {
      setError(false);
      onFinishTyping(location);
    }
  };

  function getLocation(text) {
    setLocation(text);
    debouncedSearch(text);
    setSuggestion(true);
    if (location == "") {
      searchData([]);
    }
  }

  async function fetchAutoComplete(text) {
    autocomplete
      .get(`?text=${text}&format=json&apiKey=${process.env.GEOAPIFY_KEY}`)
      .then((response) => searchData(response.data.results));
  }

  //

  return (
    <>
      <View style={styles.mainView}>
        <View style={{ flex: 1 }}>
          <TextInput
            returnKeyType="done"
            onSubmitEditing={validatingApiRequest}
            value={location}
            onChangeText={getLocation}
            placeholder="Search Location"
            placeholderTextColor={scheme == "light" ? "#1d1d1d" : "white"}
            cursorColor={"white"}
            style={[
              styles.input,
              {
                backgroundColor: scheme == "light" ? "#d0d0d0" : "#333333",
                color: scheme == "light" ? "#1d1d1d" : "white",
              },
            ]}
          />
        </View>
        <MaterialCommunityIcons
          style={[
            styles.icon,
            { color: scheme === "light" ? "black" : "white" },
          ]}
          name="cloud-search"
          size={25}
          onPress={validatingApiRequest}
        />
      </View>
      {error && (
        <Text
          style={{
            marginTop: 5,
            color: scheme == "light" ? "#1d1d1d" : "white",
            fontFamily: "KNMedium",
            fontSize: 14,
          }}
        >
          Kindly enter a correct location first!
        </Text>
      )}
      {data && suggestion && (
        <FlatList
          style={{
            position: "absolute",
            backgroundColor: "white",
            opacity: 1,
            top: Platform.OS =='ios'?hp(14):hp(9),
            zIndex: 1,
            width: "100%",
            borderBottomLeftRadius: 14,
            borderBottomRightRadius: 14,
          }}
          data={data}
          renderItem={({ item, index }) => (
            <Pressable
              key={index}
              onPress={() => {
                setLocation((prev) => item.city);
                onFinishTyping(item.city);
                setSuggestion((prev) => !prev);
                setLocation([]);
              }}
            >
              {item.city && (
                <View
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    backgroundColor: scheme == "light" ? "#d0d0d0" : "#333333",
                  }}
                >
                  <Text
                    style={{ color: scheme == "light" ? "#1d1d1d" : "white" }}
                  >
                    {item.city + " " + item.state}
                  </Text>
                </View>
              )}
            </Pressable>
          )}
        />
      )}
    </>
  );
};

export default memo(LocationInput);

const styles = StyleSheet.create({
  icon: { position: "absolute", right: 10 },
  input: {
    height: 52,
    paddingLeft: 10,
    borderRadius: 12,
    fontFamily: "KN",
  },
  mainView: { marginTop: 15, flexDirection: "row", alignItems: "center" },
});
