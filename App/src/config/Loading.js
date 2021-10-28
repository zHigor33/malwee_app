import * as React from "react";
import { View, Image } from 'react-native';

export default function Loading() {
    return (
        <View>
            <Image source={{uri: '../images/loading.gif'}} />
        </View>
    );
} 
