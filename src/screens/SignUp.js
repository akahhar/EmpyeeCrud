import React, { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  styleheet,
  StyleSheet,
  View,
} from "react-native";
import Button from "../components/Button";
import Input from "../components/Input";
import InputPassword from "../components/InputPassword";
import Radio from "../components/Radio";
import Text from "../components/text/text";
import { colors, spacing } from "../theme";
import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";
import { firebase } from "../config";

const style = StyleSheet.create({
  body: {
    backgroundColor: colors.white,
    flex: 1,
  },
  mbody: {
    padding: spacing[8],
  },
  loginImg: {
    width: "90%",
    alignSelf: "center",
  },
  mt: {
    marginTop: spacing[10],
  },
  loginFooter: {
    alignSelf: "center",
    position: "absolute",
    bottom: 50,
  },
  flexRow: {
    flexDirection: "row",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    paddingLeft: spacing[6],
  },
});

const genderOption = ["Male", "Female"];

export default function SingUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const SingUpData = () => {
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
    } else {
      setLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          const uid = response.user.uid;
          const userProfileData = {
            id: uid,
            name: fullname,
            email: email,
          };
          const userRef = firebase.firestore().collection("users");
          userRef
            .doc(uid)
            .set(userProfileData)
            .then(() => {
              navigation.navigate("Home");
            })
            .catch((error) => {
              setError(error);
            });
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  };

  return (
    <SafeAreaView style={style.body}>
      <View style={style.header}>
        <Ionicons
          style={style.headerIcon}
          onPress={() => navigation.goBack()}
          name="arrow-back"
          size={22}
          color="black"
        />
        <Text preset="bold asCenter center ml">Sing Up</Text>
      </View>

      <View style={style.mbody}>
        <View>
          <Input
            placeholder={"Full Name"}
            onChangeValue={(text) => setFullname(text)}
          />
          <Input
            placeholder={"Email"}
            onChangeValue={(text) => setEmail(text)}
          />
          <InputPassword
            placeholder={"Password"}
            checkValid={true}
            onChangeValue={(text) => setPassword(text)}
          />

          <Text preset="textGray mb">
            Password must include at least 8 characters, 1 symbol and 1 capital
            letter (example: @Bttr123)
          </Text>

          <InputPassword
            placeholder={"Confirm Password"}
            checkValid={true}
            onChangeValue={(text) => setConfirmPassword(text)}
          />

          {error && <Text preset="textDanger mt">{error}</Text>}

          {loading ? (
            <ActivityIndicator />
          ) : (
            <Button
              onPress={SingUpData}
              style={{ alignSelf: "center", marginTop: spacing[20] }}
              title="Submit"
            />
          )}
        </View>
        <View style={[style.flexRow, style.mt]}>
          <Pressable onPress={() => navigation.navigate("TermsOfUse")}>
            <Text preset="text-xs textGray">
              By Countinuing,you accept the{" "}
              <Text preset="bold TextSuccess">Terms of use</Text> use{" "}
            </Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("PrivacyPolicy")}>
            <Text preset="text-xs textGray">
              and <Text preset="bold TextSuccess">Privacy Policy</Text>
            </Text>
          </Pressable>
        </View>
      </View>
      <Pressable
        onPress={() => navigation.navigate("Login")}
        style={style.loginFooter}
      >
        <Text preset="bold">
          Remember your account? <Text preset="bold TextSuccess">Login</Text>
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}
