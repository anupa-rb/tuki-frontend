import React, { useState } from "react";
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

export default function SignUp({ navigation }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e8ecf4" }}>
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerBack}>
            <FeatherIcon color="#1D2A32" name="chevron-left" size={30} />
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
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ChooseRole");
              }}
            >
              <View style={styles.btn}>
                <Text style={styles.btnText}>Get Started</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>

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
    marginBottom: 110,
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
