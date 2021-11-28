import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView  } from "react-native";
import styles from "../assets/Stylesheet";
import {get} from '../http/maHttp';
import { FontAwesome } from '@expo/vector-icons';

export default function User() {
    const [waypoint, set_waypoint] = useState();
    const [openDescription, setOpenDescription] = useState('false');

    useEffect(() => {
        get('/api/v1/events/list_waypoint').then((response) => {
            const locais = response.data.rows;

            set_waypoint(locais);
            console.log(locais);
        }).catch((err) => {
            console.log(err);
        });
    },[]);

    function toggleDescription() {
        if(openDescription == 'false') {
            setOpenDescription('true');
        } else {
            setOpenDescription('false');
        }
    }

    return (
        <View>
            <ScrollView >
                {
                    waypoint && waypoint.map(n =>
                        <View key={n.ID}>
                            <View style={styles.title} >
                                <Text style={styles.fontTitle}>{n.local_name}</Text>
                            </View>
                            <Image 
                                source={{uri: n.local_image && n.local_image}} 
                                style={{width: "100%", height: 350, backgroundColor: '#333'}}
                            />
                            <View style={styles.containerOptions}>
                                <TouchableOpacity style={styles.btnOptions} onPress={() => toggleDescription()}>
                                    <FontAwesome name="comment" style={styles.textBtn} />
                                    <Text style={styles.textButtonCard}>Descrição</Text>
                                </TouchableOpacity>
                            </View>
                            {
                                openDescription == 'true' &&
                                <View style={styles.bodyDescription}>
                                    <Text style={{color: "#fff", fontSize: 16}}>Latitude: {n.lat}</Text>
                                    <Text style={{color: "#fff", fontSize: 16}}>Longitude: {n.log}</Text>
                                </View> ||
                                null
                            }
                        </View>
                    )
                }
            </ScrollView>
        </View>
    );
}
