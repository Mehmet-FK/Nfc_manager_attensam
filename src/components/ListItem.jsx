import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ListItem = ({ item }) => {
  const { firstname, lastname, personnelnumber, id } = item;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        ▣ {id} - {personnelnumber} {firstname} {lastname}{" "}
      </Text>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  text: {
    borderBottomWidth: 0.5,
    borderColor: "#000",
    height: "100%",
    textAlignVertical: "center",
  },
});
