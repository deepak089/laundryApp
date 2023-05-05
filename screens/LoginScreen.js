import { KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import BackButton from '../components/BackButton';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';
import { onAuthStateChanged } from 'firebase/auth';

const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();
    const dispatch = useDispatch();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    useEffect(() => {
        setLoading(true);
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            if (!authUser) {
                setLoading(false);
            }
            if (authUser) {
                navigation.replace('Home');
            }
        })
        return unsubscribe;
    }, [])

    const handleSubmit = async () => {
        if (email && password) {
            // go to home 
            try {
                // dispatch(setUserLoading(true));

                await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
                    const user = userCredential.user;

                })
            } catch (error) {
                //    toast
                alert('Wrong Credentials...!');
            }
        } else {
            // toast
            alert('Something went Wrong...!');
        }
    }

    return (
        <SafeAreaView>
            {loading ? (<Loading />) : (
                <KeyboardAvoidingView className="flex justify-between h-full bg-gray-200">
                    <View className="flex justify-between h-full mx-4">
                        <View className="relative mt-5">
                            <View className="absolute top-0 left-0">
                                <BackButton />
                            </View>

                        </View>

                        <View className="flex-col justify-center items-center">
                            <Text className="text-gray-600 font-extrabold text-3xl shadow-lg text-center">
                                Sign in
                            </Text>
                            <Image className="h-48 w-96 mt-5 rounded-full"
                                source={require('../assets/login.png')}
                            />
                        </View>

                        <View className="space-y-2 mx-2">
                            <Text className="text-gray-600 text-lg font-bold">
                                Email
                            </Text>
                            <TextInput placeholder='Enter Email...' value={email} onChangeText={value => setEmail(value)} className="p-4 bg-white rounded-lg mb-3" />
                            <Text className="text-gray-600 text-lg font-bold">
                                Password
                            </Text>
                            <TextInput placeholder='Enter Password...' value={password} secureTextEntry onChangeText={value => setPassword(value)} className="p-4 bg-white rounded-lg mb-3" />
                            <TouchableOpacity onPress={() => navigation.navigate('Forget')} className="flex-row justify-end">
                                <Text className="text-gray-600 text-lg font-bold">Forget Password?</Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TouchableOpacity onPress={handleSubmit} className="bg-[#00CCBB] my-6 rounded-lg p-3 shadow-lg mx-2">
                                <Text className="text-center text-white text-2xl font-bold">Sign In</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </KeyboardAvoidingView>
            )}
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})