import { StyleSheet } from "react-native";
import globalStyles from "../../../global-styles";
const styles = StyleSheet.create({
  noSearches: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: [
    globalStyles.label24Medium,
    { textAlign: "center", marginBottom: 20 },
  ],
  subtitle: [
    globalStyles.label13Medium,
    { textAlign: "center", color: "white" },
  ],
  
});

export default styles;
