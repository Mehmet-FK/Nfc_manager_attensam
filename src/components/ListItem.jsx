import React, { useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useInfoContext } from "../AppContext";

const ListItem = ({ item, i, handleClick }) => {
  const { firstname, lastname, personnelnumber, id } = item;

  const { info, setInfo } = useInfoContext();

  return (
    <View
      style={{ ...styles.container, backgroundColor: i % 2 ? "#ddd" : "#fff" }}
    >
      <TouchableOpacity onPress={() => handleClick(item)}>
        <Text style={styles.text}>
          ▣ {id} - {personnelnumber} {firstname} {lastname}{" "}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    height: 70,
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
