import { ScrollView, StyleSheet, TouchableOpacity, Text, View, SafeAreaView, Alert } from 'react-native'
import React from 'react'
import { ChevronLeftIcon, MinusIcon, PlusIcon } from 'react-native-heroicons/solid'
import {  decrementQuantity, incrementQuantity } from '../redux/slice/CartSlice'
import { decrementQty, incrementQty } from '../redux/slice/ProductSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'
import moment from "moment";
import { LogBox } from 'react-native';
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart?.map((item) => item.quantity * item.price).reduce((cur, prev) => cur + prev, 0);
  const dispatch = useDispatch();
  const route = useRoute();
  const userUid=auth.currentUser.uid;
  const formatDate = moment(route.params.pickUpDate).utc().format('YYYY-MM-DD');
  const navigation = useNavigation();

  const procreedToOrderCart = async () => {
    navigation.navigate('Order');
    await setDoc(
      doc(db, "users", `${userUid}`),
      {
        orders: { ...cart },
        pickUpDetails: route.params,
      },
      {
        merge: true,
      }
    );

  }
  return (
    <SafeAreaView className="flex-1 bg-gray-100 pt-16">

      <View className="flex-row items-center relative">
        <TouchableOpacity
          className="mx-4 bg-white shadow-lg rounded-3xl w-10 p-2"
          onPress={() => navigation.replace('Pickup')}>
          <ChevronLeftIcon size={20} color='#00ccbb' />
        </TouchableOpacity >
        <View className="absolute right-56">
          <Text className="font-extrabold text-gray-600 text-3xl">Cart</Text>
        </View>
      </View>

      <View className="flex-1 justify-between">

        <View className="mx-3 mt-4 p-6 bg-white rounded-2xl shadow-lg">
          {
            cart && cart?.map((item, index) => {
              return (
                <View
                  className="flex-row justify-between items-center mb-4"
                  key={index}>

                  <Text className="font-bold text-gray-600 text-lg w-52">{item.name}</Text>

                  <View className="flex-row items-center justify-center  border border-[#00CCBB] p-1 rounded-lg shadow-2xl">
                    <TouchableOpacity onPress={() => {
                      dispatch(decrementQuantity(item)) //cart
                      dispatch(decrementQty(item)) //product
                    }}
                      className="p-1 rounded-2xl mr-3">
                      <MinusIcon size={15} color='#00ccbb'
                      />
                    </TouchableOpacity>
                    <Text className="font-extrabold text-green-300 text-lg">{item.quantity}</Text>
                    <TouchableOpacity onPress={() => {
                      dispatch(incrementQuantity(item)) //cart
                      dispatch(incrementQty(item)) //product
                    }}
                      className="w-p-1 rounded-2xl ml-3">
                      <PlusIcon size={15} color='#00ccbb' />
                    </TouchableOpacity>
                  </View>
                  <Text className="font-bold text-gray-600 text-lg">
                    $  {item.price * item.quantity}
                  </Text>
                </View>)
            })
          }
        </View>

        {total === 0 ? (
          null) : (
          <View className="p-2 bg-white mt-2">
            <View className="bg-white mt-4 p-2 rounded-2xl shadow-lg">
              <View>
                <View className="flex-row items-center justify-between mb-1">
                  <Text className="font-bold text-gray-400 text-sm">Item Total</Text>
                  <Text className="font-bold text-gray-600 text-sm">$  {total}</Text>
                </View>
                <View className="flex-row items-center justify-between mb-1">
                  <Text className="font-bold text-gray-400 text-sm">Delivery Free/ 1km</Text>
                  <Text className="font-bold text-gray-600 text-sm">Free</Text>
                </View>
                <View className="flex-row items-center justify-between mb-2 border-b-2">
                  <Text className="font-bold text-gray-400 text-sm">Free Delivery on your order</Text>
                  <Text className="pb-4"></Text>
                </View>
              </View>
              <View>
                <View className="flex-row items-center justify-between mb-1">
                  <Text className="font-bold text-gray-400 text-sm">Selected Date</Text>
                  <Text className="font-bold text-gray-600 text-sm">{formatDate}</Text>
                </View>
                <View className="flex-row items-center justify-between mb-1">
                  <Text className="font-bold text-gray-400 text-sm">No. of Days</Text>
                  <Text className="font-bold text-gray-600 text-sm">{route.params.no_Of_days}</Text>
                </View>
                <View className="flex-row items-center justify-between mb-2 border-b-2">
                  <Text className="font-bold text-gray-400 text-sm">Selected pickup time</Text>
                  <Text className="pb-4">{route.params.selectedTime}</Text>
                </View>
              </View>
              <View className="flex-row items-center justify-between mb-2">
                <Text className="font-bold text-gray-600 text-sm">To Pay</Text>
                <Text className="font-bold text-gray-600 text-lg">
                  {total + 95}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={procreedToOrderCart}
              className="rounded-lg bg-[#00CCBB] p-4">
              <Text className="text-center text-white text-lg font-bold">Place Order</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

export default CartScreen

const styles = StyleSheet.create({})
