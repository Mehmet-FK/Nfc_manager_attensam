import { Ndef } from "react-native-nfc-manager";

class NfcProxy {
  async init() {
    let supported = null;
    try {
      supported = await nfcManager.isSupported();

      if (supported) {
        await nfcManager.start();
      }
    } catch (error) {
      console.log(error);
      supported = false;
    }
    return supported;
  }

  async writeMessage(textParam) {
    let bytes = null;
    try {
      bytes = Ndef.encodeMessage([Ndef.textRecord(textParam)]);
    } catch (error) {}
  }
}

export default new NfcProxy();
