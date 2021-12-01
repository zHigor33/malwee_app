import React, { useRef, useEffect, useState } from 'react';
import { post, get } from "./http/maHttp";
import "../assets/css/Waypoints.css";
import logo from "../assets/images/logo.png";
import moldura from "../assets/images/moldura-locais.png";
import "../assets/fontawesome/css/all.css";
import { useHistory } from 'react-router-dom';

import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoiemhpZ29yMyIsImEiOiJja3BhMzFtdnMwbWZ2Mm5teGlrMHlmaXh1In0.GYQeW9aiGo6QrDaTHDHRnw';

export default function Home(props) {
    const history = useHistory();
    const [user, set_user] = useState();
    const [waypoint_list, set_waypoint_list] = useState();
    const [show_register_popup, set_show_register_popup] = useState(false);
    const [show_select_waypoint, set_show_select_waypoint] = useState(false);
    const [select_waypoint, set_select_waypoint] = useState();

    useEffect(() => {
        let user = localStorage.getItem("user_name");
        set_user(user);

        console.log("usuario", user);

        get('/api/v1/waypoint/list_waypoint').then((response) => {
            set_waypoint_list(response.data.rows);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    function showWaypoint(n) {
        console.log(n);

        set_select_waypoint(n);
        set_show_select_waypoint(true);
    }

    function logout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="body_container">
            {
                show_register_popup && <AddWaypointPopup popupIsOpen={isOpen => set_show_register_popup(isOpen)} />
            }

            {
                show_select_waypoint && <WaypointPopup popupIsOpen={isOpen => set_show_select_waypoint(isOpen)} waypoint={select_waypoint} />
            }

            <div className={show_register_popup || show_select_waypoint ? "blur" : undefined} style={{ display: "flex", flexWrap: "wrap" }}>
                <div class="nav">
                    <text className="text_nav"><i className="fas fa-user"></i> {user ? user : "Usuário"}</text>
                    <text className="text_nav">PARQUE MALWEE</text>
                    <button className="nav_btn" onClick={() => logout()}><text className="text_nav_logout"><i className="fas fa-sign-out-alt"></i> SAIR</text></button>
                </div>

                <div className="menu">
                    <div>
                        <button className="menu_btn" style={{ backgroundColor: "#666" }}><i className="fas fa-map-marker-alt"></i> <text className="text_btn">Locais</text></button>
                        <button className="menu_btn" onClick={() => history.push('/events')}><i className="fas fa-ticket-alt"></i> <text className="text_btn">Eventos</text></button>
                        <button className="menu_btn" onClick={() => history.push('/activity')}><i className="fas fa-running"></i> <text className="text_btn">Atividades</text></button>
                        <button className="menu_btn" onClick={() => history.push('/museum')}><i className="fas fa-archway"></i> <text className="text_btn">Museu</text></button>
                        <button className="menu_btn" onClick={() => history.push('/heatmap')}><i className="fas fa-map"></i> <text className="text_btn">Mapa de Calor</text></button>
                    </div>

                    <img src={logo} className="menu_img" />
                </div>

                <div className="body_page">
                    <div className="banner">
                        <div className="banner_info">
                            <h1>LOCAIS</h1>

                            <p>
                                Nesta área, você poderá manusear e criar locais dentro do App
                                para o usuário navegar dentro do parque, com isso, na área de
                                criação de eventos também ficará disponível os locais já
                                cadastrados para informar o local dos eventos.
                            </p>
                        </div>

                        <div className="banner_img">
                            <img src={moldura} />
                        </div>
                    </div>

                    <div className="container_action_buttons">
                        <button className="action_buttons" onClick={() => { set_show_register_popup(true) }}><i className="fas fa-plus-circle"></i> Adicionar Local</button>
                        {/*<button className="action_buttons"><i className="fas fa-minus-circle"></i> Excluir Evento</button>*/}
                    </div>

                    <div className="waypoint_container">
                        <div className="waypoint_list_column">
                            <div className="waypoint_id">
                                <p>ID</p>
                            </div>

                            <div className="waypoint_name">
                                <p>Nome</p>
                            </div>

                            <div className="event_date">
                                <p>Latitude</p>
                            </div>

                            <div className="event_time">
                                <p>Longitude</p>
                            </div>
                        </div>

                        {

                            waypoint_list && waypoint_list.map(n =>
                                <div item key={n.ID} className="waypoint_list" onClick={() => { showWaypoint(n) }}>
                                    <div className="waypoint_id">
                                        <p>{n.ID}</p>
                                    </div>

                                    <div className="waypoint_name">
                                        <p>{n.local_name}</p>
                                    </div>

                                    <div className="waypoint_date">
                                        <p>{n.lat}</p>
                                    </div>

                                    <div className="waypoint_time">
                                        <p>{n.log}</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

function AddWaypointPopup(props) {
    const [latitude, set_latitude] = useState();
    const [longitude, set_longitude] = useState();
    const [waypoint_name, set_waypoint_name] = useState();
    const [waypoint_image, set_waypoint_image] = useState();
    const [waypoint_err, set_waypoint_err] = useState(false);

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-49.125869242529376);
    const [lat, setLat] = useState(-26.50525274144311);
    const [zoom, setZoom] = useState(15);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('click', (e) => {
            console.log(`A click event has occurred at ${e.lngLat}`);
            set_latitude(e.lngLat.lat);
            set_longitude(e.lngLat.lng);
        });
    });

    function createWaypoint() {

        if (latitude == null || longitude == null || waypoint_image == null || waypoint_name == null) {

            console.log("ERRO");

            return set_waypoint_err(true);
        }

        else {
            const event_obj = {
                waypoint_name,
                latitude,
                longitude,
                waypoint_image
            }

            console.log(event_obj);

            post("/api/v1/waypoint/register_waypoint", event_obj).then((response) => {
                console.log("Evento Registrado", response);
            }).catch((err) => {
                alert(err);
            });

            confirmation();
        }
    }

    function confirmation() {
        props.popupIsOpen(false);
        console.log("entrou na função");
        alert("Waypoint criado com sucesso");

        set_latitude(null);
        set_longitude(null);
        set_waypoint_image(null);
    }

    return (
        <div className="body_popup">
            {
                waypoint_err &&
                <div className="err_message">
                    <p>Algum campo não está preenchido!</p>
                </div>
            }

            <div className="popup">
                <div className="nav_popup">
                    <p>Adicionar Waypoint</p>
                    <button onClick={() => props.popupIsOpen(false)} className="nav_btn_popup"><i class="far fa-times-circle"></i></button>
                </div>

                <div className="field">
                    <input className="field_title" placeholder="Nome do Local" onChange={e => set_waypoint_name(e.target.value)} />
                    <p className="field_coord" placeholder="Latitude" >Latitude:   {latitude & String(latitude)}</p>
                    <p className="field_coord" placeholder="Longitude" >Longitude: {longitude & String(longitude)}</p>

                    <div ref={mapContainer} className="map-container">
                    </div>

                    <input className="field_image" placeholder="Link da imagem" maxLength={1000} onChange={e => set_waypoint_image(e.target.value)} />
                </div>

                <div className="control_btn_popup">
                    <button className="popup_action_button_cancel" onClick={() => { props.popupIsOpen(false) }}>Cancelar</button>
                    <button className="popup_action_button" onClick={() => createWaypoint()}>Confirmar</button>
                </div>
            </div>
        </div>
    )
}

function WaypointPopup(props) {
    return (
        <div className="body_popup">
            <div className="popup">
                <div className="nav_popup">
                    <p>{props.waypoint.local_name}</p>
                    <button onClick={() => props.popupIsOpen(false)} className="nav_btn_popup"><i class="far fa-times-circle"></i></button>
                </div>

                <div className="field">
                    <img src={props.waypoint.local_image} style={{ width: "100%", backgroundColor: "#333" }} />

                    <div className="title_option_popup">
                        <p>Latitude</p>
                        <p>Longitude</p>
                    </div>

                    <div className="option_popup">
                        <p>{props.waypoint.lat}</p>
                        <p>{props.waypoint.log}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
