import AnimatedLottieView from "lottie-react-native";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useInfoContext } from "../AppContext";

const Confirm = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const { info, setInfo } = useInfoContext();

  const handleConfirm = () => {
    //TODO: POST FUNCTION
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 750);
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
          <Text style={styles.info}>ARTIKEL ID: {info.itemID}</Text>
          <Text style={styles.info}>TYP: {info.typ}</Text>
        </View>
      )}

      <View style={{ flexDirection: "row", columnGap: 8 }}>
        <Text style={styles.confirm} onPress={() => handleConfirm()}>
          Bestätigen
        </Text>
        <Text style={styles.decline} onPress={() => handleDecline()}>
          Ablehnen
        </Text>
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
  },
  decline: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    width: 150,
    paddingVertical: 20,
    borderRadius: 10,

    backgroundColor: "red",
  },
  info: {
    padding: 20,
    fontSize: 15,
    fontWeight: "bold",
    backgroundColor: "#fff",
    width: 310,
    textAlign: "center",
  },
  loadingWrap: {
    justifyContent: "center",
    alignItems: "center",
    height: "25%",
    width: "100%",
    // backgroundColor: "red",
  },
});
