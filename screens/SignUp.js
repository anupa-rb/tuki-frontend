import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FeatherIcon from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

export default function SignUp({ navigation }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
  });
  const route = useRoute();
  const { isSeller } = route.params;

  const API_URL = "https://unique-burro-surely.ngrok-free.app/api"; // Your API URL

  const handleSignUp = async () => {
    // Check if any field is blank
    if (
      !form.name ||
      !form.phone ||
      !form.email ||
      !form.password ||
      !form.confirmPassword ||
      !form.address
    ) {
      alert("Please fill in all the fields.");
      return;
    }

    // Check if passwords match
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Send form data to the API
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          password: form.password,
          address: form.address,
          isSeller: isSeller,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store accessToken in AsyncStorage
        await AsyncStorage.setItem("accessToken", data.accessToken);

        console.log("Registration successful:", data);
        if (isSeller === true) {
          navigation.navigate("Seller Navigation");
        } else {
          navigation.navigate("Buyer Navigation");
        }
      } else {
        console.error("Registration failed:", data);
        alert(data.message || "Something went wrong, please try again.");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e8ecf4" }}>
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerBack}>
            <FeatherIcon
              color="#1D2A32"
              name="chevron-left"
              size={30}
              onPress={() => {
                navigation.navigate("Login");
              }}
            />
          </View>

          <Text style={styles.title}>Let's Get Started!</Text>

          <Text style={styles.subtitle}>
            Fill in the fields below to get started with your new account.
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              clearButtonMode="while-editing"
              onChangeText={(name) => setForm({ ...form, name })}
              placeholder="John Doe"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.name}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              clearButtonMode="while-editing"
              onChangeText={(phone) => setForm({ ...form, phone })}
              placeholder="9000000000"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.phone}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              keyboardType="email-address"
              onChangeText={(email) => setForm({ ...form, email })}
              placeholder="john@example.com"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.email}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Address</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              keyboardType="email-address"
              onChangeText={(address) => setForm({ ...form, address })}
              placeholder="john@example.com"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.address}
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

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <TextInput
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={(confirmPassword) =>
                setForm({ ...form, confirmPassword })
              }
              placeholder="********"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              secureTextEntry={true}
              value={form.confirmPassword}
            />
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity onPress={handleSignUp}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Get Started</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Text style={styles.formFooter}>
          Already have an account?{" "}
          <Text style={{ textDecorationLine: "underline" }}>Sign in</Text>
        </Text>
      </TouchableOpacity>
      </KeyboardAwareScrollView>
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
  image: {
    width: 300,
    height: 100,
    resizeMode: "contain",
  },
  imageContainer: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
