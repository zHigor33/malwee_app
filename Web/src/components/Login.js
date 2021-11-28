import React, { useState } from 'react';
import "../assets/css/Login.css";
import logo from "../assets/images/logo-transparent.png";
import {post} from "./http/maHttp";
import { useHistory } from 'react-router-dom';

export default function Login() {
    const history = useHistory();
    const [email, setEmail] = useState();
    const [password, setPass] = useState();

    function login() {
        let obj = {
            email: email,
            user_password: password
        }

        console.log(obj);

        console.log("Entrou na função")

        post("/api/v1/user/loginWeb", obj).then((response) => {
            let user_name = response.user.user_name;
            let user_id = response.user.ID;
            let token = response.token;

            localStorage.setItem("token", token);
            localStorage.setItem("user_name", user_name);
            localStorage.setItem("user_id", user_id);

            history.push('/waypoints');
        }).catch((err) => {
            alert(err);
            console.log(err);
        });
    }

    return (
        <div className="bodyPage">
            <div className="bodyLogin">
                <img src={logo} className="logo" />
                <input type="text" name="login" placeholder="E-mail" className="inputShields" onChange={(e) => setEmail(e.target.value)} ></input><br/>
                <input type="password" placeholder="Senha" className="inputShields" onChange={(e) => setPass(e.target.value)} ></input><br/>
                <button className="btnLogin" onClick={login}>Entrar</button>          
            </div>
        </div>

    );
}