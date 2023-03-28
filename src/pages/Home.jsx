import * as React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import nfcManager, { Ndef } from "react-native-nfc-manager";

const Home = ({ navigation }) => {
  const [hasNfc, setHasNfc] = React.useState(null);

  React.useEffect(() => {
    async function checkNfc() {
      try {
        const supported = await nfcManager.isSupported();

        if (supported) {
          await nfcManager.start();
          setHasNfc(supported);
          console.log("SUPPORTED", supported);
        }
      } catch (error) {
        console.log(error);
      }
    }

    checkNfc();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ height: "25%" }}>
        <Image style={styles.image} source={require("../../assets/logo.png")} />
      </View>

      {hasNfc && (
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            rowGap: 10,
            width: "90%",
          }}
        >
          <TouchableOpacity
            style={styles.list}
            onPress={() => navigation.navigate("ActivateDetails")}
          >
            <View style={styles.list}>
              <Text style={styles.text}>AKTIVIERUNG</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.list}
            onPress={() => navigation.navigate("Info")}
          >
            <View style={styles.list}>
              <Text style={styles.text}>INFO</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    height: "100%",
    rowGap: 10,
    width: "100%",
  },
  list: {
    width: "100%",
    height: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#b00",
    borderRadius: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 25,
    color: "#fff",
  },
  image: {
    width: 300,
    height: "50%",
  },
});
