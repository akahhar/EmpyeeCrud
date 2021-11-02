import React, { useState } from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { spacing } from "../theme";
import Text from "./text/text";

const styles = StyleSheet.create({
  btnBody: {
    flexDirection: "row",
    marginHorizontal: spacing[2],
  },
  outerCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#CFCFCF",
    justifyContent: "center",
  },
  innerCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#CFCFCF",
    alignSelf: "center",
  },
  innerActive: {
    height: 10,
    width: 10,
    borderRadius: 5,
    alignSelf: "center",
    backgroundColor: "#D87D4A",
    borderWidth: 1,
    borderColor: "#D87D4A",
  },
  outerActive: {
    borderWidth: 1,
    borderColor: "#D87D4A",
  },
  btnText: {
    marginLeft: spacing[3],
  },
});
export default function Radio({ label, value, setValue }) {
  const isSlected = value === label;
  return (
    <Pressable onPress={() => setValue(label)} style={styles.btnBody}>
      <View style={[styles.outerCircle, isSlected && styles.outerActive]}>
        <View style={[isSlected && styles.innerActive]} />
      </View>
      <Text preset="bold ml-sm">{label}</Text>
    </Pressable>
  );
}
