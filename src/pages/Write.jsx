import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import nfcManager, { Ndef, NfcEvents, NfcTech } from "react-native-nfc-manager";
import { writeExType } from "../functions";

const Write = () => {
  const [tagInfo, setTagInfo] = useState(null);
  async function scanTag() {
    await nfcManager.registerTagEvent();
  }

  useEffect(() => {
    nfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
      setTagInfo(tag?.ndefMessage);
      nfcManager;
    });
    scanTag();
    writeExType();
    return () => {
      nfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    };
  }, []);

  return (
    <View
      style={{ height: "100%", alignItems: "center", justifyContent: "center" }}
    >
      <Text>WRITE NDEF RECORD</Text>
      <Text>{JSON.stringify(tagInfo)}</Text>
    </View>
  );
};

export default Write;

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
