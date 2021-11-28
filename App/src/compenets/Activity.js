import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView  } from "react-native";
import styles from "../assets/Stylesheet";
import {get} from '../http/maHttp';
import { FontAwesome } from '@expo/vector-icons';

export default function User() {
    const [activity, set_activity] = useState();
    const [openDescription, setOpenDescription] = useState('false');
    const [activity_new, set_activity_new] = useState();

    useEffect(() => {
        get('/api/v1/activity/list_activity').then((response) => {
            const atividades = response.data.rows;

            set_activity(atividades);
            console.log(atividades);
        }).catch((err) => {
            console.log(err);
        });
    },[]);

    useEffect(() => {
        get('/api/v1/events/list_waypoint').then((response) => {
            const locais = response.data.rows;
            const new_activity = activity;

            for (let i = 0; i < locais.length; i++) {
                for (let j = 0; j < new_activity.length; j++) {
                    if (locais[i].ID == new_activity[j].waypoint_ID) {
                        new_activity[j].waypoint_ID = locais[i].local_name;
                    }
                }
            }

            console.log(new_activity);

            set_activity_new(new_activity);

        }).catch((err) => {
            console.log(err);
        });
    },[activity]);

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
                    activity_new && activity_new.map(n =>
                        <View key={n.ID}>
                            <View style={styles.title} >
                                <Text style={styles.fontTitle}>{n.activity_name}</Text>
                                
                            </View>
                            <Image 
                                source={{uri: n.image && n.image}} 
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
                                    <Text style={{color: "#fff", fontSize: 16}}>Local: {n.waypoint_ID}</Text>
                                    <Text style={{color: "#fff", fontSize: 16}}>Sobre: {n.activity_description}</Text>
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
