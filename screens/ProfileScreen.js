import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ChevronLeftIcon, MapIcon, PhoneIcon, HeartIcon, CreditCardIcon, ShareIcon, ChatBubbleBottomCenterIcon, Cog8ToothIcon, PencilIcon, PencilSquareIcon, EnvelopeIcon, MapPinIcon } from 'react-native-heroicons/outline';
import { UserGroupIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {

    const navigation=useNavigation();

    const items = [
        {
            id: '1',
            title: 'Your Favorites',
            icon: <HeartIcon size={30} color='#00ccbb' />,

        },
        {
            id: '2',
            title: 'Payments',
            icon: <CreditCardIcon size={30} color='#00ccbb' />,
        },
        {
            id: '3',
            title: 'Tell Your Friends',
            icon: <ShareIcon size={30} color='#00ccbb' />,
        },
        {
            id: '4',
            title: 'Support',
            icon: <ChatBubbleBottomCenterIcon size={30} color='#00ccbb' />,
        }, {
            id: '5',
            title: 'Settings',
            icon: <Cog8ToothIcon size={30} color='#00ccbb' />,
        },
    ];
    return (

        <SafeAreaView>
            <View className="flex-row items-center relative">
                <TouchableOpacity
                    className="mx-4 bg-white shadow-lg rounded-3xl w-10 p-2"
                    onPress={() => navigation.goBack()}>
                    <ChevronLeftIcon size={20} color='#00ccbb' />
                </TouchableOpacity >
                <View className="absolute right-48">
                    <Text className="font-extrabold text-gray-600 text-3xl">My profile</Text>
                </View>
            </View>

            <View className="justify-between mt-10">
                <View className="flex-row mx-6 justify-between items-center">
                    <View className="flex-row items-center ">
                        <View className="border-2 border-green-400 rounded-full p-2">
                            <Image source={require('../assets/avatar.png')}
                                className="h-16 w-16"
                            />
                        </View>
                        <Text className="font-bold text-3xl mx-4">Deepak</Text>
                    </View>
                    <TouchableOpacity onPress={()=> navigation.navigate('EditProfile')} className=''>
                        <PencilSquareIcon size={30} color='#00ccbb' />
                    </TouchableOpacity >
                </View>
                <View className="flex-col space-y-4 mx-6 mt-4">
                    <View className="flex-row items-center space-x-4 ">
                        <MapPinIcon size={20} color='#00ccbb' />
                        <Text className="font-bold text-lg mx-4">Roorkee ,India</Text>
                    </View>
                    <View className="flex-row items-center space-x-4 ">
                        <PhoneIcon size={20} color='#00ccbb' />
                        <Text className="font-bold text-lg mx-4 ">8433098655</Text>
                    </View>
                    <View className="flex-row items-center space-x-4 ">
                        <EnvelopeIcon size={20} color='#00ccbb' />
                        <Text className="font-bold text-lg mx-4 ">deepakhcnadra@gmail.com</Text>
                    </View>
                </View>
                <View className="flex-row justify-around items-center mt-10">
                    <View className="flex-col w-48 h-24 bg-white rounded-lg p-8 items-center">
                        <Text className="text-lg ">$ 112</Text>
                        <Text className="text-gray-600 text-2xl ">Wishlist</Text>
                    </View>
                    <View className="flex-col w-48 h-24 bg-white rounded-lg p-8 items-center" >
                        <Text className="text-lg ">12</Text>
                        <Text className="text-gray-600 text-2xl ">Orders</Text>
                    </View>
                </View>
            </View>
            <View className="bg-white mx-4 mt-10 rounded-xl p-4">
                {items.map((item, index) => {
                    return (<View key={index} className="flex-row items-center space-y-6">
                        <View className="mr-4 mt-7">
                            {item.icon}
                        </View>
                        <Text className="text-lg text-gray-600 ">{item.title}</Text>
                    </View>)
                })}
            </View>
        </SafeAreaView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})