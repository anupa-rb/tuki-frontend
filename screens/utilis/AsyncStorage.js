import AsyncStorage from "@react-native-async-storage/async-storage";

const checkLogin = async () => {
  const user = await AsyncStorage.getItem("user");
  if (user) {
    console.log("User logged in:", JSON.parse(user));
  } else {
    console.log("No user logged in");
  }
};
