/* import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import nfcManager, { NfcEvents } from "react-native-nfc-manager";
import { getDataFromApi, postDataToApi, scanTag } from "../functions";
import AndroidPrompt from "./AndroidPrompt";
import ToastManager from "toastify-react-native";
import Dropdown from "./Dropdown";

const ActivateDetails = ({ route, navigation }) => {
  const [selected, setSelected] = useState(undefined);
  const [tag, setTag] = useState(null);
  const [info, setInfo] = useState({
    itemID: route.params?.item?.id,
    tagID: "",
    typ: selected,
  });
  const promptRef = useRef();
  const data = [
    { label: "Zähler", value: "1" },
    { label: "KFZ", value: "2" },
    { label: "Objekt", value: "3" },
  ];

  const onSelect = (val) => {
    setSelected(val);
    setInfo({ ...info, typ: val.label });
  };

  useEffect(() => {
    nfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
      setInfo({ ...info, tagID: tag.id });
      promptRef.current.setVisible(false);
      setTag(tag);
      //!   postDataToApi(info);
      console.log(info);
      //   navigation.navigate("Activate", { info, promptRef });
    });
    scanTag();

    return () => {
      nfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    };
  }, []);
  const handleSubmit = () => {
    promptRef.current.setVisible(true);
    // getDataFromApi()
    // navigation.navigate("Activate", { info, promptRef })
  };
  console.log(info);
  return (
    <View style={styles.container}>
      <ToastManager />
      <AndroidPrompt navigation={navigation} ref={promptRef} />
      <Dropdown data={data} onSelect={onSelect} />
      <TouchableOpacity
        onPress={() => navigation.navigate("Activate", { info, selected })}
      >
        <Text style={styles.submit}>WEITER</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ActivateDetails;

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
    backgroundColor: "red",
    paddingHorizontal: 25,
    paddingVertical: 20,
    borderRadius: 15,
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 25,
    elevation: 15,
  },
});
 */
