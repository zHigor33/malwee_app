import React, { useEffect, useState } from 'react';
import {post, get} from "./http/maHttp";
import "../assets/css/Waypoints.css";
import logo from "../assets/images/logo.png";
import moldura from "../assets/images/moldura.png";
import "../assets/fontawesome/css/all.css";
import { useHistory } from 'react-router-dom';

export default function Home(props) {
    const history = useHistory();
    const [waypoint_list, set_waypoint_list] = useState();
    const [show_register_popup, set_show_register_popup] = useState(false);
    const [show_select_waypoint, set_show_select_waypoint] = useState(false);
    const [select_waypoint, set_select_waypoint] = useState();

    useEffect(() => {
        get('/api/v1/waypoint/list_waypoint').then((response) => {
            console.log("AQUI",response);

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

    return (
        <div className="body_container">
            {
                show_register_popup && <AddWaypointPopup popupIsOpen={isOpen => set_show_register_popup(isOpen)} />
            }

            {
                show_select_waypoint && <WaypointPopup popupIsOpen={isOpen => set_show_select_waypoint(isOpen)} waypoint={select_waypoint} />
            }

            <div className={show_register_popup || show_select_waypoint ? "blur" : undefined} style={{display: "flex", flexWrap: "wrap"}}>
                <div class="nav">
                    <text className="text_nav"><i className="fas fa-user"></i> Higor</text>
                    <text className="text_nav">PARQUE MALWEE</text>
                    <button className="nav_btn"><text className="text_nav_logout"><i className="fas fa-sign-out-alt"></i> SAIR</text></button>
                </div>
                
                <div className="menu">
                    <div>
                        <button className="menu_btn" style={{backgroundColor: "#666"}}><i className="fas fa-map-marker-alt"></i> <text className="text_btn">Locais</text></button>
                        <button className="menu_btn" onClick={() => history.push('/home')}><i className="fas fa-ticket-alt"></i> <text className="text_btn">Eventos</text></button>
                        <button className="menu_btn"><i className="fas fa-running"></i> <text className="text_btn">Atividades</text></button>
                        <button className="menu_btn"><i className="fas fa-archway"></i> <text className="text_btn">Museu</text></button>
                        <button className="menu_btn"><i className="fas fa-map"></i> <text className="text_btn">Mapa de Calor</text></button>
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
                            <img src={moldura}/>
                        </div>
                    </div>
                    
                    <div className="container_action_buttons">
                        <button className="action_buttons" onClick={() => {set_show_register_popup(true)}}><i className="fas fa-plus-circle"></i> Adicionar Local</button>
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
                                <div item key={n.ID} className="waypoint_list" onClick={() => {showWaypoint(n)}}>
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
    const [location, set_location] = useState();
    const [event_name, set_event_name] = useState();
    const [event_image, set_event_image] = useState();
    const [event_date, set_event_date] = useState();
    const [event_time, set_event_time] = useState();
    const [event_location, set_event_location] = useState();
    const [event_description, set_event_description] = useState();
    const [event_err, set_event_err] = useState(false);

    useEffect(() => {
        get('/api/v1/events/list_waypoint').then((response) => {
            const eventos = response.data.rows;

            set_location(eventos);
            set_event_location(eventos[0].ID);
            console.log("AQUI LOCAL",eventos[0].ID);
        }).catch((err) => {
            console.log(err);
        });
    },[]);

    function createEvent() {
        console.log(event_location);
        
        if (event_name == null || event_image == null || event_date == null || event_time == null || event_location == null || event_description == null) {
            
            console.log("ERRO");

            return set_event_err(true);
        }

        else { 
            const event_obj = {
                event_name: event_name,
                event_image: event_image,
                event_date: event_date,
                event_time: event_time,
                waypoint_ID: parseInt(event_location),
                description: event_description
            }

            console.log(event_obj);

            post("/api/v1/events/register_event", event_obj).then((response) => {
                console.log("Evento Registrado", response);
            }).catch((err) => {
                alert(err);
            });

            confirmation();

        }       

    }

    function confirmation() {
        console.log("entrou na função");
        alert("Evento criado com sucesso");

        set_location(null);
        set_event_name(null);
        set_event_image(null);
        set_event_date(null);
        set_event_time(null);
        set_event_location(null);
        set_event_description(null);

        return props.popupIsOpen(false);
    }

    return (
        <div className="body_popup">
            {
                event_err && 
                    <div className="err_message">
                        <p>Algum campo não está preenchido!</p>
                    </div>
            }

            <div className="popup">
                <div className="nav_popup">
                    <p>Adicionar Evento</p>
                    <button onClick={() => props.popupIsOpen(false)} className="nav_btn_popup"><i class="far fa-times-circle"></i></button>
                </div>

                <div className="field">
                    <input className="field_name" placeholder="Nome do Evento" maxLength={50} onChange={e => set_event_name(e.target.value)} />
                    <input className="field_image" placeholder="Link da imagem" maxLength={1000} onChange={e => set_event_image(e.target.value)} />
                    <input className="field_date" type="date" onChange={e => set_event_date(e.target.value)} />
                    <input className="field_time" type="time" onChange={e => set_event_time(e.target.value)} />
                    <select className="field_location" placeholder="Local" value={this} onChange={e => set_event_location(e.target.value)} >
                        {
                            location && location.map(n => <option value={n.ID}>{n.local_name}</option>)
                        }  
                    </select>
                    <textarea className="field_description" maxLength={500} placeholder="Descrição do Evento" onChange={e => set_event_description(e.target.value)} />
                </div>

                <div className="control_btn_popup">
                    <button className="popup_action_button_cancel" onClick={() => {props.popupIsOpen(false)}}>Cancelar</button>
                    <button className="popup_action_button" onClick={() => createEvent()}>Confirmar</button>
                </div>
            </div>
        </div>
    )
}

function WaypointPopup(props) {
    return(
        <div className="body_popup">
            <div className="popup">
                <div className="nav_popup">
                    <p>{props.waypoint.local_name}</p>
                    <button onClick={() => props.popupIsOpen(false)} className="nav_btn_popup"><i class="far fa-times-circle"></i></button>
                </div>

                <div className="field">
                    <img src={props.waypoint.local_image} style={{width: "100%", backgroundColor:"#333"}} />

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
