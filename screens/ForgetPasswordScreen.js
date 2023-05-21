import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import BackButton from '../components/BackButton';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { setUserLoading } from '../redux/slice/UserSlice';

const ForgetPasswordScreen = () => {

    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const { userLoading } = useSelector(state => state.user);


    const handleResetPassword = async () => {
        dispatch(setUserLoading(true));
        if (email != null) {
            await sendPasswordResetEmail(auth, email).then(() => {
                alert('check ur email');
                dispatch(setUserLoading(false));

                setTimeout(() => {
                    navigation.goBack();
                }, 2000);
            }).catch((error) => {
                alert('Something went wrong...!');
            })
        } else {
            alert('Something went Wrong...!');
        }
    }
    return (
        <KeyboardAvoidingView >
            <View className="flex justify-between h-full mx-4">
                <View className="mb-20">

                    <View className="relative mt-5">
                        <View className="absolute top-0 left-0">
                            <BackButton />
                        </View>
                        <Text className="text-gray-600 font-bold text-3xl shadow-sm text-center">
                            Add Expense
                        </Text>
                    </View>

                    <View className="flex-row justify-center my-3 mt-12">
                        <Image className="h-48 w-96"
                            source={require('../assets/forget.png')}
                        />
                    </View>
                </View>

                <View className="space-y-2 mx-2">
                    <Text className="text-gray-600 text-lg font-bold">
                        Enter Email
                    </Text>
                    <TextInput value={email} onChangeText={value => setEmail(value)} className="p-4 bg-white rounded-lg mb-3" />

                </View>

                <View>
                   {
                            userLoading ? (<Loading />)
                                :
                                (
                                    <TouchableOpacity onPress={handleResetPassword} className="bg-[#00CCBB] my-6 rounded-lg p-3 shadow-sm mx-2">
                                        <Text className="text-center text-white text-lg font-bold">Click me</Text>
                                    </TouchableOpacity>
                                )
                        }

                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default ForgetPasswordScreen

const styles = StyleSheet.create({})