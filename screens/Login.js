import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
  const [form, setForm] = useState({
    phone: "",
    password: "",
  });

  const API_URL = "https://unique-burro-surely.ngrok-free.app/api"; // Your API URL

  const loginHandler = async () => {
    // Validate credentials
    if (!form.phone || !form.password) {
      Alert.alert("Error", "Please fill in both phone and password");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: form.phone,
          password: form.password,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        // Store accessToken
        await AsyncStorage.setItem("accessToken", data.accessToken);
        Alert.alert("Success", "Logged in successfully!");
        console.log(data);

        // Decode the token to get user details
        const userDetails = jwtDecode(data.accessToken); // Decode the token directly
        console.log("Decoded User Details:", userDetails);

        // Navigate based on isSeller value
        if (userDetails.isSeller === true) {
          navigation.navigate("Seller Navigation");
        } else {
          navigation.navigate("Buyer Navigation");
        }
      } else {
        console.error("Login failed:", data);
        alert(data.message || "Something went wrong, please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Failed to log in. Please try again.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={require("../assets/LOGO.png")} style={styles.image} />
        </View>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome back!</Text>
          <Text style={styles.subtitle}>Sign in to your account</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              keyboardType="phone"
              onChangeText={(phone) => setForm({ ...form, phone })}
              placeholder="98xxxxxxxx"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.phone}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={(password) => setForm({ ...form, password })}
              placeholder="********"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              secureTextEntry={true}
              value={form.password}
            />
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity onPress={loginHandler}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Sign in</Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.formFooter}>
              Don't have an account?{" "}
              <Text style={{ textDecorationLine: "underline" }}>Sign up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    marginVertical: 36,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1d1d1d",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
    textAlign: "center",
  },
  /** Form */
  form: {
    marginBottom: 24,
  },
  formAction: {
    marginVertical: 24,
  },
  formFooter: {
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    textAlign: "center",
  },
  /** Input */
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
  },
  /** Button */
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: "#DC5440",
    borderColor: "#DC5440",
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "600",
    color: "#fff",
  },
  //Image
  image: {
    width: 300, // Set the desired width
    height: 100, // Set the desired height
    resizeMode: "contain",
  },
  imageContainer: {
    marginTop: 50,
    justifyContent: "center", // Vertically centers the content
    alignItems: "center", // Horizontally centers the content
    backgroundColor: "#fff",
  },
});
