import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { Ndef } from "react-native-nfc-manager";
import { extractNdef } from "../functions";

const NdefMessage = ({ tag, style }) => {
  // const [text, setText] = useState("empty");
  /*  const obj = tag?.pop();
  const { payload } = obj;
  console.log("sdfsdfasdfsdfsdfsdfsdfd", payload); */
  useEffect(() => {
    /*  const res = Ndef.text.decodePayload(payload);
    setText(res); */
    // extractNdef(tag);
  }, []);

  return <Text style={style}>{JSON.stringify(tag)}</Text>;
};

export default NdefMessage;
