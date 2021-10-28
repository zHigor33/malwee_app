import React, { useState } from 'react';
import "../assets/css/Login.css"
import background from "../assets/images/background.jpg";
import logo from "../assets/images/logo-transparent.png";
import bodyBackgound from "../assets/images/body.jpg";
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
            localStorage.setItem("token", response.token);
            history.push('/home');
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div>
            <img src={bodyBackgound} alt="background" className="bodyBackground" />
            <div className="bodyLogin">
                <img src={logo} alt="logo" className="logo" />
                <p className="textField">Login</p>
                <input type="text" name="login" label="Login" className="inputShields" onChange={(e) => setEmail(e.target.value)} ></input><br/>
                <p className="textField">Senha</p>
                <input type="password" label="Senha" className="inputShields" onChange={(e) => setPass(e.target.value)} ></input><br/>
                <button className="btnLogin" onClick={login}>Entrar</button>          
            </div>
        </div>

    );
}