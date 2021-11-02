import React, { useEffect, useState } from "react";
import { StyleSheet, StatusBar, View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { firebase } from "./src/config";
import Home from "./src/screens/Home";
import Create from "./src/screens/Create";
import Profile from "./src/screens/Profile";
import Login from "./src/screens/Login";
import SignUp from "./src/screens/SignUp";
import Update from "./src/screens/Update";
import FlashMessage from "react-native-flash-message";
const Stack = createNativeStackNavigator();
const style = StyleSheet.create({
  activity: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const authStateChanged = (user) => {
    setUser(user);
    setLoading(false);
  };
  useEffect(() => {
    const login = firebase.auth().onAuthStateChanged(authStateChanged);
    return login;
  }, []);

  if (loading) {
    return (
      <View style={style.activity}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Create" component={Create} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Update" component={Update} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SingUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
      <FlashMessage position="top" />
      <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
