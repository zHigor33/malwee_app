import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import MapView, { Callout, Marker } from 'react-native-maps';
import { get } from '../http/maHttp';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default function App() {
    const [waypoints, set_waypoints] = useState();
    const [origin, setOrigin] = useState();

    useEffect(() => {
        (async function () {
            const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
            if (status === 'granted') {
                let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
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
    }, []);

    useEffect(() => {
        get('/api/v1/waypoint/list_waypoint').then((response) => {
            const locais = response.data.rows;

            set_waypoints(locais);
            console.log(locais);
        }).catch((err) => {
            console.log(err);
        });
    }, [])

    return (
        <View style={{ flex: 1, width: '100%' }}>
            <MapView
                style={{ width: "100%", height: "100%" }}
                initialRegion={origin}
                showsUserLocation={true}
                zoomEnabled={true}
                loadingEnabled={true}
            />

            {
                waypoints && waypoints.map(n =>
                    <>
                        <Marker coordinate={{latitude:parseFloat(n.lat), longitude:parseFloat(n.log)}} key={n.ID}>
                            <Callout>
                                <Text>{n.local_name}</Text>
                            </Callout>
                        </Marker>
                    </>
                )
            }

            <Marker coordinate={{latitude: -26.50711535238156, longitude:-49.125568835119196}} />

        </View>
    );
}
