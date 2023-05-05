import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState, useLayoutEffect } from 'react'
import * as Location from 'expo-location';
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { AdjustmentsVerticalIcon, MagnifyingGlassIcon, MapPinIcon } from 'react-native-heroicons/outline';
import Carosuel from '../components/Carosuel';
import Services from '../components/Services';
import { dressItem } from '../data/dressItem';
import DessItem from '../components/DessItem';
import { useSelector, useDispatch } from 'react-redux'
import { getProducts } from '../redux/slice/ProductSlice';
import { collection, getDoc, getDocs } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import Loading from '../components/Loading';
import { signOut } from 'firebase/auth';

const HomeScreen = () => {
    const cart = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [items, setItems] = useState([]);
    const [visible,setVisible]=useState(false);
    const total = cart.map((item) => item.quantity * item.price).reduce((cur, prev) => cur + prev, 0);
    const [displayCurrentAddress, setDisplayCurrentAddress] = useState('we are laoding Ypur Location');
    const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);

    useEffect(() => {
        if (isFocused) {
            checkIfLocationEnabled();
            getCurrentLocation();
        }
    }, [isFocused]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])
    // enable location service
    const checkIfLocationEnabled = async () => {
        let enabled = await Location.hasServicesEnabledAsync();
        if (!enabled) {
            alert('not enabled');
        } else {
            setLocationServicesEnabled(enabled);
        }
    }
    // get the coordinate
    const getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('Not Granted');
        }
        const { coords } = await Location.getCurrentPositionAsync();
        // console.log(coords, 'coords')
        if (coords) {
            const { latitude, longitude } = coords;
            let response = await Location.reverseGeocodeAsync({
                latitude, longitude
            });

            // console.log(response);
            for (let item of response) {
                let address = `${item.name} ${item.city} ${item.postalCode}`
                setDisplayCurrentAddress(address);
            }
        }
    }

    const handleLogout = async () => {
        await signOut(auth);
    }

    const handleVisible=()=>{
        setVisible(!visible);
    }

    const product = useSelector((state) => state.product.product);

    useEffect(() => {
        if (product.length > 0) return;

        const fetchProducts = async () => {
            const colRef = collection(db, "types");
            const docsSnap = await getDocs(colRef);
            docsSnap.forEach((doc) => {
                items.push(doc.data());
            });
            items?.map((item) => dispatch(getProducts(item)));
        };
        fetchProducts();
    }, []);

     
    

    return (
        <SafeAreaView className="pt-16">
            {/* location and profile */}
            <View className="flex-row items-center mx-4 relative z-10">
                <MapPinIcon size={20} color='#00ccbb' />
                <View className="flex-1 mx-2">
                    <Text className="font-bold  text-lg">Home</Text>
                    <Text className="font-bold text-gray-400 text-sm">{displayCurrentAddress}</Text>
                </View>
                <TouchableOpacity onPress={handleVisible}>
                    <Image
                        source={{ uri: 'https://links.papareact.com/wru' }}
                        className="h-7 w-7 bg-gray-300 p-4 rounded-full"
                    />
                </TouchableOpacity>
                <View className={visible ? "absolute right-0 top-14 z-90 bg-white p-4 w-52 h-28 space-y-4 divide-y-2 divide-green-200 rounded-2xl":'hidden'}>
                    <TouchableOpacity onPress={()=> navigation.navigate('Profile')}>
                        <Text className="font-semibold text-lg text-gray-500">My Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleLogout}>
                        <Text className="font-semibold text-lg text-gray-500 pt-4">Logout </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* search bar */}
            <View className="flex-row items-center mx-4 my-4 space-x-4">
                <View className="flex-row flex-1 rounded-2xl items-center space-x-2 bg-gray-200 p-3">
                    <MagnifyingGlassIcon size={20} color="gray" />
                    <TextInput
                        placeholder='Enter some text'
                        keyboardType='default'
                    />
                </View>
                <AdjustmentsVerticalIcon size={20} color="#00CCBB" />
            </View>

            {/* image slider */}
            <Carosuel />

            {/* services */}

            <Services />
            {
                items.length === 0 ? (<Loading />) : (<ScrollView className="mb-10 relative" style={{ height: 450 }}>
                    {
                        product?.map((item, index) => {

                            return (<DessItem item={item} key={index} />);

                        })
                    }
                </ScrollView>)

            }


            {
                total === 0 ? (null) : (<TouchableOpacity className="shadow-lg absolute bottom-4 bg-[#00ccbb] flex-row items-center p-3 mx-4 rounded-lg">
                    <View className="flex-1 justify-betweenitems-center">
                        <Text className="font-bold text-lg text-gray-100 mx-2">
                            {cart.length} items | ${total}
                        </Text>
                        <Text className="font-bold text-sm text-gray-600 mx-2">
                            Extra charges may apply
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Pickup')}>
                        <Text className="font-bold text-lg text-gray-100 mx-2">
                            Proceed to pickup
                        </Text>
                    </TouchableOpacity>
                </TouchableOpacity>)
            }

        </SafeAreaView >
    )
}

export default HomeScreen

const styles = StyleSheet.create({})