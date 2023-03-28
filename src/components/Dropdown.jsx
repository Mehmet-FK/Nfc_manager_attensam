import React, { useState, useRef } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Dropdown = ({ data, onSelect }) => {
  const DropdownButton = useRef();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(undefined);
  const [dropdownTop, setDropdownTop] = useState(0);

  const openDropdown = () => {
    DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h);
    });
    setVisible(true);
  };

  const toggleDropdown = () => {
    visible ? setVisible(false) : openDropdown();
  };

  const onItemPress = (item) => {
    // console.log(item);
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
      <Text style={{ fontSize: 18 }}> ∎ {item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <TouchableOpacity
        ref={DropdownButton}
        style={styles.button}
        onPress={toggleDropdown}
      >
        <Modal visible={visible} transparent>
          <TouchableOpacity
            style={styles.overlay}
            onPress={() => setVisible(false)}
          >
            <View style={[styles.dropdown, { top: dropdownTop }]}>
              <FlatList
                style={styles.flatList}
                renderItem={renderItem}
                data={data}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </TouchableOpacity>
        </Modal>
        {selected && (
          <View
            style={[styles.dropdown, { top: dropdownTop - 105, width: "100%" }]}
          >
            <TouchableOpacity style={styles.item}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {" "}
                {selected.label}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <>
          <Text style={styles.buttonText}>Typ </Text>
          <Text
            style={[styles.buttonText, { fontSize: 30, fontWeight: "bold" }]}
          >
            <MaterialIcons
              name="keyboard-arrow-down"
              style={{ fontSize: 40 }}
            />
          </Text>
        </>
      </TouchableOpacity>
      {!selected && <View style={styles.edges}></View>}
    </>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  overlay: {
    alignItems: "center",
    height: "100%",
    // borderWidth: 2,
  },
  flatList: {
    // borderWidth: 1,
    paddingVertical: 5,
    paddingTop: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    elevation: 20,
  },
  dropdown: {
    position: "absolute",
    backgroundColor: "#fff",
    width: "92%",
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
  },
  buttonText: {
    flex: 1,
    textAlign: "center",
    width: "90%",
    fontSize: 20,
    color: "#fff",
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    // marginTop: 5,
    minWidth: 150,
    backgroundColor: "#fff",
    // borderRadius: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#b00",
    height: 70,
    zIndex: 1,
    elevation: 20,
    color: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 50,
    // borderWidth: 5,
  },
  edges: {
    borderWidth: 2,
    height: 75,
    width: "100%",
  },
});
