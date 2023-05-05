import { KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import BackButton from '../components/BackButton';
import { auth, db } from '../config/firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';


const RegisterScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

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
        if (email && password && phone) {
            // go to home 
            await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                const user = userCredential._tokenResponse.email;
                const myUserUid = auth.currentUser.uid;

                setDoc(doc(db, "users", `${myUserUid}`), {
                    email: user,
                    phone: phone,
                    name: name,
                    gender: gender
                })
            })
        } else {
            //show Error
            alert('Something went wrong...!');
        }
    }
    return (
        <SafeAreaView>
            <KeyboardAvoidingView className="flex justify-between h-full bg-gray-200">
                <View className="flex justify-between h-full mx-4">

                    <View className="relative mt-5">
                        <View className="absolute top-0 left-0">
                            <BackButton />
                        </View>

                    </View>

                    <View className="flex-col justify-center items-center">
                        <Text className="text-gray-600 font-extrabold text-3xl shadow-lg text-center">
                            Sign Up
                        </Text>
                        <Image className="h-48 w-96 mt-5 rounded-full"
                            source={require('../assets/signup.png')}
                        />
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
                            Password
                        </Text>
                        <TextInput placeholder="Enter Phone..." value={password} secureTextEntry onChangeText={value => setPassword(value)} className="p-4 bg-white rounded-lg" />

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
                            <Text className="text-center text-white text-lg font-extrabold">Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({})