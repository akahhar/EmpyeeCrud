import React, { useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import Input from "../components/Input";
import InputPassword from "../components/InputPassword";
import Text from "../components/text/text";
import { colors, spacing } from "../theme";
import { firebase } from "../config";

const style = StyleSheet.create({
  body: {
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: spacing[8],
  },
  loginFooter: {
    alignSelf: "center",
    position: "absolute",
    bottom: 50,
  },
});
export default function Login({ navigation }) {
  const [error, setError] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              alert("User does not exist anymore.");
              return;
            }
            const user = firestoreDocument.data();
            navigation.navigate("Home", { user });
          })
          .catch((error) => {
            setError(error);
          });
      })
      .catch((error) => {
        setError(error);
      });
  };
  return (
    <SafeAreaView style={style.body}>
      <Image source={require("../../assets/img/logo.png")} />
      <View>
        <Text preset="center bold uppercase mb asCenter">MANAGE ALL YOUR EMPLOYEES</Text>
        <Input placeholder={"Email"} value={email} onChangeValue={setEmail} />

        <InputPassword
          placeholder="Password"
          value={password}
          onChangeValue={setPassword}
        />

        <Button
          onPress={login}
          style={{ alignSelf: "center", marginTop: spacing[10] }}
          title="Login"
        />
      </View>
      {error && <Text preset="textDanger mt">{error}</Text>}
      <Pressable
        onPress={() => navigation.navigate("SingUp")}
        style={style.loginFooter}
      >
        <Text preset="bold">
          Dont have Account? <Text preset="TextSuccess">Sing Up</Text>
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}
