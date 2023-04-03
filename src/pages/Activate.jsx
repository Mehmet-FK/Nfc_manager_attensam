import AnimatedLottieView from "lottie-react-native";
import { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import nfcManager, { NfcEvents } from "react-native-nfc-manager";
import ToastManager, { Toast } from "toastify-react-native";
import { useInfoContext } from "../AppContext";
import AndroidPrompt from "../components/AndroidPrompt";
import ListItem from "../components/ListItem";
import { getDataFromApi, scanTag } from "../functions";

const Activate = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);

  const { info, setInfo } = useInfoContext();
  const handleSearch = () => {
    setLoading(true);
    getDataFromApi(inputVal) //TODO: set info.zähler as parameter
      .then((res) => setData(res))
      .then(() => setLoading(false));
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
      navigation.navigate("Confirm", { item });
    });
    scanTag();
    return () => {
      nfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    };
  }, [flag]);

  const handleClick = (item) => {
    setInfo({ ...info, itemID: item.ItemNumber });
    setFlag(true);
    setItem(item);
    promptRef.current?.setVisible(true);
  };
  // console.log(item);
  return (
    <View>
      <AndroidPrompt navigation={navigation} ref={promptRef} />
      <ToastManager width={350} height={100} />
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
          {data?.map((item, i) => (
            <ListItem
              key={i}
              navigation={navigation}
              i={i}
              setItem={setItem}
              item={item}
              promptRef={promptRef}
              handleClick={handleClick}
            />
          ))}
          <View style={styles.bottom}></View>
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
  bottom: {
    height: 60,
  },
  loadingWrap: {
    justifyContent: "center",
    alignItems: "center",
    height: "90%",
    width: "100%",
    // backgroundColor: "red",
  },
});
