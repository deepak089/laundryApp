import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SliderBox } from "react-native-image-slider-box";
import img1 from '../assets/img1.png';
import img2 from '../assets/img2.png';
import img3 from '../assets/img3.png';
import img4 from '../assets/img4.png';

const Carosuel = () => {
   const images= [
        img1,img2,img3,img4
      ]
    return (
        <View className="bg-white round-2xl mx-4 p-6">
            <SliderBox 
            images={images}
            autoPlay
            circleLoop
            dotColor={'#13274F'}
            inactiveDotColor='#90A4AE'
            ImageComponentStyle={{
                borderRadius: 6,
                width:'94%',
            }} />
        </View>
    )
}

export default Carosuel
