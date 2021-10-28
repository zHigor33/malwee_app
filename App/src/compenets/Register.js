import React, { useState } from "react";
import {View, TouchableOpacity, Text, Image, TextInput} from "react-native";
import styles from "../assets/Stylesheet";
import Axios from "axios";

export default function Register({ navigation }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [error, setError] = useState(false);
    const [name, setName] = useState();

    function confirmRegister() {
        if (password != confirmPassword || email == null || name == null) {
            setError(true);
            return;
        } else {
            const obj = {
                user_name: name,
                email: email,
                user_password: password
            }
            Axios.post("http://10.0.0.167:3001/api/v1/user/register",obj).then((response) => {
                console.log(response);
                return navigation.navigate("Login");
            });
        }
    }

    return(
        <View style={styles.masterContainer}>
            <View style={styles.container}>
                <View style={styles.flexContainer}>
                    <Image source={require('./logo-transparent.png')} style={styles.fullSizeLogo} />
                </View>

                <View style={styles.flexContainer}>
                    {error ?
                        <Text style={{color: "red", fontSize: 16}}>Confira os campos preenchidos!</Text> : undefined
                    }
                    <TextInput style={styles.standardInput} placeholder="E-mail" keyboardType="email-address" onChangeText={e => setEmail(e)} />
                    <TextInput style={styles.standardInput} placeholder="Nome" onChangeText={e => setName(e)} />
                    <TextInput style={styles.standardInput} placeholder="Senha" secureTextEntry={true} onChangeText={e => setPassword(e)} />
                    <TextInput style={styles.standardInput} placeholder="Confirme a senha" secureTextEntry={true} onChangeText={e => setConfirmPassword(e)} />
                </View>

                <View style={styles.flexContainer}>
                    <TouchableOpacity style={styles.standardButton} onPress={() => confirmRegister()} underlayColor="#333" activeOpacity={1} >
                        <Text style={styles.textButton}>Cadastrar</Text>    
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.standardButton} underlayColor="#333" activeOpacity={1} onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.textButton}>Fazer login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
