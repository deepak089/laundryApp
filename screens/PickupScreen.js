import { Image, LogBox, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react';
import HorizontalDatepicker from '@awrminkhodaei/react-native-horizontal-datepicker';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon, MinusIcon, PlusIcon } from 'react-native-heroicons/solid'
import Services from '../components/Services';
import { services } from '../data/services';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

const PickupScreen = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState([]);
    const [delivery, setDelivery] = useState([]);
    const [selectService,setSelectService]=useState([]);
    const navigation = useNavigation();
    const cart = useSelector((state) => state.cart.cart);
    const total = cart.map((item) => item.quantity * item.price).reduce((cur, prev) => cur + prev, 0);


    const deliveryTime = [
        {
            id: "0",
            name: "2-3 Days",
        },
        {
            id: "1",
            name: "3-4 Days",
        },
        {
            id: "2",
            name: "4-5 Days",
        },
        {
            id: "3",
            name: "5-6 Days",
        },
        {
            id: "4",
            name: "Tommorrow",
        },
    ];

    const times = [
        {
            id: "0",
            time: "11:00 PM",
        },
        {
            id: "1",
            time: "12:00 PM",
        },
        {
            id: "2",
            time: "1:00 PM",
        },
        {
            id: "3",
            time: "2:00 PM",
        },
        {
            id: "4",
            time: "3:00 PM",
        },
        {
            id: "5",
            time: "4:00 PM",
        },
    ];


    const proceedToCart = () => {
        if (!selectedTime || !selectedDate || !delivery || !selectService) {
            alert('Enter the field first');
        } else if (selectedDate && selectedTime && delivery && selectService) {
            navigation.navigate('Cart', {
                pickUpDate: selectedDate,
                selectedTime: selectedTime,
                no_Of_days: delivery,
                service_selected:selectService
            });
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-100 ">
            {/* heading */}
            <View className="flex-row items-center relative">
                <TouchableOpacity
                    className="mx-4 bg-white shadow-lg rounded-3xl w-10 p-2"
                    onPress={() => navigation.goBack()}>
                    <ChevronLeftIcon size={20} color='#00ccbb' />
                </TouchableOpacity>
                <View className="absolute right-48">
                    <Text className="font-extrabold text-gray-600 text-3xl">Enter Details</Text>
                </View>
            </View>

            <View className="flex-1 justify-between">
                {/* input fields */}
                <View className="">
                    <View className="p-5 shadow-xs">
                        <Text className="text-lg text-gray-600 font-semibold">Enter the address</Text>
                        <TextInput
                            className="border border-gray-600 rounded-lg p-2 mt-2 h-14"
                            placeholder='Enter Address' />
                    </View>

                    <View className="mx-4 mt-2">
                        <Text className="text-lg text-gray-600 font-semibold">Pick Up Date</Text>
                        <HorizontalDatepicker
                            mode="gregorian"
                            startDate={new Date('2023-04-20')}
                            endDate={new Date('2023-04-31')}
                            initialSelectedDate={new Date('2022-04-28')}
                            onSelectedDateChange={(date) => setSelectedDate(date)}
                            selectedItemWidth={170}
                            unselectedItemWidth={38}
                            itemHeight={38}
                            itemRadius={10}
                            selectedItemTextStyle={styles.selectedItemTextStyle}
                            unselectedItemTextStyle={styles.selectedItemTextStyle}
                            selectedItemBackgroundColor="#222831"
                            unselectedItemBackgroundColor="#ececec"
                            flatListContainerStyle={styles.flatListContainerStyle}
                        />
                    </View>

                    <View className="mx-4 mt-2">
                        <Text className="text-lg text-gray-600 font-semibold">Select a Time</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {
                                times.map((item, index) => {
                                    return (<TouchableOpacity
                                        onPress={() => { setSelectedTime(item.time), console.log(selectedTime, 'time') }}
                                        className={selectedTime.includes(item.time) ?
                                            ("border border-green-400 mr-3 mt-2 p-2 rounded-lg") :
                                            ("border border-gray-400 mr-3 mt-2 p-2 rounded-lg")} key={index} >
                                        <Text className={selectedTime.includes(item.time) ? ('text-green-500') : (null)} >{item.time}</Text>
                                    </TouchableOpacity>);
                                })
                            }
                        </ScrollView>
                    </View>

                    <View className="mx-4 mt-2">
                        <Text className="text-lg text-gray-600 font-semibold">Delivery Date</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>

                            {
                                deliveryTime.map((item, index) => {
                                    return (<TouchableOpacity
                                        onPress={() => setDelivery(item.name)}
                                        className={delivery.includes(item.name) ?
                                            ("border border-green-400 mr-3 mt-2 p-2 rounded-lg") :
                                            ("border border-gray-400 mr-3 mt-2 p-2 rounded-lg")} key={index}>

                                        <Text className={delivery.includes(item.name) ? ('text-green-500') : (null)} >{item.name}</Text>
                                    </TouchableOpacity>)
                                })
                            }
                        </ScrollView>
                    </View>

                    <View className="mt-2">
                        <View className="shadow-2xl m-4">
                            <Text className="text-lg text-gray-600 font-semibold">Select Service</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {services.map((service, index) => (
                                    <TouchableOpacity
                                    onPress={()=> setSelectService(service?.name)}
                                        className={selectService.includes(service?.name) ? 
                                        ("bg-green-200 p-4 mr-4 shadow-sm rounded-2xl items-center"): ("bg-gray-200 p-4 mr-4 shadow-sm rounded-2xl items-center")} key={index}>
                                        <Image source={{ uri: service.image }} className="h-14 w-14" />

                                        <Text className={selectService.includes(service?.name) ? ("text-sm items-center mt-2 text-green-2") : ("text-sm items-center mt-2") }>{service.name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    </View>
                </View>
                {/* Button for continue */}
                {total === 0 ? (null) : (
                    <View className="p-5 bg-white mt-5 space-y-4">
                        <View className="flex-row justify-between">
                            <Text className="font-bold text-sm text-gray-600 ">items</Text>
                            <View className="flex-row text-gray-400">
                                <Text>{cart.length}</Text>
                            </View>
                        </View>

                        <View className="flex-row justify-between">
                            <View>
                                <Text className="font-bold text-sm text-gray-600 ">Subtotal</Text>
                                <Text className="text-gray-400">Extra charges may apply</Text>
                            </View>
                            <View className="flex-row text-gray-400">
                                <Text>${total}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={proceedToCart}
                            className="rounded-lg bg-[#00CCBB] p-4">
                            <Text className="text-center text-white text-lg font-bold">Go to Cart</Text>
                        </TouchableOpacity>
                    </View>
                )}

            </View>
        </SafeAreaView >
    )
}

export default PickupScreen

const styles = StyleSheet.create({})