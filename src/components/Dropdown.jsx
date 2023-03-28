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
      <Text>⫸ {item.label}</Text>
    </TouchableOpacity>
  );

  return (
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

      {!selected && (
        <>
          <Text style={styles.buttonText}>Typ Auswählen</Text>
          <Text
            style={[styles.buttonText, { fontSize: 30, fontWeight: "bold" }]}
          >
            {visible ? (
              <MaterialIcons name="close-fullscreen" style={{ fontSize: 30 }} />
            ) : (
              <MaterialIcons name="open-in-full" style={{ fontSize: 30 }} />
            )}
          </Text>
        </>
      )}
      {selected && (
        <>
          <Text
            style={[styles.buttonText, { fontSize: 30, fontWeight: "bold" }]}
          >
            {selected.label}
          </Text>
          <Text
            style={[styles.buttonText, { fontSize: 30, fontWeight: "bold" }]}
          >
            {visible ? (
              <MaterialIcons name="close-fullscreen" style={{ fontSize: 30 }} />
            ) : (
              <MaterialIcons name="open-in-full" style={{ fontSize: 30 }} />
            )}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  overlay: {
    alignItems: "center",

    height: "100%",
  },
  flatList: {
    borderWidth: 1,
    backgroundColor: "#000",
    paddingVertical: 5,
    paddingTop: 0,
  },
  dropdown: {
    position: "absolute",
    backgroundColor: "#fff",
    width: "90%",
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
  },
  buttonText: {
    flex: 1,
    textAlign: "center",
    width: "90%",
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginTop: 5,
    minWidth: 150,
    backgroundColor: "#ddd",
    borderRadius: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ccc",
    height: 70,
    zIndex: 1,
    elevation: 20,

    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 50,
  },
});
