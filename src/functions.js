import axios from "axios";
import { Ndef } from "react-native-nfc-manager";

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
