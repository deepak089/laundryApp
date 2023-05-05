import { Image, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import BackButton from '../components/BackButton';
import storage from '@react-native-firebase/storage';


const EditProfileScreen = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');

    const handleSubmit = () => {
     
    }
    return (
        <SafeAreaView>
            <KeyboardAvoidingView className="flex justify-between h-full bg-gray-200">
                <View className="flex justify-between h-full mx-4">

                    <View className="relative mt-5">
                        <View className="absolute top-0 left-0">
                            <BackButton />
                        </View>
                        <Text className="text-gray-600 font-extrabold text-3xl shadow-lg text-center">
                            My profile
                        </Text>
                    </View>

                    <View className="flex-col justify-center items-center">

                        <View className="justify-center items-center border-2 border-green-400 rounded-full">
                            <Image className="h-32 w-32 rounded-full"
                                source={require('../assets/avatar.png')}
                            />
                        </View>
                        <Text className="text-lg font-bold text-green-500 mt-2 ">Change Profile</Text>

                    </View>

                    <View className="space-y-4 flex justify-evenly ">
                        <Text className="text-gray-600 text-lg font-bold ">
                            Email
                        </Text>
                        <TextInput placeholder="Enter Email..." value={email} onChangeText={value => setEmail(value)} className="p-4 bg-white rounded-lg" />

                        <Text className="text-gray-600 text-lg font-bold mx-1">
                            Name
                        </Text>
                        <TextInput placeholder="Enter Password..." value={name} onChangeText={value => setName(value)} className="p-4 bg-white rounded-lg" />

                        <Text className="text-gray-600 text-lg font-bold mx-1">
                            Phone No.
                        </Text>
                        <TextInput placeholder="Enter Phone..." value={phone} onChangeText={value => setPhone(value)} className="p-4 bg-white rounded-lg" />
                        <Text className="text-gray-600 text-lg font-bold mx-1">
                            Gender
                        </Text>
                        <TextInput placeholder="Enter for male m / for female f ..." value={gender} onChangeText={value => setGender(value)} className="p-4 bg-white rounded-lg" />

                    </View>

                    <View>
                        <TouchableOpacity onPress={handleSubmit} className="bg-[#00CCBB] my-6 rounded-lg p-3 shadow-sm">
                            <Text className="text-center text-white text-lg font-extrabold">Update profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default EditProfileScreen

const styles = StyleSheet.create({})