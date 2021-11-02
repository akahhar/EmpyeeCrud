import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  CheckBox,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";
import Text from "../components/text/text";
import { MaterialIcons } from "@expo/vector-icons";
import { colors, spacing } from "../theme";

const styles = StyleSheet.create({
  checkboxBody: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
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
  },
});
export default function Checkbox({ label }) {
  return (
    <Pressable onPress={} style={styles.checkbox}>
      <Text preset="text-sm">{label}</Text>
    </Pressable>
  );
}
