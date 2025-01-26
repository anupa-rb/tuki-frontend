import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { useRoute } from "@react-navigation/native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FeatherIcon from "react-native-vector-icons/Feather";

export default function PlaceOrder({ navigation }) {
  const route = useRoute();
  const { title, price, coverImage, description, productId } = route.params;
  const [form, setForm] = useState({
    quantity:"",
    description: "",

  });
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e8ecf4" }}>
      <KeyboardAwareScrollView>
        <View style={styles.header}>
          <Image
            source={require("../../assets/LOGO.png")}
            style={styles.image}
          />
          <View style={styles.rightContainer}>
            <TouchableOpacity
              style={{ paddingHorizontal: 10, alignSelf: "center" }}
              onPress={() => {
                navigation.navigate("Notification");
              }}
            >
              <FeatherIcon color="#6a99e3" name="bell" size={28} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("BuyerProfile");
              }}
            >
              <Image
                source={require("../../assets/user.jpg")}
                style={styles.avatarMD}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.form}>


          <View style={styles.input}>
          <Text style={styles.inputLabel}>Item</Text>
          <Text >{title}</Text>
          <Text style={styles.inputLabel}>Price</Text>
          <Text>{price}</Text>
          <Text style={styles.inputLabel}>Quantity</Text>
          <TextInput
              clearButtonMode="while-editing"
              keyboardType="numeric"
              onChangeText={(name) => setForm({ ...form, quantity })}
              placeholder="Quantity"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.quantity}
            />
            <Text style={styles.inputLabel}>Description</Text>

            <TextInput
              clearButtonMode="while-editing"
              onChangeText={(name) => setForm({ ...form, description })}
              placeholder="Description"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.description}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>

      <TouchableOpacity
        onPress={() => {
          // handle link
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
    paddingVertical: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 31,
    fontWeight: "700",
    color: "#1D2A32",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
  },
  container: {
    paddingVertical: 48,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  /** Header */
  header: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  avatarMD: {
    width: 50,
    height: 50,
    borderRadius: 9999,
  },
  avatarXL: {
    width: 64,
    height: 64,
    borderRadius: 9999,
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    alignSelf: "center",
  },

  headerBack: {
    padding: 8,
    paddingTop: 0,
    position: "relative",
    marginLeft: -16,
    marginBottom: 6,
  },
  /** Form */
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formFooter: {
    paddingVertical: 24,
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
    letterSpacing: 0.15,
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
    height: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    borderWidth: 1,
    borderColor: "#C9D3DB",
    borderStyle: "solid",
  },
  /** Button */
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#075eec",
    borderColor: "#075eec",
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
});
