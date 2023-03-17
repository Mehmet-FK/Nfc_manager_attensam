import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import nfcManager, { NfcEvents, NfcTech } from "react-native-nfc-manager";
import AndroidPrompt from "../components/AndroidPrompt";

import { addNdefRecord, writeMessage } from "../functions";

const AddNdefRecord = () => {
  async function scanTag() {
    let tag = null;
    try {
      await nfcManager.requestTechnology([NfcTech.Ndef]);
      console.log(1);
      tag = await nfcManager.getTag();
      console.log(2);
      return tag;
    } catch (error) {
      console.log("asdasdasd", error);
      console.log(3);
    }
    return tag;
  }
  //   async function scanTag() {
  //     await nfcManager.registerTagEvent();
  //   }
  const promptRef = useRef();
  const [tagInfo, setTagInfo] = useState([]);
  //   const [tag, settag] = useState(second)

  useEffect(() => {
    promptRef.current.setVisible(true);
    let tag = scanTag();
    console.log("tag", tag);
    promptRef.current.setVisible(true);
    /*  nfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
      addNdefRecord(tagInfo, "mehmet");
    }); */

    // promptRef.current.setVisible(true);

    return () => {
      nfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    };
  }, []);

  return (
    <View
      style={{ height: "100%", alignItems: "center", justifyContent: "center" }}
    >
      <AndroidPrompt ref={promptRef} />
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
