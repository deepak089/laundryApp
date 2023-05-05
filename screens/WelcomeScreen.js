import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const WelcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View 
      className="h-full flex justify-around bg-gray-200" >
        <View className="flex-row justify-center mt-24">
          <Image
            source={require('../assets/welcome.png')}
            className="w-96 h-96 shadow-lg"
          />
        </View>
        <View className="mx-4">
          <Text className={`text-center font-extrabold text-4xl text-gray-600`}>Laundrygram</Text>
        </View>

        <View className="mx-4">
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            className="shadow p-3 rounded-lg mb-5 bg-[#00CCBB]">
            <Text className="text-center text-white text-lg font-bold">Sign in </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            className="shadow p-3 rounded-lg mb-5 bg-[#00CCBB]">
            <Text className="text-center text-white text-lg font-bold">Sign Up </Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({})