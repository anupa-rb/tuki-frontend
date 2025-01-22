import FirstScreen from "./screens/FirstScreen";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import ChooseRole from "./screens/ChooseRole";
import SecondScreen from "./screens/SecondScreen";
import Notification from "./screens/Buyer/Notification";
import Chat from "./screens/Buyer/Chat";
import Message from "./screens/Buyer/Message";
import AddProduct from "./screens/Seller/AddProduct";
import MyProfile from "./screens/Seller/MyProfile";
import BuyerTabNavigation from "./navigation/BuyerTabNavigation";
import SellerTabNavigation from "./navigation/SellerTabNavigation";

export const screens = [
  { name: "First Screen", component: FirstScreen, options: { headerShown: false } },
  { name: "SecondScreen", component: SecondScreen, options: { headerShown: false } },
  { name: "Buyer Navigation", component: BuyerTabNavigation, options: { headerShown: false } },
  { name: "Seller Navigation", component: SellerTabNavigation, options: { headerShown: false } },
  { name: "Login", component: Login, options: { headerShown: false } },
  { name: "SignUp", component: SignUp, options: { headerShown: false } },
  { name: "ChooseRole", component: ChooseRole, options: { headerShown: false } },
  { name: "Notification", component: Notification, options: { headerShown: false } },
  { name: "Message", component: Message, options: { headerShown: false } },
  { name: "Chat", component: Chat, options: { headerShown: false } },
  { name: "AddProduct", component: AddProduct, options: { headerShown: false } },
];
