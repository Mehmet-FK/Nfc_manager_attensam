import axios from "axios";
import nfcManager, { Ndef, NfcTech } from "react-native-nfc-manager";

export const extractNdef = (tag) => {
  const { payload, type } = tag?.ndefMessage[0];
  const msg = Ndef.text.decodePayload(payload);
  const id = tag?.id;
  const tagType = String.fromCharCode(type[0]);

  return { msg, tagType, id };
};

export const getDataFromApi = async () => {
  let url = "https://pbsolutions.dev/atina/AtinaUsers";
  let data = null;
  try {
    data = await axios(url);
  } catch (error) {
    console.warn("axiosERROR", error);
  }
  return data.data;
};

export const writeMessage = async (paramArr) => {
  let bytes = null;
  try {
    console.log("first");
    await nfcManager.requestTechnology(NfcTech.Ndef);
    let bytes = null;
    let converted = paramArr.map((x) => Ndef.textRecord(x));
    console.log(converted);
    bytes = Ndef.encodeMessage([...converted]);
    console.log(bytes);
    nfcManager.ndefHandler.writeNdefMessage(bytes);
  } catch (error) {
    console.warn("ERRRORRR", error);
  }
};

export const addNdefRecord = async (prevVal, currVal) => {
  let bytes = null;
  try {
    console.log("first", prevVal);
    console.log("last", currVal);
    await nfcManager.requestTechnology(NfcTech.Ndef);
    let bytes = null;

    bytes = Ndef.encodeMessage([...prevVal, Ndef.textRecord(currVal)]);
    console.log(bytes);
    nfcManager.ndefHandler.writeNdefMessage(bytes);
  } catch (error) {
    console.warn("ERRRORRR", error);
  }
};
