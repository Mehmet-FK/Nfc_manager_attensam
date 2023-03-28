import AnimatedLottieView from "lottie-react-native";
import { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import nfcManager, { NfcEvents } from "react-native-nfc-manager";
import { useInfoContext } from "../AppContext";
import AndroidPrompt from "../components/AndroidPrompt";
import ListItem from "../components/ListItem";
import { getDataFromApi, scanTag } from "../functions";

const Activate = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [shownData, setShownData] = useState(data);
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);

  const { info, setInfo } = useInfoContext();

  const handleSearch = () => {
    if (inputVal === "") {
      return;
    }
    const filtered = data.filter((x) =>
      Object.values(x)?.toString()?.toLowerCase()?.includes(inputVal)
    );
    setShownData(filtered);
  };

  const promptRef = useRef();

  useEffect(() => {
    if (!flag) {
      return;
    }
    nfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
      console.log("TAG", tag);
      promptRef.current.setVisible(false);
      setInfo({ ...info, tag: tag.id });
      navigation.navigate("Confirm");
    });
    scanTag();
    return () => {
      nfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    };
  }, [flag]);

  useEffect(() => {
    setLoading(true);
    getDataFromApi() //TODO: set info.zähler as parameter
      .then((res) => setData(res))
      .then(() => setLoading(false));
  }, []);

  useEffect(() => {
    setShownData(data);
  }, [data]);
  const handleClick = (item) => {
    setInfo({ ...info, itemID: item.id });
    setFlag(true);
    promptRef.current?.setVisible(true);
    // navigation.navigate("Confirm");
  };
  return (
    <View>
      <AndroidPrompt navigation={navigation} ref={promptRef} />
      <TextInput
        value={inputVal}
        onChangeText={(text) => setInputVal(text)}
        onSubmitEditing={() => handleSearch()}
        autoCapitalize="none"
        placeholder="Suchen..."
        autoFocus={true}
        style={styles.input}
      />

      {loading && (
        <View style={[styles.loadingWrap]}>
          <AnimatedLottieView
            source={require("../../assets/loading.json")}
            autoPlay
            loop
            speed={1}
          />
        </View>
      )}

      {!loading && (
        <ScrollView style={styles.scrollView}>
          {shownData.map((item, i) => (
            <ListItem
              key={i}
              navigation={navigation}
              i={i}
              item={item}
              promptRef={promptRef}
              handleClick={handleClick}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Activate;
const styles = StyleSheet.create({
  scrollView: { rowGap: 15 },
  input: {
    height: 60,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    paddingLeft: 15,
  },
  loading: {
    width: 200,
    height: 200,
    fontSize: 30,
    textAlignVertical: "center",
    textAlign: "center",
    backgroundColor: "#e10000",
    borderRadius: 100,
  },
  loadingWrap: {
    justifyContent: "center",
    alignItems: "center",
    height: "90%",
    width: "100%",
    // backgroundColor: "red",
  },
});
