import React, { forwardRef, useEffect, useState } from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Image,
} from "react-native";
import nfcManager from "react-native-nfc-manager";

const AndroidPrompt = ({ navigation }, ref) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (ref) {
      ref.current = {
        setVisible,
      };
    }
  }, [ref]);

  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.content}>
        <View style={[styles.backdrop, StyleSheet.absoluteFill]}>
          <View style={styles.prompt}>
            <Image
              style={{
                width: 200,
                height: 200,
              }}
              source={require("../../assets/nfc-512.png")}
            />
            <Text style={styles.hint}>Bitte den Tag berühren!</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setVisible(false);

                nfcManager.unregisterTagEvent().catch(() => 0);
                // navigation.navigate("Home");
              }}
            >
              <Text style={{ fontSize: 20 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default forwardRef(AndroidPrompt);

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  backdrop: {
    backgroundColor: "#00000090",
  },
  prompt: {
    position: "absolute",
    bottom: 0,
    left: 0,
    left: 20,
    width: Dimensions.get("window").width - 2 * 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    rowGap: 20,
  },
  hint: {
    fontSize: 24,
    marginBottom: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 15,
    paddingHorizontal: 25,
  },
});
