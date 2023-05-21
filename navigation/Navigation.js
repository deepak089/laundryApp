import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import PickupScreen from '../screens/PickupScreen';
import CartScreen from '../screens/CartScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import ForgetPasswordScreen from '../screens/ForgetPasswordScreen';
import OrderScreen from '../screens/OrderScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import { UserGroupIcon } from 'react-native-heroicons/outline';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../config/firebase';
import { setUser } from '../redux/slice/UserSlice';
import { onAuthStateChanged } from 'firebase/auth';

const Stack = createNativeStackNavigator();


const Navigation = () => {

  const { user } = useSelector(state => state.user);

  const dispatch = useDispatch();

  onAuthStateChanged(auth, u => {
    dispatch(setUser(u));
  })
  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
          <Stack.Screen name="Pickup" options={{ headerShown: false }} component={PickupScreen} />
          <Stack.Screen name="Cart" options={{ headerShown: false }} component={CartScreen} />
          <Stack.Screen name="Order" options={{ headerShown: false }} component={OrderScreen} />
          <Stack.Screen name="Profile" options={{ headerShown: false }} component={ProfileScreen} />
          <Stack.Screen name="EditProfile" options={{ headerShown: false }} component={EditProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome'>
          <Stack.Screen name="Welcome" options={{ headerShown: false }} component={WelcomeScreen} />
          <Stack.Screen name="Forget" options={{ headerShown: false }} component={ForgetPasswordScreen} />
          <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
          <Stack.Screen name="Register" options={{ headerShown: false }} component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

}

export default Navigation

const styles = StyleSheet.create({})