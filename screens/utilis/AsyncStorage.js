import AsyncStorage from "@react-native-async-storage/async-storage";

// API URL
const API_URL = 'https://unique-burro-surely.ngrok-free.app/api';

// Register user
export const registerUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Registration successful:', data);
      await AsyncStorage.setItem('accessToken', data.accessToken); // Store access token
    } else {
      console.error('Registration failed:', data);
    }
  } catch (error) {
    console.error('Error registering user:', error);
  }
};

// Login user
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Login successful:', data);
      await AsyncStorage.setItem('accessToken', data.accessToken); // Store access token
    } else {
      console.error('Login failed:', data);
    }
  } catch (error) {
    console.error('Error logging in user:', error);
  }
};

// Check if user is logged in (using stored access token)
export const checkLogin = async () => {
  const accessToken = await AsyncStorage.getItem("accessToken");

  if (accessToken) {
    console.log("User logged in with accessToken:", accessToken);
  } else {
    console.log("No user logged in");
  }
};

// Get the stored access token
export const getAccessToken = async () => {
  try {
    const token = await AsyncStorage.getItem("accessToken");
    if (token) {
      console.log("Access token:", token);
      return token;
    } else {
      console.log("No access token found");
      return null;
    }
  } catch (error) {
    console.error('Error retrieving access token:', error);
    return null;
  }
};

// Remove access token (logout)
export const logout = async () => {
  try {
    await AsyncStorage.removeItem('accessToken');
    console.log("User logged out successfully.");
  } catch (error) {
    console.error('Error logging out:', error);
  }
};
