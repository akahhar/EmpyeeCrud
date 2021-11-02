import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import Text from "../components/text/text";
import { colors, spacing } from "../theme";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../config";
import { showMessage } from "react-native-flash-message";
import Input from "../components/Input";
import Radio from "../components/Radio";
import Button from "../components/Button";

const style = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: spacing[8],
    backgroundColor: "#ffffff",
  },
  btn: {
    alignSelf: "center",
    marginTop: spacing[20],
  },
  image: {
    borderColor: colors.grey,
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: spacing[10],
  },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  imageIcon: {
    alignSelf: "center",
  },
  rcheckbox: {
    alignItems: "center",
    flexDirection: "row",
  },
  checkbox: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.black,
    borderWidth: 2,
    borderRadius: 14,
    height: 28,
    width: 28,
    marginLeft: spacing[3],
  },
  checkboxActive: {
    backgroundColor: "#000000",
    color: "#ffffff",
  },
  mt: {
    marginTop: spacing[5],
  },
});

const genderOptions = ["Male", "Female"];
const checkBoxData = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thur", "Fri"];

export default function Create({ navigation }) {
  const [image, setImage] = useState(null);
  const [imageUploading, setImageUploading] = useState(null);
  const [loading, setLoading] = useState(false);

  const [checkedShift, setCheckedShift] = useState(
    new Array(checkBoxData.length).fill(false)
  );

  const [name, setName] = useState(null);
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState(null);
  const [shift, setShift] = useState(null);

  const user = firebase.auth().currentUser;

  const handleChange = (position) => {
    const updatedCheckedShift = checkedShift.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedShift(updatedCheckedShift);
  };

  const saveEmployee = () => {
    setLoading(true);
    const userRef = firebase.firestore().collection("employee");
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const data = {
      name,
      age,
      gender,
      authorId: user.uid,
      createAt: timestamp,
      image,
      shift: checkedShift,
    };
    userRef
      .add(data)
      .then(() => {
        setLoading(false);
        showMessage({
          message: "Note successfully created",
          type: "info",
        });
        navigation.navigate("Home");
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImageUploading(true);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", result.uri, true);
        xhr.send(null);
      });

      const imageName = new Date().getTime().toString();
      const ref = firebase.storage().ref().child(imageName);
      const snapshot = await ref.put(blob);
      blob.close();

      const remoteUri = await snapshot.ref.getDownloadURL();
      setImage(remoteUri);
      setImageUploading(false);
      // setUploading(true);
    }
  };

  return (
    <SafeAreaView style={style.body}>
      <Header title={"Create Employee"} backBtn={true} />

      {imageUploading ? (
        <ActivityIndicator />
      ) : (
        <Pressable style={style.image} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={style.previewImage} />
          ) : (
            <Feather
              style={style.imageIcon}
              name="plus"
              size={24}
              color="black"
            />
          )}
        </Pressable>
      )}

      <Input placeholder={"Name"} value={name} onChangeValue={setName} />

      <Input placeholder={"Age"} value={age} onChangeValue={setAge} />

      <View style={style.rcheckbox}>
        <Text preset="bold mr">Select Gender</Text>
        {genderOptions.map((label, index) => (
          <Radio
            key={index}
            label={label}
            value={gender}
            setValue={setGender}
          />
        ))}
      </View>

      <View style={[style.rcheckbox, style.mt]}>
        <Text preset="bold mr">Select Shift</Text>
        {checkBoxData.map((label, index) => (
          <Pressable
            key={index}
            onPress={() => {
              handleChange(index);
            }}
            style={[
              style.checkbox,
              checkedShift[index] && style.checkboxActive,
            ]}
          >
            <Text
              preset="text-sm"
              style={checkedShift[index] && style.checkboxActive}
            >
              {label}
            </Text>
          </Pressable>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator />
      ) : (
        <Button onPress={saveEmployee} title={"Create"} style={style.btn} />
      )}
    </SafeAreaView>
  );
}
