import React, { useEffect, useState } from "react";
import { View } from "react-native";
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default function App() {
    const [origin, setOrigin] = useState();

    useEffect(()=>{
        (async function(){
            const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
            if (status === 'granted') {
                let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
                setOrigin({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.000922,
                    longitudeDelta: 0.000421
                })
            } else {
                throw new Error('Location permission not granted');
            }
        })();
    },[]);

    return (
      <View>
        <MapView
            style={{width: "100%", height:"100%"}}
            initialRegion={origin}
            showsUserLocation={true}
            zoomEnabled={true}
            loadingEnabled={true}
        >
        </MapView>
      </View>
    );
}
