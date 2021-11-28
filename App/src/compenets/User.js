import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import styles from "../assets/Stylesheet";

export default function User({ navigation }) {
    function eventos() {
        let caminho = navigation.navigate("Private", {screen: "Events"});


        console.log("Clicou", caminho);
        navigation.navigate("Eventos", {screen: "Events"});
    }

    return (
        <View>
            <ScrollView>
                <TouchableOpacity style={styles.card} underlayColor="#333" activeOpacity={1} onPress={() => navigation.navigate("Locais", {screen: "Waypoints"})}>
                    <Image style={styles.imageCard}  source={require('../assets/images/card-background-locais.jpg')} />
                    <Text style={styles.textCard}>Locais</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} underlayColor="#333" activeOpacity={1} onPress={() => navigation.navigate("Eventos", {screen: "Events"})}>
                    <Image style={styles.imageCard}  source={require('../assets/images/card-background.jpg')} />
                    <Text style={styles.textCard}>Eventos</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.card} underlayColor="#333" activeOpacity={1} onPress={() => navigation.navigate("Atividades", {screen: "Activity"})}>
                    <Image style={styles.imageCard}  source={require('../assets/images/card-background-atividades.jpg')} />
                    <Text style={styles.textCard}>Atividades</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} underlayColor="#333" activeOpacity={1} onPress={() => navigation.navigate("Museu", {screen: "Museum"})}>
                    <Image style={styles.imageCard}  source={require('../assets/images/card-background-museu.jpg')} />
                    <Text style={styles.textCard}>Museu</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
