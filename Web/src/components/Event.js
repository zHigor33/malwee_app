import React, { useEffect, useState } from 'react';
import {post, get} from "./http/maHttp";
import "../assets/css/Events.css";
import logo from "../assets/images/logo.png";
import moldura from "../assets/images/moldura.png";
import "../assets/fontawesome/css/all.css";
import { useHistory } from 'react-router-dom';

export default function Home(props) {
    const history = useHistory();
    const [user, set_user] = useState();
    const [event_list, set_events_list] = useState();
    const [show_register_popup, set_show_register_popup] = useState(false);
    const [show_select_event, set_show_select_event] = useState(false);
    const [select_event, set_select_event] = useState();

    useEffect(() => {
        let user = localStorage.getItem("user_name");
        set_user(user);

        console.log("usuario",user);

        get('/api/v1/events/list_event').then((response) => {
            console.log("AQUI",response);

            set_events_list(response.data.rows);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    function showEvent(n) {
        console.log(n);

        set_select_event(n);
        set_show_select_event(true);
    }

    function logout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="body_container">
            {
                show_register_popup && <AddEventPopup popupIsOpen={isOpen => set_show_register_popup(isOpen)} />
            }

            {
                show_select_event && <EventPopup popupIsOpen={isOpen => set_show_select_event(isOpen)} event={select_event} />
            }

            <div className={show_register_popup || show_select_event ? "blur" : undefined} style={{display: "flex", flexWrap: "wrap"}}>
                <div class="nav">
                    <text className="text_nav"><i className="fas fa-user"></i> {user ? user : "Usuário"}</text>
                    <text className="text_nav">PARQUE MALWEE</text>
                    <button className="nav_btn" onClick={() => logout()}><text className="text_nav_logout"><i className="fas fa-sign-out-alt"></i> SAIR</text></button>
                </div>
                
                <div className="menu">
                    <div>
                        <button className="menu_btn" onClick={() => history.push('/waypoints')}><i className="fas fa-map-marker-alt"></i> <text className="text_btn">Locais</text></button>
                        <button className="menu_btn" style={{backgroundColor: "#666"}}><i className="fas fa-ticket-alt"></i> <text className="text_btn">Eventos</text></button>
                        <button className="menu_btn" onClick={() => history.push('/activity')}><i className="fas fa-running"></i> <text className="text_btn">Atividades</text></button>
                        <button className="menu_btn" onClick={() => history.push('/museum')}><i className="fas fa-archway"></i> <text className="text_btn">Museu</text></button>
                        <button className="menu_btn" onClick={() => history.push('/heatmap')}><i className="fas fa-map"></i> <text className="text_btn">Mapa de Calor</text></button>
                    </div>
                    
                    <img src={logo} className="menu_img" />
                </div>
                
                <div className="body_page">
                    <div className="banner">
                        <div className="banner_info">
                            <h1>EVENTOS</h1>
                            
                            <p>
                                Nesta área, você poderá manusear e criar cadastros de eventos para o parque,
                                informando seus locais cadastrados, adicionando imagens referentes ao evento,
                                horário e datas. Aqui também ficará disponível uma estimatíva de quantas 
                                pessoas foram neste evento.
                            </p>
                        </div>
                        
                        <div className="banner_img"> 
                            <img src={moldura}/>
                        </div>
                    </div>
                    
                    <div className="container_action_buttons">
                        <button className="action_buttons" onClick={() => {set_show_register_popup(true)}}><i className="fas fa-plus-circle"></i> Adicionar Evento</button>
                        {/*<button className="action_buttons"><i className="fas fa-minus-circle"></i> Excluir Evento</button>*/}
                    </div>
                    
                    <div className="event_container">
                        <div className="event_list_column">
                            <div className="event_id">
                                <p>ID</p>
                            </div>

                            <div className="event_name">
                                <p>Nome</p>
                            </div>

                            <div className="event_date">
                                <p>Data</p>
                            </div>

                            <div className="event_time">
                                <p>Horário</p>
                            </div>
                        </div>
                        
                        {
                            
                            event_list && event_list.map(n =>
                                <div item key={n.ID} className="event_list" onClick={() => {showEvent(n)}}>
                                    <div className="event_id">
                                        <p>{n.ID}</p>
                                    </div>
                        
                                    <div className="event_name">
                                        <p>{n.event_name}</p>
                                    </div>
                        
                                    <div className="event_date">
                                        <p>{n.event_date}</p>
                                    </div>
                        
                                    <div className="event_time">
                                        <p>{n.event_time}</p>
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

function AddEventPopup(props) {
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

function EventPopup(props) {
    const [local_name, set_local_name] = useState();

    useEffect(() => {
        get('/api/v1/events/event_waypoint/'+props.event.waypoint_ID).then((response) => {
            set_local_name(response.data[0].local_name);
            console.log(response.data);
        }).catch((err) => {
            console.log(err);
        });
    },[])

    return(
        <div className="body_popup">
            <div className="popup">
                <div className="nav_popup">
                    <p>{props.event.event_name}</p>
                    <button onClick={() => props.popupIsOpen(false)} className="nav_btn_popup"><i class="far fa-times-circle"></i></button>
                </div>

                <div className="field">
                    <img src={props.event.event_image} style={{width: "100%", backgroundColor:"#333"}} />

                    <div className="title_option_popup">
                        <p>Data</p>
                        <p>Horário</p>
                    </div>
                    
                    <div className="option_popup">
                        <p>{props.event.event_date}</p>
                        <p>{props.event.event_time}</p>
                    </div>

                    <p>Local: {local_name && local_name}</p>
                    <div className="field_description">
                        <p>{props.event.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
