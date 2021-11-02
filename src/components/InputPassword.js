import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { colors, spacing } from "../theme";
import { FontAwesome } from "@expo/vector-icons";
import Text from "./text/text";

const styles = StyleSheet.create({
  input: {
    // padding: spacing[5],
    // paddingLeft: spacing[2],
    // marginHorizontal: spacing[5],
    // marginBottom: spacing[15]
  },
  passwordBody: {
    padding: spacing[5],
    paddingLeft: spacing[4],
    height: 48,
    marginBottom: spacing[4],
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: colors.darkGrey,
    borderWidth: 1,
    backgroundColor: colors.darkGrey,
  },
});
export default function InputPassword({
  placeholder,
  value,
  onChangeValue,
  checkValid,
  style,
}) {
  const [hidePass, setHidePass] = useState(true);
  const [error, setError] = useState(null);
  const checkValidity = (value) => {
    const strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    const errors = [];
    if (value.length < 8) {
      errors.push("Your password must be at least 8 characters");
    }
    if (value.search(/[a-z]/i) < 0) {
      errors.push("Your password must contain at least one letter.");
    }
    if (value.search(/[0-9]/) < 0) {
      errors.push("Your password must contain at least one digit.");
    }
    if (errors.length > 0) {
      setError(errors.join("\n"));
    } else {
      setError(null);
    }
    onChangeValue(value);
  };
  return (
    <View>
      <Text preset="bold uppercase mb">{placeholder}</Text>
      <View style={styles.passwordBody}>
        <TextInput
          autoCorrect={false}
          secureTextEntry={hidePass ? true : false}
          style={[styles.input, style]}
          onChangeText={
            checkValid ? (text) => checkValidity(text) : onChangeValue
          }
          value={value}
        />
        <FontAwesome
          onPress={() => setHidePass(!hidePass)}
          name={hidePass ? "eye-slash" : "eye"}
          size={spacing[8]}
          color={colors.grey}
        />
      </View>
      {error && <Text preset="textDanger">{error}</Text>}
    </View>
  );
}
