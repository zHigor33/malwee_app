import React, { useEffect, useState } from 'react';
import {post, get} from "./http/maHttp";
import "../assets/css/Museum.css";
import logo from "../assets/images/logo.png";
import moldura from "../assets/images/moldura.png";
import "../assets/fontawesome/css/all.css";
import { useHistory } from 'react-router-dom';

export default function Home(props) {
    const history = useHistory();
    const [user, set_user] = useState();
    const [museum_list, set_museum_list] = useState();
    const [show_register_popup, set_show_register_popup] = useState(false);
    const [show_select_museum_item, set_show_select_museum_item] = useState(false);
    const [select_museum, set_select_museum] = useState();

    useEffect(() => {
        let user = localStorage.getItem("user_name");
        set_user(user);

        console.log("usuario",user);

        get('/api/v1/museum/list_museum').then((response) => {
            console.log(response.data.rows);
            set_museum_list(response.data.rows);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    function showMuseum(n) {
        console.log(n);

        set_select_museum(n);
        set_show_select_museum_item(true);
    }

    function logout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="body_container">
            {
                show_register_popup && <AddMuseumPopup popupIsOpen={isOpen => set_show_register_popup(isOpen)} />
            }

            {
                show_select_museum_item && <MuseumPopup popupIsOpen={isOpen => set_show_select_museum_item(isOpen)} museum={select_museum} />
            }

            <div className={show_register_popup || show_select_museum_item ? "blur" : undefined} style={{display: "flex", flexWrap: "wrap"}}>
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
                        <button className="menu_btn" style={{backgroundColor: "#666"}}><i className="fas fa-archway"></i> <text className="text_btn">Museu</text></button>
                        <button className="menu_btn" onClick={() => history.push('/heatmap')}><i className="fas fa-map"></i> <text className="text_btn">Mapa de Calor</text></button>
                    </div>
                    
                    <img src={logo} className="menu_img" />
                </div>
                
                <div className="body_page">
                    <div className="banner">
                        <div className="banner_info">
                            <h1>MUSEU</h1>
                            
                            <p>
                                Nesta área, você poderá catalogar os itens que existem
                                dentro do museu, colocando suas descrições, história e
                                fotos.
                            </p>
                        </div>
                        
                        <div className="banner_img"> 
                            <img src={moldura}/>
                        </div>
                    </div>
                    
                    <div className="container_action_buttons">
                        <button className="action_buttons" onClick={() => {set_show_register_popup(true)}}><i className="fas fa-plus-circle"></i> Adicionar Item</button>
                        {/* <button className="action_buttons"><i className="fas fa-minus-circle"></i> Excluir Evento</button> */}
                    </div>
                    
                    <div className="museum_container">
                        <div className="museum_list_column">
                            <div className="museum_id">
                                <p>ID</p>
                            </div>

                            <div className="museum_name">
                                <p>Nome do Artefato</p>
                            </div>
                        </div>
                        
                        {
                            
                            museum_list && museum_list.map(n =>
                                <div item key={n.ID} className="museum_list" onClick={() => {showMuseum(n)}}>
                                    <div className="museum_id">
                                        <p>{n.ID}</p>
                                    </div>
                        
                                    <div className="museum_name">
                                        <p>{n.artifact_name}</p>
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

function AddMuseumPopup(props) {
    const [museum_item, set_museum_item] = useState();
    const [museum_item_description, set_museum_item_description] = useState();
    const [museum_image, set_museum_image] = useState();
    const [museum_err, set_museum_err] = useState(false);

    function createMuseum() {
        
        if (museum_item == null || museum_image == null || museum_item_description == null) {
            
            console.log("ERRO");

            return set_museum_err(true);
        }

        else { 
            const event_obj = {
                museum_item,
                museum_item_description,
                museum_image
            }

            console.log(event_obj);

            post("/api/v1/museum/register_museum", event_obj).then((response) => {
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
        alert("Item criado com sucesso");

        set_museum_item(null);
        set_museum_item_description(null);
        set_museum_image(null);
    }

    return (
        <div className="body_popup">
            {
                museum_err && 
                    <div className="err_message">
                        <p>Algum campo não está preenchido!</p>
                    </div>
            }

            <div className="popup">
                <div className="nav_popup">
                    <p>Adicionar Item</p>
                    <button onClick={() => props.popupIsOpen(false)} className="nav_btn_popup"><i class="far fa-times-circle"></i></button>
                </div>

                <div className="field">
                    <input className="field_title" placeholder="Nome do item" onChange={e => set_museum_item(e.target.value)} />
                    <input className="field_image" placeholder="Link da imagem" maxLength={1000} onChange={e => set_museum_image(e.target.value)} />
                    <textarea className="field_description" maxLength={500} placeholder="Descrição do Item" onChange={e => set_museum_item_description(e.target.value)} />
                </div>

                <div className="control_btn_popup">
                    <button className="popup_action_button_cancel" onClick={() => {props.popupIsOpen(false)}}>Cancelar</button>
                    <button className="popup_action_button" onClick={() => createMuseum()}>Confirmar</button> 
                </div>
            </div>
        </div>
    )
}

function MuseumPopup(props) {
    return(
        <div className="body_popup">
            <div className="popup">
                <div className="nav_popup">
                    <p>{props.museum.artifact_name}</p>
                    <button onClick={() => props.popupIsOpen(false)} className="nav_btn_popup"><i class="far fa-times-circle"></i></button>
                </div>

                <div className="field">
                    <img src={props.museum.image} style={{width: "100%", backgroundColor:"#333"}} />
                    
                    <div className="field_description">
                        <p>{props.museum.artifact_description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
