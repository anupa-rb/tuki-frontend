import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Button,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FeatherIcon from "react-native-vector-icons/Feather";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import Picker from "@react-native-picker/picker";

const API_URL = "https://unique-burro-surely.ngrok-free.app/api"; // Your API URL

export default function AddProduct({ navigation }) {
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    deliveryTime: "",
  });

  const [file, setFile] = useState(null);

  // Stores any error message
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      // Retrieve the token from AsyncStorage
      const token = await AsyncStorage.getItem("accessToken");
      console.log("Retrieved Token:", token);
      console.log(file);

      if (!token) {
        console.error("No token found");
        return;
      }

      if (!file) {
        console.error("Cover image is required");
        return;
      }

      const formData = new FormData();

      // Add other form fields
      formData.append("title", form.title);
      formData.append("price", form.price);
      formData.append("category", form.category);
      formData.append("description", form.description);
      formData.append("deliveryTime", form.deliveryTime);

      // Add the file as coverimage
      formData.append("coverImage", {
        uri: file.uri,
        type: file.type,
        name: file.name,
      });

      console.log(formData);

      // Make the API call
      const response = await fetch(`${API_URL}/gig/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        navigation.navigate("ProductAdded");
      } else {
        console.error("Failed to submit form:", await response.json());
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Function to pick an image from
  //the device's media library
  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Sorry, we need camera roll permission to upload images."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaType: "photo",
        allowsEditing: true,
        quality: 1,
      });

      //   if (!result.canceled) {
      //     const selectedFile = result.assets[0]; // Use the correct property for the image object
      //     setFile({
      //       uri: selectedFile.uri,
      //       type: selectedFile.type || "image/jpeg", // Use MIME type if available
      //       name: selectedFile.uri.split("/").pop(), // Extract file name from URI
      //     });
      //     setError(null); // Clear previous errors
      //   } else {
      //     setError("No image selected");
      //   }
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setFile(result.assets[0]);
      }

      console.log(result);
    } catch (err) {
      setError("An error occurred while selecting the image.");
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
                navigation.navigate("Seller Navigation");
              }}
            />
          </View>

          <Text style={styles.title}>Add a New Service</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Name of Service</Text>

            <TextInput
              clearButtonMode="while-editing"
              onChangeText={(title) => setForm({ ...form, title })}
              placeholder="Knitting Sweaters"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.title}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Price (Nrs.)</Text>

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              // keyboardType="email-address"
              onChangeText={(price) => setForm({ ...form, price })}
              placeholder="000"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.price}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Category</Text>

            <TextInput
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={(category) => setForm({ ...form, category })}
              placeholder="duna"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.category}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Description</Text>

            <TextInput
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={(description) => setForm({ ...form, description })}
              placeholder="Description"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.description}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Delivery Time (Days)</Text>

            <TextInput
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={(deliveryTime) =>
                setForm({ ...form, deliveryTime })
              }
              placeholder="0 days"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.deliveryTime}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.inputLabel}>Upload Image</Text>

            {file && (
              <Image
                source={{ uri: file.uri }}
                style={{ width: 312, height: 200 }}
              />
            )}
            <Button title="Pick an Image" onPress={pickImage} />
          </View>

          {/* Conditionally render the image 
            or error message */}
          {file ? (
            <View style={styles.imageContainer}>
              {/* <Text>Image Selected</Text>{" "} */}
            </View>
          ) : (
            <Text style={styles.errorText}>
              {error || "No image selected."}
            </Text>
          )}
          <View style={styles.formAction}>
            <TouchableOpacity onPress={handleSubmit}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Add</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
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
  /** Header */
  header: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginBottom: 24,
    paddingHorizontal: 24,
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
  avatarImg: {
    width: 80,
    height: 80,
    borderRadius: 9999,
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
    backgroundColor: "#DC5440",
    borderColor: "#DC5440",
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
});
