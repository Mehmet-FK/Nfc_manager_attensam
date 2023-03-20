import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import nfcManager, { Ndef, NfcEvents, NfcTech } from "react-native-nfc-manager";
import AndroidPrompt from "../components/AndroidPrompt";

import { addNdefRecord, RTD_MAP, writeMessage } from "../functions";

const AddNdefRecord = ({ navigation }) => {
  const [tagInfo, setTagInfo] = useState([]);

  const promptRef = useRef();
  async function registerTag() {
    await nfcManager.registerTagEvent();
  }
  async function scanTag() {
    let tag2 = null;

    try {
      nfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
        setTagInfo(tag?.ndefMessage);
        promptRef.current.setVisible(false);
        //!
        console.log("tagInfo!!!", tag);
        let msgArr = [...tag?.ndefMessage];

        let extra = { type: "URI", record: "com.google.android.apps.maps" };

        //!

        writeMessage(tag?.ndefMessage, extra).catch((err) => console.log(err));
      });
    } catch (error) {
      console.warn("ERROR ANR: 23-28", error);
    }
  }

  useEffect(() => {
    scanTag();

    registerTag();

    promptRef.current.setVisible(true);
    return () => {
      nfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    };
  }, []);

  return (
    <View
      style={{ height: "100%", alignItems: "center", justifyContent: "center" }}
    >
      <AndroidPrompt ref={promptRef} navigation={navigation} />
    </View>
  );
};

export default AddNdefRecord;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#eee",
    rowGap: 5,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "left",
    textAlignVertical: "center",
    fontSize: 17,
    borderLeftWidth: 1,
    borderLeftColor: "#0005",
    paddingLeft: 5,
  },
  title: {
    minWidth: "25%",
    textAlign: "left",
    textAlignVertical: "center",
    fontSize: 15,
  },
  textWrap: {
    borderLeftWidth: 1,
    borderLeftColor: "#0005",
    borderRadius: 10,
    backgroundColor: "#fff",
    width: "90%",
    height: 80,
    padding: 5,
    flexDirection: "row",

    paddingHorizontal: 10,
  },
});
