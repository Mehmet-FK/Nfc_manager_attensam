import { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import base64 from "react-native-base64";
import nfcManager, {
  Ndef,
  NfcEvents,
  NfcManager,
} from "react-native-nfc-manager";
import AndroidPrompt from "../components/AndroidPrompt";
import NdefMessage from "../components/NdefMessage";
import { extractNdef } from "../functions";

const Info = ({ navigation }) => {
  const [tagInfo, setTagInfo] = useState(null);
  const [tagType, setTagType] = useState(126);
  const [tagText, setTagText] = useState("");
  const [tagID, setTagID] = useState("");
  async function scanTag() {
    await nfcManager.registerTagEvent();
  }
  const promptRef = useRef();

  useEffect(() => {
    nfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
      console.warn("tag found", tag);
      // console.log(String.fromCharCode(tag?.ndefMessage[0].type));
      setTagInfo(tag);
      promptRef.current.setVisible(false);
      const { tagType, msg, id } = extractNdef(tag);
      setTagText(msg);
      setTagType(tagType);
      setTagID(id);
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
      <AndroidPrompt ref={promptRef} navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.textWrap}>
          <Text style={styles.title}>ID:</Text>
          <Text style={styles.text}>{JSON.stringify(tagInfo?.id)}</Text>
        </View>
        <View style={styles.textWrap}>
          <Text style={styles.title}>ENCODED ID:</Text>
          <Text style={{ ...styles.text, fontSize: 12 }}>
            {JSON.stringify(base64.encode(tagID))}
          </Text>
        </View>
        <View style={styles.textWrap}>
          <Text style={styles.title}>INHALT:</Text>

          {tagInfo && <NdefMessage style={styles.text} tag={tagText} />}
        </View>
        <View style={styles.textWrap}>
          <Text style={styles.title}>TYP:</Text>
          <Text style={styles.text}> {tagType}</Text>
        </View>

        <Text style={{ width: "90%" }}>{JSON.stringify(tagInfo)}</Text>
      </View>
    </View>
  );
};

export default Info;

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
