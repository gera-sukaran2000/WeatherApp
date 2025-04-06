import { StyleSheet } from "react-native";
import globalStyles from "../../../global-styles";

const styles = StyleSheet.create({
  bgImage: { flex: 1, alignItems: "center", justifyContent: "center" },
  appName: [globalStyles.label28Medium, globalStyles.greenPr],
  compName: [
    globalStyles.label16Light,
    globalStyles.greenPr,
    { lineHeight: 18, textAlign: "center" },
  ],
  container: { justifyContent: "center", alignItems: "center", flex: 1 },
});

export default styles;
