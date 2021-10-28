import React from 'react';
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "../assets/Stylesheet";

export default function User({ navigation }) {
    function eventos() {
        let caminho = navigation.navigate("Private", {screen: "Events"});


        console.log("Clicou", caminho);
        navigation.navigate("Eventos", {screen: "Events"});
    }

    return (
        <View>
            <TouchableOpacity style={styles.card} underlayColor="#333" activeOpacity={1} onPress={() => eventos()}>
                <Image style={styles.imageCard}  source={require('../assets/images/card-background.jpg')} />
                <Text style={styles.textCard}>Eventos</Text>
            </TouchableOpacity>
            

            <TouchableOpacity style={styles.card} underlayColor="#333" activeOpacity={1}>
                <Image style={styles.imageCard}  source={require('../assets/images/card-background-museu.jpg')} />
                <Text style={styles.textCard}>Museu</Text>
            </TouchableOpacity>
        </View>
    );
}
