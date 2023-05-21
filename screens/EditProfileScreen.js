import { Button, Image, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackButton from '../components/BackButton';
import Modal from "react-native-modal";
import { XCircleIcon } from 'react-native-heroicons/outline';
import { doc, getDoc, getFirestore, collection, set, getDocs } from "firebase/firestore";
import firestore from 'react-native'
import { useSelector } from 'react-redux';
import { userSlice } from '../redux/slice/UserSlice';
import * as ImagePicker from 'expo-image-picker';
// import { firestore } from '@react-native-firebase/firestore';

const EditProfileScreen = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [userData, setUserData] = useState('');
    const { user } = useSelector(state => state.user);
    const [uploading, setUpLoading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [image, setImage] = useState('');
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const getUser = async () => {
        const db = getFirestore();
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        setUserData(docSnap.data());
    }

    const uploadImage = async () => {
        if (image == null) {
            return null;
        }
        const uploadUri = image;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

        // add timestamp to file name
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;
        setUpLoading(true);
        setTransferred(0);

        const storage = getStorage();
        const storageRef = ref(storage, `photos/${filename}`);

        const task = storageRef.putFile(uploadUri);
        console.log(task, 'task');

        task.on('state_changed', (taskSnapshot) => {
            console.log(`${taskSnapshot.bytesTransferred / taskSnapshot.totalBytes}`);

            setTransferred(
                Math.round(taskSnapshot.byteTransferred / taskSnapshot.totalBytes) * 100
            );
        });
        try {
            await task;

            const url = await getDownloadURL(storageRef);

            setUpLoading(false);
            setImage(null);

            return url;

        } catch (error) {
            console.log(error);
            return null;
        }
    }

    const handleUpdateSubmit = async () => {
        alert('somthing went wrong with backend Go back...!');
        // let imgUrl = await uploadImage();
        // if (imgUrl == null && userData.userImg) {
        //     imgUrl = userData.userImg;
        // }
        // const db = getDatabase();
        // console.log(db,'db');
        // const docRef = getDoc(db, 'users', user.uid);
        // console.log(docRef, 'docRef');
        // await set(ref(db, 'users', user.uid), {
        //     email: userData.email,
        //     name: userData.name,
        //     gender: userData.gender,
        //     phone: userData.phone,
        // });
        // await docRef.update({
        //     email: userData.email,
        //     name: userData.name,
        //     gender: userData.gender,
        //     phone: userData.phone,
        //     // userImg: imgUrl,
        // }).then(() => {
        //     console.log('user updated')
        // })
    }
    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermission(galleryStatus.status === 'granted');
        })();
    })

    const pickfromLibrary = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
        if (hasGalleryPermission === false) {
            return <Text>No access to Internal Storage</Text>
        }
    };
    useEffect(() => {
        (async () => {
            const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
            setHasGalleryPermission(cameraStatus.status === 'granted');
        })();
    })
    const pickfromCamera = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
        if (hasGalleryPermission === false) {
            return <Text>No access to Internal Storage</Text>
        }
    };


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

                    <TouchableOpacity onPress={toggleModal} className="flex-col justify-center items-center">

                        <View className="justify-center items-center border-2 border-green-400 rounded-full">
                            <Image className="h-32 w-32 rounded-full"
                                source={{ uri: userData.userImg }}
                            />
                        </View>
                        <Text className="text-lg font-bold text-green-500 mt-2 ">Change Profile</Text>

                    </TouchableOpacity>

                    <View className="space-y-4 flex justify-evenly ">
                        <Text className="text-gray-600 text-lg font-bold ">
                            Email
                        </Text>
                        <TextInput placeholder="Enter Email..." value={userData ? userData.email : email} onChangeText={value => setUserData({ ...userData, email: value })} className="p-4 bg-white rounded-lg" />

                        <Text className="text-gray-600 text-lg font-bold mx-1">
                            Name
                        </Text>
                        <TextInput placeholder="Enter Password..." value={userData ? userData.name : name} onChangeText={value => setUserData({ ...userData, name: value })} className="p-4 bg-white rounded-lg" />

                        <Text className="text-gray-600 text-lg font-bold mx-1">
                            Phone No.
                        </Text>
                        <TextInput placeholder="Enter Phone..." value={userData ? userData.phone : phone} onChangeText={value => setUserData({ ...userData, phone: value })} className="p-4 bg-white rounded-lg" />
                        <Text className="text-gray-600 text-lg font-bold mx-1">
                            Gender
                        </Text>
                        <TextInput placeholder="Enter for male m / for female f ..." value={userData ? userData.gender : gender} onChangeText={value => setUserData({ ...userData, gender: value })} className="p-4 bg-white rounded-lg" />

                    </View>

                    <View>
                        <TouchableOpacity onPress={handleUpdateSubmit} className="bg-[#00CCBB] my-6 rounded-lg p-3 shadow-sm">
                            <Text className="text-center text-white text-lg font-extrabold">Update profile</Text>
                        </TouchableOpacity>
                    </View>


                    <Modal isVisible={isModalVisible} className="w-full ml-0 mb-0">
                        <View className="flex-1 absolute bg-white bottom-0 right-0 left-0 rounded-2xl p-4" style={{ height: 350, width: '100%' }}>
                            <TouchableOpacity onPress={toggleModal} className="flex-row-reverse">
                                <XCircleIcon size={30} color='gray' />
                            </TouchableOpacity>
                            <View>
                                {/* heading */}
                                <View className="flex-col items-center">
                                    <Text className="font-extrabold text-gray-600 text-3xl">Upload Photo</Text>
                                    <Text className="text-gray-500 text-lg">Choose Your profile photo</Text>
                                </View>
                                {/* buttons */}
                                <View className="flex-col items-center">
                                    <TouchableOpacity
                                        onPress={() => pickfromCamera()}
                                        className="bg-[#00CCBB] my-4 rounded-lg p-3 shadow-sm w-full">
                                        <Text className="text-center text-white text-lg font-extrabold">Take a photo</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => pickfromLibrary()}
                                        className="bg-[#00CCBB] my-4 rounded-lg p-3 shadow-sm  w-full">
                                        <Text className="text-center text-white text-lg font-extrabold">Choose from Library</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={toggleModal} className="bg-[#00CCBB] my-4 rounded-lg p-3 shadow-sm  w-full">
                                        <Text className="text-center text-white text-lg font-extrabold">Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default EditProfileScreen

const styles = StyleSheet.create({})