import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, decrementQuantity, incrementQuantity } from '../redux/slice/CartSlice';
import { incrementQty, decrementQty } from '../redux/slice/ProductSlice';
import { MinusIcon, PlusIcon } from 'react-native-heroicons/outline';

const DessItem = ({ item }) => {

    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const total = cart.map((item) => item.quantity * item.price).reduce((cur, prev) => cur + prev, 0);
    const addItemToCart = () => {
        dispatch(addToCart(item));
        dispatch(incrementQty(item));
    }

    return (
        <View
            className={total === 0 ? 'shadow-2xl flex-row justify-between items-center bg-gray-200 mb-4 p-4 mx-4 rounded-2xl' :
                'shadow-2xl flex-row justify-between items-center bg-gray-200 mb-6 p-4 mx-4 rounded-2xl'}>
            <Image
                source={{ uri: item.image }}
                className="h-14 w-16"
            />
            <View className="items-center">
                <Text className="font-bold text-lg text-gray-600">{item.name}</Text>
                <Text className="text-sm text-gray-500">$ {item.price}</Text>
            </View>

            {
                cart.some((c) => c.id === item.id) ? (<>
                    <View className="flex-row items-center">
                        <TouchableOpacity onPress={() => {
                            dispatch(decrementQuantity(item)) //cart
                            dispatch(decrementQty(item)) //product
                        }}
                            className="bg-gray-100 p-1 rounded-2xl mr-3">
                            <MinusIcon size={15} color='#00ccbb' />
                        </TouchableOpacity>
                        <Text className="font-bold text-lg">{item.quantity}</Text>
                        <TouchableOpacity onPress={() => {
                            dispatch(incrementQuantity(item)) //cart
                            dispatch(incrementQty(item)) //product
                        }}
                            className="bg-gray-100 p-1 rounded-2xl ml-3">
                            <PlusIcon size={15} color='#00ccbb' />
                        </TouchableOpacity>
                    </View>
                </>)
                    :
                    (<>
                        <TouchableOpacity
                            onPress={addItemToCart} className="px-4 pt-1 pb-1  border border-green-600 rounded-lg">
                            <Text className="font-bold text-lg text-green-600">Add</Text>
                        </TouchableOpacity>
                    </>)
            }

        </View>
    )
}

export default DessItem
