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

export const writeMessage = async (paramArr, extra) => {
  // let bytes = null;
  try {
    await nfcManager.requestTechnology(NfcTech.Ndef);
    // let bytes = null;

    console.log("XXX", extra);
    /* if (extra.type === "TEXT") {
      extra = Ndef.textRecord(extra.record);
    } else if (extra.type === "URI") {
      extra = Ndef.uriRecord(extra.record);
    } */
    // extra = Ndef.uriRecord(extra.record);

    extra = Ndef.textRecord("C");

    console.log("X", extra);
    console.log("ARRAY", [...paramArr, extra]);

    // const bytes = Ndef.encodeMessage([...paramArr, extra]);
    const bytes = Ndef.encodeMessage(paramArr);

    await nfcManager.ndefHandler
      .writeNdefMessage(bytes)
      .catch((err) => console.warn("catch", err));
    console.warn("NDEF WRITTEN");
  } catch (error) {
    console.warn("ERRROR line 42 ", error);
  } finally {
    nfcManager.cancelTechnologyRequest().catch(() => 0);
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

export const TNF_MAP = {
  EMPTY: 0x0,
  WELL_KNOWN: 0x01,
  MIME_MEDIA: 0x02,
  ABSOLUTE_URI: 0x03,
  EXTERNAL_TYPE: 0x04,
  UNKNOWN: 0x05,
  UNCHANGED: 0x06,
  RESERVED: 0x07,
};

export const RTD_MAP = {
  TEXT: "T", // [0x54]
  URI: "U", // [0x55]
  SMART_POSTER: "Sp", // [0x53, 0x70]
  ALTERNATIVE_CARRIER: "ac", //[0x61, 0x63]
  HANDOVER_CARRIER: "Hc", // [0x48, 0x63]
  HANDOVER_REQUEST: "Hr", // [0x48, 0x72]
  HANDOVER_SELECT: "Hs", // [0x48, 0x73]
};
