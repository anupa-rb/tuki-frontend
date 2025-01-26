import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Button,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MultiSelect } from "react-native-element-dropdown";
import FeatherIcon from "react-native-vector-icons/Feather";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import AntDesign from '@expo/vector-icons/AntDesign';

const API_URL = "https://unique-burro-surely.ngrok-free.app/api"; // API URL

const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];


export default function AddProduct({ navigation }) {
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    deliveryTime: "",
  });
  const [selected, setSelected] = useState([]);
  const [image, setImage] = useState();
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      console.log("Retrieved Token:", token);
      console.log(file);

      if (!token) {
        Alert.alert("Error", "No token found. Please log in.");
        return;
      }

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("price", form.price);
      formData.append("category", form.category);
      formData.append("description", form.description);
      formData.append("deliveryTime", form.deliveryTime);
      // formData.append("coverImage", {
      //   uri: file.uri,
      //   type: file.type,
      //   name: file.name,
      // });

      console.log("Form Data:", formData);

      const response = await fetch(`${API_URL}/gig/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      // console.log("check pass");

      if (response.ok) {
        navigation.navigate("ProductAdded");
      } else {
        const errorText = await response.text(); // Use text() instead of json() if the server doesn't return JSON
        Alert.alert("Error", errorText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      Alert.alert(
        "Error",
        "An unexpected error occurred while submitting the form."
      );
    }
  };

  // const pickImage = async () => {
  //   try {
  //     const { status } =
  //       await ImagePicker.requestMediaLibraryPermissionsAsync();
  //     if (status !== "granted") {
  //       Alert.alert(
  //         "Permission Denied",
  //         "Sorry, we need camera roll permission to upload images."
  //       );
  //       return;
  //     }

  //     const result = await ImagePicker.launchImageLibraryAsync({
  //       mediaType: "photo",
  //       allowsEditing: true,
  //       quality: 1,
  //     });

  //     if (!result.canceled && result.assets && result.assets.length > 0) {
  //       console.log(result);
  //       setFile(result.assets[0].uri);
  //       setError(null); // Clear any previous errors
  //     } else {
  //       setError("No image selected");
  //     }
  //   } catch (err) {
  //     setError("An error occurred while selecting the image.");
  //     console.error(err);
  //   }
  // };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e8ecf4" }}>
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
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Add a New Service</Text>
        </View>

        <View style={styles.form}>
          {/* Form Fields */}
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
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              clearButtonMode="while-editing"
              onChangeText={(description) => setForm({ ...form, description })}
              placeholder="Description"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.description}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Price (Nrs.)</Text>
            <TextInput
              clearButtonMode="while-editing"
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
              clearButtonMode="while-editing"
              onChangeText={(category) => setForm({ ...form, category })}
              placeholder="Category"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.category}
            />
            {/* <MultiSelect
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              style={styles.inputControl}
              search
              data={data}
              labelField="label"
              valueField="value"
              placeholder="Select item"
              searchPlaceholder="Search..."
              value={selected}
              onChange={(item) => {
                setSelected(item);
              }}
              selectedStyle={styles.selectedStyle}
            /> */}
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Delivery Time (Days)</Text>
            <TextInput
              clearButtonMode="while-editing"
              onChangeText={(deliveryTime) =>
                setForm({ ...form, deliveryTime })
              }
              placeholder="deliveryTime"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.deliveryTime}
            />
          </View>

          {/* <View style={{ flex: 1 }}>
            <Text style={styles.inputLabel}>Upload Image</Text>
            {file && (
              <Image
                source={{ uri: file.uri }}
                style={{ width: 312, height: 200 }}
              />
            )}
            <Button title="Pick an Image" onPress={pickImage} />
          </View> */}

          {/* Error Message */}
          {error && <Text style={styles.errorText}>{error}</Text>}

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
    paddingHorizontal: 20,
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
  errorText: {
    color: "red",
    marginTop: 8,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#DC5440",
  },
  btnText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  headerBack: {
    paddingHorizontal: 5,
    marginBottom: -15,
    marginTop: 5,
  },
});
