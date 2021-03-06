import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView  } from "react-native";
import styles from "../assets/Stylesheet";
import {get} from '../http/maHttp';
import { FontAwesome } from '@expo/vector-icons';

export default function User() {
    const [events, setEvents] = useState();
    const [openDescription, setOpenDescription] = useState('false');
    const [event_new, set_event_new] = useState();

    useEffect(() => {
        get('/api/v1/events/list_event').then((response) => {
            const eventos = response.data.rows;

            setEvents(eventos);
            console.log(eventos);
        }).catch((err) => {
            console.log(err);
        });
    },[]);

    useEffect(() => {
        get('/api/v1/events/list_waypoint').then((response) => {
            const locais = response.data.rows;
            const new_events = events;

            for (let i = 0; i < locais.length; i++) {
                for (let j = 0; j < new_events.length; j++) {
                    if (locais[i].ID == new_events[j].waypoint_ID) {
                        new_events[j].waypoint_ID = locais[i].local_name;
                    }
                }
            }

            console.log(new_events);

            set_event_new(new_events);

        }).catch((err) => {
            console.log(err);
        });
    },[events]);

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
                    event_new && event_new.map(n =>
                        <View key={n.ID}>
                            <View style={styles.title} >
                                <Text style={styles.fontTitle}>{n.event_name}</Text>
                                
                            </View>
                            <Image 
                                source={{uri: n.event_image && n.event_image}} 
                                style={{width: "100%", height: 350, backgroundColor: '#333'}}
                            />
                            <View style={styles.containerOptions}>
                                <TouchableOpacity style={styles.btnOptions} onPress={() => toggleDescription()}>
                                    <FontAwesome name="comment" style={styles.textBtn} />
                                    <Text style={styles.textButtonCard}>Descri????o</Text>
                                </TouchableOpacity>
                            </View>
                            {
                                openDescription == 'true' &&
                                <View style={styles.bodyDescription}>
                                    <Text style={{color: "#fff", fontSize: 16}}>Local: {n.waypoint_ID}</Text>
                                    <Text style={{color: "#fff", fontSize: 16}}>Data: {n.event_date}</Text>
                                    <Text style={{color: "#fff", fontSize: 16}}>Horario: {n.event_time}</Text>
                                    <Text style={{color: "#fff", fontSize: 16}}>Sobre: {n.description}</Text>
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
