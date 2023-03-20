import { useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";

import nfcManager, { Ndef, NfcEvents } from "react-native-nfc-manager";
import AndroidPrompt from "../components/AndroidPrompt";

import { writeMessage } from "../functions";

const Write = () => {
  async function scanTag() {
    await nfcManager.registerTagEvent();
  }
  const promptRef = useRef();

  useEffect(() => {
    nfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
      Ndef.writeMessage("p1", "p2", "p3");
      promptRef.current.setVisible(false);
    });
    scanTag();
    promptRef.current.setVisible(true);

    return () => {
      nfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    };
  }, []);

  return (
    <View
      style={{ height: "100%", alignItems: "center", justifyContent: "center" }}
    >
      <Text>WRITE NDEF RECORD</Text>
      {/* <AndroidPrompt ref={promptRef} /> */}
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
