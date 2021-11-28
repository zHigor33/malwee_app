import React, { useEffect, useState } from 'react';
import "../assets/css/Events.css";
import logo from "../assets/images/logo.png";
import moldura from "../assets/images/moldura.png";
import "../assets/fontawesome/css/all.css";
import { useHistory } from 'react-router-dom';

export default function Home(props) {
    const history = useHistory();
    const [user, set_user] = useState();

    function logout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="body_container">
            <div class="nav">
                <text className="text_nav"><i className="fas fa-user"></i> {user ? user : "Usuário"}</text>
                <text className="text_nav">PARQUE MALWEE</text>
                <button className="nav_btn" onClick={() => logout()}><text className="text_nav_logout"><i className="fas fa-sign-out-alt"></i> SAIR</text></button>
            </div>

            <div className="menu">
                <div>
                    <button className="menu_btn" onClick={() => history.push('/waypoints')}><i className="fas fa-map-marker-alt"></i> <text className="text_btn">Locais</text></button>
                    <button className="menu_btn" onClick={() => history.push('/events')}><i className="fas fa-ticket-alt"></i> <text className="text_btn">Eventos</text></button>
                    <button className="menu_btn" onClick={() => history.push('/activity')}><i className="fas fa-running"></i> <text className="text_btn">Atividades</text></button>
                    <button className="menu_btn" onClick={() => history.push('/museum')}><i className="fas fa-archway"></i> <text className="text_btn">Museu</text></button>
                    <button className="menu_btn" style={{ backgroundColor: "#666" }}><i className="fas fa-map"></i> <text className="text_btn">Mapa de Calor</text></button>
                </div>

                <img src={logo} className="menu_img" />
            </div>

            <div className="body_page">
                <div className="banner">
                    <div className="banner_info">
                        <h1>EM BREVE</h1>

                        <p>
                            ...
                        </p>
                    </div>

                    <div className="banner_img">
                        <img src={moldura} />
                    </div>
                </div>
            </div>
        </div>
    );
}
