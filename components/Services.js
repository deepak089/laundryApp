import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native';
import { services } from '../data/services';

const Services = () => {
    const setService=()=>{

    }
    
    return (
        <View className="shadow-2xl m-4">
            <Text className="font-bold text-lg mb-2">Services Available</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {services.map((service, index) => (
                    <TouchableOpacity 
                        onPress={setService}                    
                    className="bg-gray-200 p-4 mr-4 shadow-sm rounded-2xl items-center" key={index}>
                        <Image source={{ uri: service.image }} className="h-14 w-14" />

                        <Text className="text-sm items-center mt-2">{service.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

export default Services

const styles = StyleSheet.create({})