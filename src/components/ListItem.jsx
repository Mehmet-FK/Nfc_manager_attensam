import React, { useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useInfoContext } from "../AppContext";

const ListItem = ({ item, i, handleClick }) => {
  // const { firstname, lastname, personnelnumber, id } = item;

  const { info, setInfo } = useInfoContext();

  return (
    <View
      style={{ ...styles.container, backgroundColor: i % 2 ? "#ddd" : "#fff" }}
    >
      <TouchableOpacity onPress={() => handleClick(item)}>
        <View
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            justifyContent: "space-between",
            paddingHorizontal: 5,
          }}
        >
          <Text style={{ fontWeight: "bold" }}> Datensatznummer: </Text>
          <Text style={styles.text}>{item.ItemNumber}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            justifyContent: "space-between",
            paddingHorizontal: 5,
          }}
        >
          <Text style={{ fontWeight: "bold" }}> Straße: </Text>
          <Text style={styles.text}>{item.Street}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            justifyContent: "space-between",
            paddingHorizontal: 5,
          }}
        >
          <Text style={{ fontWeight: "bold" }}> Hausnummer: </Text>
          <Text style={styles.text}>{item.Streetnumber}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            justifyContent: "space-between",
            paddingHorizontal: 5,
          }}
        >
          <Text style={{ fontWeight: "bold" }}> PLZ: </Text>
          <Text style={styles.text}>{item.Zip}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            justifyContent: "space-between",
            paddingHorizontal: 5,
          }}
        >
          <Text style={{ fontWeight: "bold" }}> Stadt: </Text>
          <Text style={styles.text}>{item.City}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    height: 150,
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  text: {
    borderBottomWidth: 0.5,
    borderColor: "#000",
    // height: "100%",
    textAlignVertical: "center",
  },
});
