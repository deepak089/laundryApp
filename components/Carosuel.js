import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SliderBox } from "react-native-image-slider-box";

const Carosuel = () => {
   const images= [
        "https://source.unsplash.com/1024x768/?nature",
        "https://source.unsplash.com/1024x768/?water",
        "https://source.unsplash.com/1024x768/?girl",
        "https://source.unsplash.com/1024x768/?tree", 
      ]
    return (
        <View>
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
