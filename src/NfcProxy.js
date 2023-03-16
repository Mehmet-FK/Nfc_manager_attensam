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
}

export default new NfcProxy();
