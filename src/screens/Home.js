import React, { useEffect, useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import Header from "../components/Header";
import Text from "../components/text/text";
import { colors, spacing } from "../theme";
import { firebase } from "../config";
import {
  MaterialIcons,
  Feather,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
import { showMessage } from "react-native-flash-message";

const style = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: spacing[8],
    backgroundColor: "#ffffff",
  },
  emptyNote: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emtyImg: {
    width: 250,
    height: 200,
  },
  emptBtn: {
    marginTop: spacing[10],
  },
  img: {
    width: 58,
    height: 58,
    borderRadius: 32,
  },
  emp: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing[6],
  },
  empRight: {
    marginLeft: spacing[5],
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
    flex: 1,
    paddingBottom: spacing[4],
    flexDirection: "row",
    justifyContent: "space-between",
  },
  checkbox: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.black,
    borderWidth: 2,
    borderRadius: 14,
    height: 28,
    width: 28,
    marginTop: spacing[2],
    marginLeft: spacing[2],
    backgroundColor: colors.black,
  },
  rcheckbox: {
    alignItems: "center",
    flexDirection: "row",
  },
  noteBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
});
const checkBoxData = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thur", "Fri"];

export default function Home({ navigation }) {
  const [employee, setEmployee] = useState([]);
  const empRef = firebase.firestore().collection("employee");
  const user = firebase.auth().currentUser;

  const renderEmployee = ({ item }) => {
    
    const { name, gender, age, image, shift, id } = item;

    return (
      <View style={style.emp}>
        <Image style={style.img} source={{ uri: image }} />
        <View style={style.empRight}>
          <View>
            <Text preset="bold">{name}</Text>
            <Text preset="textGray text-sm ml mt-sm">
              {gender} . {age}
            </Text>
            <View style={[style.rcheckbox, style.mt]}>
              {shift.map((label, index) => (
                <>
                  {label ? (
                    <View key={index} style={style.checkbox}>
                      <Text preset="bold textWhite text-sm">
                        {checkBoxData[index]}
                      </Text>
                    </View>
                  ) : (
                    <Text preset="bold textWhite"></Text>
                  )}
                </>
              ))}
            </View>
          </View>

          <View style={style.noteBtn}>
            <Pressable
              onPress={() => navigation.navigate("Update", { emp: item })}
            >
              <Feather
                name="edit"
                size={20}
                style={{ paddingHorizontal: spacing[4] }}
                color={colors.black}
              />
            </Pressable>
            <Pressable
              onPress={() => {
                empRef.doc(id).delete();
                showMessage({
                  message: "Employee Deleted",
                  type: "danger",
                });
              }}
            >
              <AntDesign name="delete" size={20} color={colors.black} />
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  useEffect(() => {
    const subscriber = empRef
      .where("authorId", "==", user.uid)
      .onSnapshot((snapshot) => {
        const newEmp = [];
        snapshot.forEach((doc) => {
          newEmp.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setEmployee(newEmp);
      });
    return subscriber;
  }, []);
  return (
    <SafeAreaView style={style.body}>
      <Header title="My Employee" />
      {employee.length === 0 ? (
        <View style={style.emptyNote}>
          <Image
            style={style.emtyImg}
            source={require("../../assets/img/emptyEmployee.png")}
            resizeMode="stretch"
          />
          <Text>Sorry you do not have notes</Text>

          <Button
            style={style.emptBtn}
            title="Add an employee"
            onPress={() => navigation.navigate("Create")}
          />
        </View>
      ) : (
        <FlatList
          data={employee}
          renderItem={renderEmployee}
          keyExtractor={(item) => item.id}
        />
      )}
    </SafeAreaView>
  );
}
