import React, { useEffect, useState } from 'react';
import {post} from "./http/maHttp";
import "../assets/css/Events.css";
import logo from "../assets/images/logo.png"
import moldura from "../assets/images/moldura.png"
import "../assets/fontawesome/css/all.css"

export default function Home() {
    const [title, setTitle] = useState();
    const [desc, setDesc] = useState();
    const [img, setImage] = useState();
    const [err, setErr] = useState();

    const [event_list, set_events_list] = useState();
    const [show_register_popup, set_show_register_popup] = useState(false);

    useEffect(() => {
        set_events_list([
            {
                ID: "0",
                event_name: "Encontro de Carros",
                description: "Encontro de carros antigos",
                event_date: "12/12/2021",
                event_time: "15:15",
                event_image: "https://cdn.ocp.news/2019/03/exposicao-carros-antigos.jpg",
                waypoint_ID: "0"
            },
            {
                ID: "1",
                event_name: "Corrida de Bike",
                description: "Encontro de Bikes",
                event_date: "12/12/2021",
                event_time: "15:15",
                event_image: "https://cdn.ocp.news/2019/03/exposicao-carros-antigos.jpg",
                waypoint_ID: "0"
            },
            {
                ID: "2",
                event_name: "Luau no lago",
                description: "Encontro de Pessoas",
                event_date: "12/12/2021",
                event_time: "15:15",
                event_image: "https://cdn.ocp.news/2019/03/exposicao-carros-antigos.jpg",
                waypoint_ID: "0"
            },
            {
                ID: "2",
                event_name: "Luau no lago",
                description: "Encontro de Pessoas",
                event_date: "12/12/2021",
                event_time: "15:15",
                event_image: "https://cdn.ocp.news/2019/03/exposicao-carros-antigos.jpg",
                waypoint_ID: "0"
            },
            {
                ID: "2",
                event_name: "Luau no lago",
                description: "Encontro de Pessoas",
                event_date: "12/12/2021",
                event_time: "15:15",
                event_image: "https://cdn.ocp.news/2019/03/exposicao-carros-antigos.jpg",
                waypoint_ID: "0"
            },
            {
                ID: "2",
                event_name: "Luau no lago",
                description: "Encontro de Pessoas",
                event_date: "12/12/2021",
                event_time: "15:15",
                event_image: "https://cdn.ocp.news/2019/03/exposicao-carros-antigos.jpg",
                waypoint_ID: "0"
            },
            {
                ID: "2",
                event_name: "Luau no lago",
                description: "Encontro de Pessoas",
                event_date: "12/12/2021",
                event_time: "15:15",
                event_image: "https://cdn.ocp.news/2019/03/exposicao-carros-antigos.jpg",
                waypoint_ID: "0"
            },
            {
                ID: "2",
                event_name: "Luau no lago",
                description: "Encontro de Pessoas",
                event_date: "12/12/2021",
                event_time: "15:15",
                event_image: "https://cdn.ocp.news/2019/03/exposicao-carros-antigos.jpg",
                waypoint_ID: "0"
            },
            {
                ID: "2",
                event_name: "Luau no lago",
                description: "Encontro de Pessoas",
                event_date: "12/12/2021",
                event_time: "15:15",
                event_image: "https://cdn.ocp.news/2019/03/exposicao-carros-antigos.jpg",
                waypoint_ID: "0"
            }
        ]);
    }, []);

    function AddEventPopup() {
        return (
            <div className="body_popup">
                <div className="popup">
                    <div className="nav_popup">
                        <p>Adicionar Evento</p>
                        <button onClick={() => {set_show_register_popup(false)}} className="nav_btn_popup"><i class="far fa-times-circle"></i></button>
                    </div>
                </div>
            </div>
        )
    }

    function registerEvent() {
        if(title == "" || title == null || desc == "" || desc == null || img == "" || img == null) {
            if(title == "" || title == null) setErr("Preencha o Título!");

            else if(desc == "" || desc == null) setErr("Preencha a Descrição do Evento!");

            else if(img == "" || img == null) setErr("Escolha uma imagem!");
            
            console.log("Entrou no erro", err);

            return;
        }

        else {
            setErr("");

            const obj= {
                title,
                desc,
                image: img
            }

            setTitle("");
            setDesc("");
            setImage("");
    
            post("/api/v1/events/register_event", obj).then((response) => {
                console.log("Evento Registrado", response);
            }).catch((err) => {
                alert(err);
            });

            alert("Evento Registrado");
        }
    }

    return (
        <div className="body_container">
            {
                show_register_popup && <AddEventPopup />
            }

            <div className={show_register_popup ? "blur" : undefined} style={{display: "flex", flexWrap: "wrap"}}>
                <div class="nav">
                    <text className="text_nav"><i className="fas fa-user"></i> Higor</text>
                    <text className="text_nav">PARQUE MALWEE</text>
                    <button className="nav_btn"><text className="text_nav_logout"><i className="fas fa-sign-out-alt"></i> SAIR</text></button>
                </div>
                
                <div className="menu">
                    <div>
                        <button className="menu_btn"><i className="fas fa-map-marker-alt"></i> <text className="text_btn">Locais</text></button>
                        <button className="menu_btn" style={{backgroundColor: "#666"}}><i className="fas fa-ticket-alt"></i> <text className="text_btn">Eventos</text></button>
                        <button className="menu_btn"><i className="fas fa-running"></i> <text className="text_btn">Atividades</text></button>
                        <button className="menu_btn"><i className="fas fa-archway"></i> <text className="text_btn">Museu</text></button>
                        <button className="menu_btn"><i className="fas fa-map"></i> <text className="text_btn">Mapa de Calor</text></button>
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
                                <div item key={n.ID} className="event_list">
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
                                        <p>{n.event_time} h</p>
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
