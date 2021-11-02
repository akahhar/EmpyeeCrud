import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import Text from "../components/text/text";
import { colors, spacing } from "../theme";

const styles = StyleSheet.create({
  input: {
    borderColor: colors.darkGrey,
    borderWidth: 1,
    height: 48,
    paddingLeft: spacing[4],
    marginBottom: spacing[10],
    backgroundColor: colors.darkGrey,
  },
});
export default function Input({ placeholder, value, onChangeValue, style }) {
  return (
    <View>
      <Text preset="bold uppercase mb">{placeholder}</Text>
      <TextInput
        autoCorrect={false}
        style={[styles.input, style]}
        onChangeText={onChangeValue}
        value={value}
      />
    </View>
  );
}
