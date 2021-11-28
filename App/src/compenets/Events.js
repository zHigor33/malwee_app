import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView  } from "react-native";
import styles from "../assets/Stylesheet";
import {get} from '../http/maHttp';
import { FontAwesome } from '@expo/vector-icons';

export default function User() {
    const [events, setEvents] = useState();
    const [openDescription, setOpenDescription] = useState('false');

    useEffect(() => {
        get('/api/v1/events/list_event').then((response) => {
            const eventos = response.data.rows;

            setEvents(eventos);
            console.log(eventos);
        }).catch((err) => {
            console.log(err);
        });
    },[])

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
                {events != undefined ? events.map((item) => {
                    return (
                        <View>
                            <View style={styles.title}>
                                <Text style={{textAlign: "center", fontSize: 16, top: 4, color: "#fff"}}>{item.event_name}</Text>
                            </View>

                            <View style={styles.containerImage}>
                                <Image 
                                    source={{uri: item.event_image}} 
                                    style={{width: "100%", height: 350}}
                                />
                            </View>

                            <View style={styles.containerOptions}>
                                <TouchableOpacity style={styles.btnOptions} onPress={() => toggleDescription()}>
                                    <FontAwesome name="comment" style={styles.textBtn} />
                                    <Text style={styles.textButtonCard}>Descrição</Text>
                                </TouchableOpacity>
                            </View>
                            {
                                openDescription == 'true' &&
                                <View style={styles.bodyDescription}>
                                    <Text style={{color: "#fff", fontSize: 14}}>{item.description}</Text>
                                </View> ||
                                null
                            }
                        </View>
                    )
                }) : undefined}
            </ScrollView>
            

            
        </View>
    );
}
