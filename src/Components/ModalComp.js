import {
  StyleSheet,
  Text,
  SafeAreaView,
  Modal,
  ActivityIndicator,
  Appearance,
} from "react-native";
import React from "react";
import globalStyles from "../../global-styles";
import { MaterialIcons } from "@expo/vector-icons";

const ModalComp = ({ visible, data, error = "N" }) => {
  const scheme = Appearance.getColorScheme();
  return (
    <Modal visible={visible} transparent animationType="slide">
      <SafeAreaView style={styles.modalBg}>
        <SafeAreaView
          style={[
            styles.modalView,
            { backgroundColor: scheme == "light" ? "#d0d0d0" : "#333339" },
          ]}
        >
          {error == "N" ? (
            <ActivityIndicator size="large" />
          ) : (
            <MaterialIcons name="error" size={45} color={"#b41227"} />
          )}
          <Text
            style={[
              styles.modalText,
              { color: scheme == "light" ? "#1d1d1d" : "white" },
            ]}
          >
            {data}
          </Text>
        </SafeAreaView>
      </SafeAreaView>
    </Modal>
  );
};

export default ModalComp;

const styles = StyleSheet.create({
  modalBg: { flex: 1, backgroundColor: "rgba(0,0,0,0.8)" },
  modalView: {
    height: "30%",
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: [
    globalStyles.label16Regular,
    {
      textAlign: "center",
      marginTop: 20,
      marginHorizontal: 20,
    },
  ],
});
