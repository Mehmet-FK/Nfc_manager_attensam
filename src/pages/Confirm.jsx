import AnimatedLottieView from "lottie-react-native";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useInfoContext } from "../AppContext";

const Confirm = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const { info, setInfo } = useInfoContext();

  const handleConfirm = () => {
    //TODO: POST FUNCTION
    /*   setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 750); */
  };
  const handleDecline = () => {
    setInfo({});
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={[styles.loadingWrap]}>
          <AnimatedLottieView
            source={require("../../assets/loading.json")}
            autoPlay
            loop
            speed={2}
          />
        </View>
      )}

      {!loading && (
        <View style={{ alignItems: "center", rowGap: 5 }}>
          <Text style={styles.info}> TAG ID: {info.tag}</Text>
          <Text style={styles.info}>DATENSATZNUMMER: {info.itemID}</Text>
          <Text style={styles.info}>TYP: {info.typ}</Text>
        </View>
      )}

      <View style={{ flexDirection: "row", columnGap: 8 }}>
        <Text style={styles.confirm} onPress={() => handleConfirm()}>
          OK
        </Text>
        <TouchableOpacity>
          <Text style={styles.decline} onPress={() => handleDecline()}>
            Abbrechen
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Confirm;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    rowGap: 15,
  },
  confirm: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    width: 150,
    paddingVertical: 20,
    backgroundColor: "green",
    borderRadius: 10,
    elevation: 10,
    color: "#fff",
  },
  decline: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    width: 150,
    paddingVertical: 20,
    borderRadius: 10,
    elevation: 10,
    color: "#fff",

    backgroundColor: "#a00",
  },
  info: {
    padding: 25,
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#fff",
    width: 310,
    textAlign: "center",
    elevation: 1,
    borderRadius: 10,
  },
  loadingWrap: {
    justifyContent: "center",
    alignItems: "center",
    height: "25%",
    width: "100%",
    // backgroundColor: "red",
  },
});
