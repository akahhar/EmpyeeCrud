import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../config";
import { spacing } from "../theme";
import Text from "./text/text";

const style = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: spacing[7],
    alignItems: "center",
  },
  headerIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  addIcon: {
    marginLeft: spacing[5],
    marginTop: spacing[2],
  },
});
export default function Header({ title, backBtn = false }) {
  const navigation = useNavigation();

  return (
    <View style={style.header}>
      {backBtn && (
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back"
          size={22}
          color="black"
        />
      )}
      <View style={style.headerIcon}>
        <Text preset="h5">{title}</Text>
        {!backBtn && (
          <Feather
            style={style.addIcon}
            onPress={() => navigation.navigate("Create")}
            name="plus-circle"
            size={22}
            color="black"
          />
        )}
      </View>
      <MaterialIcons
        onPress={() => firebase.auth().signOut()}
        name="logout"
        size={22}
        color="black"
      />
    </View>
  );
}
