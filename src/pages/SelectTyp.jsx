import { Text, TouchableOpacity, View } from "react-native";
import AndroidPrompt from "../components/AndroidPrompt";
import Dropdown from "../components/Dropdown";
import ToastManager, { Toast } from "toastify-react-native";
import { StyleSheet } from "react-native";
import nfcManager, { NfcEvents } from "react-native-nfc-manager";
import { useEffect, useRef, useState } from "react";
import { useInfoContext } from "../AppContext";

const SelectTyp = ({ navigation }) => {
  const [selected, setSelected] = useState(undefined);

  const { info, setInfo } = useInfoContext();
  const promptRef = useRef();
  const data = [
    { label: "Zähler", value: "1" },
    { label: "KFZ", value: "2" },
    { label: "Auftrag", value: "3" },
  ];

  const onSelect = (val) => {
    setSelected(val);
    setInfo({ ...info, typ: val.label });
  };
  const handleClick = () => {
    if (!selected) {
      return Toast.warn("Bitte Typ auswählen");
    }

    navigation.navigate("Activate");
  };

  return (
    <View style={styles.container}>
      <ToastManager />
      <AndroidPrompt navigation={navigation} ref={promptRef} />
      <Dropdown data={data} onSelect={onSelect} />
      <TouchableOpacity onPress={() => handleClick()}>
        <Text style={styles.submit}>WEITER</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectTyp;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  text: {
    borderColor: "#000",
    height: "10%",
    textAlignVertical: "center",
  },
  submit: {
    backgroundColor: "#b00",
    paddingHorizontal: 25,
    paddingVertical: 20,
    borderRadius: 10,
    fontWeight: "bold",
    width: 200,
    textAlign: "center",
    fontSize: 20,
    marginTop: 150,
    elevation: 15,
    color: "#fff",
  },
});
