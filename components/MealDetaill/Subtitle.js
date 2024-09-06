import { StyleSheet, Text, View } from "react-native";

const Subtitle = ({ children }) => {
  return (
    <View style={styles.subTitleContainer}>
      <Text style={styles.subTitle}>{children}:</Text>
    </View>
  );
};

export default Subtitle;

const styles = StyleSheet.create({
  subTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  subTitleContainer: {
    marginHorizontal: 12,
    marginVertical: 4,
    padding: 6,
    borderBottomColor: "white",
    borderBottomWidth: 2,
  },
});
