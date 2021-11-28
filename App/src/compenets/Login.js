import React, { useState } from "react";
import {View, TouchableOpacity, Text, TextInput, Image, AsyncStorage} from "react-native";
import styles from "../assets/Stylesheet";
import {post} from '../http/maHttp';

export default function Login({ navigation }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    function Auth() {
        var user = {  
            email: email,
            user_password: password
        }

        post("/api/v1/user/login",user).then((response) => {
            AsyncStorage.setItem("token", response.token);
            console.log(response.token);
            navigation.navigate("Private", {screen: "User"});
        });
    }

    return(
        <View style={styles.masterContainer}>

            <View style={styles.container}>
                <View style={styles.flexContainer}>
                    <Image source={require("./logo-transparent.png")} style={styles.fullSizeLogo} />
                </View>

                <View style={styles.flexContainer}>
                    <TextInput style={styles.standardInput} placeholder="E-mail" keyboardType="email-address" onChangeText={e => setEmail(e)} />
                    <TextInput style={styles.standardInput} placeholder="Senha" secureTextEntry={true} onChangeText={e => setPassword(e)} />
                </View>

                <View style={styles.flexContainer}>
                    <TouchableOpacity style={styles.transparentButton} underlayColor="#333" activeOpacity={1}>
                        <Text>Esqueceu a senha?</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.flexContainer}>
                    <TouchableOpacity style={styles.standardButton} onPress={() => Auth()} underlayColor="#333" activeOpacity={1} >
                        <Text style={styles.textButton}>Login</Text>    
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.standardButton} onPress={() => navigation.navigate("Register")} underlayColor="#333" activeOpacity={1} >
                        <Text style={styles.textButton}>Register</Text>    
                    </TouchableOpacity>
                </View>

                {/* <View style={styles.flexContainer}>
                    <View style={styles.bar} />
                    <Text style={styles.textApp16}>Ou entre com</Text>
                    <View style={styles.bar} />
                </View>

                <View style={styles.flexContainer}>
                    <TouchableOpacity style={styles.standardButton_blue} onPress={() => alert("Desabilitado no momento!")} underlayColor="#333" activeOpacity={1} >
                        <Text style={styles.textButton}>Facebook</Text>    
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.standardButton_red} onPress={() => alert("Desabilitado no momento!")} underlayColor="#333" activeOpacity={1} >
                        <Text style={styles.textButton}>Google</Text>    
                    </TouchableOpacity>
                </View> */}
            </View>
        </View>
    );
}
