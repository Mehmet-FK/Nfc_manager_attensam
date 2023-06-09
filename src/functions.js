import axios from "axios";
import nfcManager, { Ndef, NfcTech } from "react-native-nfc-manager";
import { Toast } from "toastify-react-native";

export const extractNdef = (tag) => {
  const { payload, type } = tag?.ndefMessage[0];
  const msg = Ndef.text.decodePayload(payload);
  const id = tag?.id;
  const tagType = String.fromCharCode(type[0]);

  return { msg, tagType, id };
};

export const getDataFromApi = async (filter) => {
  if (filter === "") {
    Toast.warn("Bitte Suchbegriff eingeben");
    return [];
  }

  let url = `https://pbsolutions.dev/atina/api/AtinaItems/search?filter=${filter?.toLowerCase()}`;
  let data = null;
  try {
    data = await axios(url);
  } catch (e) {
    Toast.error(e.message);
  }
  if (data) {
    return data.data;
  }
  return [];
};

export const postDataToApi = async (data) => {
  let url = "https://pbsolutions.dev/atina/api/AtinaItems";
  // console.log(data);
  /* const data2 = {
    itemType: "mehmet",
    itemNumber: "mehmet",
    street: "mehmet",
    streetNumber: "mehmet",
    zip: "mehmet",
    city: "mehmet",
    country: "mehmet",
    createdBy: "mehmet",
  };
  console.log(data2); */

  try {
    console.log(2);
    await axios.post(url, data2);
    console.log(3);
    Toast.success("Erfolgreich aktiviert...");
  } catch (error) {
    console.warn(error.message);
    Toast.error("Etwas schiefgelaufen");
    Toast.error(error.message);
  }
};

export async function scanTag() {
  await nfcManager.registerTagEvent();
}

export const writeMessage = async (paramArr, extra) => {
  try {
    await nfcManager.requestTechnology(NfcTech.Ndef);

    extra = Ndef.textRecord(extra);

    let record = Ndef.record(4, TNF_MAP.EXTERNAL_TYPE, "", [49]);
    console.log("RECORD", record);
    await nfcManager.ndefHandler
      .writeNdefMessage()
      .catch((err) => console.warn("catch", err));
    console.warn("NDEF WRITTEN");
  } catch (error) {
    console.warn("ERRROR line 42 ", error);
  } finally {
    nfcManager.cancelTechnologyRequest().catch(() => 0);
  }
};

export const addNdefRecord = async (prevVal, currVal) => {
  null;
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
