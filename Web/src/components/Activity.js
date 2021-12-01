import React, { useEffect, useState } from 'react';
import {post, get} from "./http/maHttp";
import "../assets/css/Activity.css";
import logo from "../assets/images/logo.png";
import moldura from "../assets/images/moldura-atividades.png";
import "../assets/fontawesome/css/all.css";
import { useHistory } from 'react-router-dom';

export default function Home(props) {
    const history = useHistory();
    const [user, set_user] = useState();
    const [activity_list, set_activity_list] = useState();
    const [show_register_popup, set_show_register_popup] = useState(false);
    const [show_select_activity_item, set_show_select_activity_item] = useState(false);
    const [select_activity, set_select_activity] = useState();

    useEffect(() => {
        let user = localStorage.getItem("user_name");
        set_user(user);

        console.log("usuario",user);

        get('/api/v1/activity/list_activity').then((response) => {
            console.log(response.data.rows);
            set_activity_list(response.data.rows);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    function showActivity(n) {
        console.log(n);

        set_select_activity(n);
        set_show_select_activity_item(true);
    }

    function logout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="body_container">
            {
                show_register_popup && <AddActivityPopup popupIsOpen={isOpen => set_show_register_popup(isOpen)} />
            }

            {
                show_select_activity_item && <ActivityPopup popupIsOpen={isOpen => set_show_select_activity_item(isOpen)} activity={select_activity} />
            }

            <div className={show_register_popup || show_select_activity_item ? "blur" : undefined} style={{display: "flex", flexWrap: "wrap"}}>
                <div class="nav">
                    <text className="text_nav"><i className="fas fa-user"></i> {user ? user : "Usuário"}</text>
                    <text className="text_nav">PARQUE MALWEE</text>
                    <button className="nav_btn" onClick={() => logout()}><text className="text_nav_logout"><i className="fas fa-sign-out-alt"></i> SAIR</text></button>
                </div>
                
                <div className="menu">
                    <div>
                        <button className="menu_btn" onClick={() => history.push('/waypoints')}><i className="fas fa-map-marker-alt"></i> <text className="text_btn">Locais</text></button>
                        <button className="menu_btn" onClick={() => history.push('/events')}><i className="fas fa-ticket-alt"></i> <text className="text_btn">Eventos</text></button>
                        <button className="menu_btn" style={{backgroundColor: "#666"}}><i className="fas fa-running"></i> <text className="text_btn">Atividades</text></button>
                        <button className="menu_btn" onClick={() => history.push('/museum')}><i className="fas fa-archway"></i> <text className="text_btn">Museu</text></button>
                        <button className="menu_btn" onClick={() => history.push('/heatmap')}><i className="fas fa-map"></i> <text className="text_btn">Mapa de Calor</text></button>
                    </div>
                    
                    <img src={logo} className="menu_img" />
                </div>
                
                <div className="body_page">
                    <div className="banner">
                        <div className="banner_info">
                            <h1>ATIVIDADES</h1>
                            
                            <p>
                                Nesta área, você poderá registrar as atividades
                                disponíveis para fazer no parque, assim como 
                                seus locais de execução, uma breve descrição e 
                                uma imagem.
                            </p>
                        </div>
                        
                        <div className="banner_img"> 
                            <img src={moldura}/>
                        </div>
                    </div>
                    
                    <div className="container_action_buttons">
                        <button className="action_buttons" onClick={() => {set_show_register_popup(true)}}><i className="fas fa-plus-circle"></i> Adicionar Atividade</button>
                        {/* <button className="action_buttons"><i className="fas fa-minus-circle"></i> Excluir Evento</button> */}
                    </div>
                    
                    <div className="activity_container">
                        <div className="activity_list_column">
                            <div className="activity_id">
                                <p>ID</p>
                            </div>

                            <div className="activity_name">
                                <p>Nome da Atividade</p>
                            </div>

                            <div className="event_date">
                                <p>ID do Local</p>
                            </div>
                        </div>
                        
                        {
                            
                            activity_list && activity_list.map(n =>
                                <div item key={n.ID} className="activity_list" onClick={() => {showActivity(n)}}>
                                    <div className="activity_id">
                                        <p>{n.ID}</p>
                                    </div>
                        
                                    <div className="activity_name">
                                        <p>{n.activity_name}</p>
                                    </div>

                                    <div className="event_date">
                                        <p>{n.waypoint_ID}</p>
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

function AddActivityPopup(props) {
    const [activity_item, set_activity_item] = useState();
    const [activity_location, set_activity_location] = useState();
    const [location, set_location] = useState();
    const [activity_item_description, set_activity_item_description] = useState();
    const [activity_image, set_activity_image] = useState();
    const [activity_err, set_activity_err] = useState(false);

    useEffect(() => {
        get('/api/v1/events/list_waypoint').then((response) => {
            const local = response.data.rows;

            set_location(local);
            set_activity_location(local[0].ID);
            console.log("AQUI LOCAL",local[0].ID);
        }).catch((err) => {
            console.log(err);
        });
    },[]);

    function createActivity() {
        
        if (activity_item == null || activity_image == null || activity_item_description == null || activity_location == null) {
            
            console.log("ERRO");

            return set_activity_err(true);
        }

        else { 
            const event_obj = {
                activity_item,
                activity_item_description,
                activity_image,
                activity_location
            }

            console.log(event_obj);

            post("/api/v1/activity/register_activity", event_obj).then((response) => {
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
        alert("Atividade criado com sucesso");

        set_activity_item(null);
        set_activity_item_description(null);
        set_activity_image(null);
        set_activity_location(null);
    }

    return (
        <div className="body_popup">
            {
                activity_err && 
                    <div className="err_message">
                        <p>Algum campo não está preenchido!</p>
                    </div>
            }

            <div className="popup">
                <div className="nav_popup">
                    <p>Adicionar Atividade</p>
                    <button onClick={() => props.popupIsOpen(false)} className="nav_btn_popup"><i class="far fa-times-circle"></i></button>
                </div>

                <div className="field">
                    <input className="field_title_name" placeholder="Nome da Atividade" onChange={e => set_activity_item(e.target.value)} />
                    <select className="field_location_activity" placeholder="Local" value={this} onChange={e => set_activity_location(e.target.value)} >
                        {
                            location && location.map(n => <option value={n.ID}>{n.local_name}</option>)
                        }  
                    </select>
                    <input className="field_image" placeholder="Link da imagem" maxLength={1000} onChange={e => set_activity_image(e.target.value)} />
                    <textarea className="field_description" maxLength={500} placeholder="Descrição da Atividade" onChange={e => set_activity_item_description(e.target.value)} />
                </div>

                <div className="control_btn_popup">
                    <button className="popup_action_button_cancel" onClick={() => {props.popupIsOpen(false)}}>Cancelar</button>
                    <button className="popup_action_button" onClick={() => createActivity()}>Confirmar</button> 
                </div>
            </div>
        </div>
    )
}

function ActivityPopup(props) {
    const [local_name, set_local_name] = useState();

    useEffect(() => {
        get('/api/v1/events/event_waypoint/'+props.activity.waypoint_ID).then((response) => {
            set_local_name(response.data[0].local_name);
            console.log(response.data);
        }).catch((err) => {
            console.log(err);
        });
    },[]);

    return(
        <div className="body_popup">
            <div className="popup">
                <div className="nav_popup">
                    <p>{props.activity.activity_name}</p>
                    <button onClick={() => props.popupIsOpen(false)} className="nav_btn_popup"><i class="far fa-times-circle"></i></button>
                </div>

                <div className="field">
                    <img src={props.activity.image} style={{width: "100%", backgroundColor:"#333"}} />

                    <p>Local: {local_name && local_name}</p>

                    <div className="field_description">
                        <p>{props.activity.activity_description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
