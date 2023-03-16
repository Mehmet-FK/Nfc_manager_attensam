import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import ListItem from "../components/ListItem";
import { getDataFromApi } from "../functions";

const Activate = () => {
  const [data, setData] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [shownData, setShownData] = useState(data);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (inputVal === "") {
      return;
    }
    const filtered = data.filter((x) =>
      Object.values(x)?.toString()?.toLowerCase()?.includes(inputVal)
    );
    setShownData(filtered);
  };

  useEffect(() => {
    setLoading(true);
    getDataFromApi()
      .then((res) => setData(res))
      .then(() => setLoading(false));
  }, []);
  useEffect(() => {
    setShownData(data);
  }, [data]);

  return (
    <View>
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
        <View style={styles.loadingWrap}>
          <Text style={styles.loading}>LOADING...</Text>
        </View>
      )}

      {!loading && (
        <ScrollView style={styles.scrollView}>
          {shownData.map((item, i) => (
            <ListItem key={i} item={item} />
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
    height: "70%",
    width: "100%",
    // backgroundColor: "red",
  },
});
