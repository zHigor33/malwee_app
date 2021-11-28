import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView  } from "react-native";
import styles from "../assets/Stylesheet";
import {get} from '../http/maHttp';
import { FontAwesome } from '@expo/vector-icons';

export default function User() {
    const [museum, set_museum] = useState();
    const [openDescription, setOpenDescription] = useState('false');

    useEffect(() => {
        get('/api/v1/museum/list_museum').then((response) => {
            const itens = response.data.rows;

            set_museum(itens);
            console.log(itens);
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
                    museum && museum.map(n =>
                        <View key={n.ID}>
                            <View style={styles.title} >
                                <Text style={styles.fontTitle}>{n.artifact_name}</Text>
                                
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
                                    <Text style={{color: "#fff", fontSize: 16}}>Sobre: {n.artifact_description}</Text>
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
