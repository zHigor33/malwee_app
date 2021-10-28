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

    const [events_list, set_events_list] = useState([{}]);

    const event_list = [
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
    ];

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
                    <button className="action_buttons"><i className="fas fa-plus-circle"></i> Adicionar Evento</button>
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
                        event_list.map(n => 
                            <div className="event_list">
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





        /*

        Primeira versão
        
        <div>
            <div className="header">
                <h1 className="titleHeader">Parque Malwee</h1>
                <h2 className="userHeader">Usuário</h2>
            </div>

            <div className="leftMenu">
                <button className="optionButtons"><p className="optionButtonText">Eventos</p></button>
                <button className="optionButtons"><p className="optionButtonText">Telemetria</p></button>
                <button className="optionButtons"><p className="optionButtonText">Atividades</p></button>
                <button className="optionButtons"><p className="optionButtonText">Museu</p></button>
                <button className="optionButtons"><p className="optionButtonText">Pontos de Interesse</p></button>
            </div>

            <div className="bodyPage">
                <div className="bodyEvents">
                    <h1 className="titleBodyPage">Registrar Evento</h1>
                    <div>
                        {
                            err != "" &&
                            <h1 className="titleError">{err}</h1> || null
                        }
                    </div>
                    <p className="titleFieldInformation">Título do Evento</p>
                    <input type="text" name="title" onChange={(e) => setTitle(e.target.value)} className="fieldInformation"/>
                    <p className="titleFieldInformation">Descrição</p>
                    <input type="text" name="desc" onChange={(e) => setDesc(e.target.value)} className="fieldInformation"/>
                    <p className="titleFieldInformation">Imagem</p>
                    <input type="text" name="img" onChange={(e) => setImage(e.target.value)} className="fieldInformation"/>
                    <button onClick={() => {registerEvent()}} className="confirmButton">Registrar Evento</button>
                </div>
            </div>
        </div>

        */
    
    
        // <div>
        //     <h1>Titulo</h1><input type="text" name="title" onChange={(e) => setTitle(e.target.value)}/><br/>
        //     <h1>Descrição</h1><input type="text" name="desc" onChange={(e) => setDesc(e.target.value)}/><br/>
        //     <h1>Imagem</h1><input type="text" name="img" onChange={(e) => setImage(e.target.value)}/><br/>
        //     <button onClick={() => {registerEvent()}}>Registrar Evento</button>
        // </div>
    );
}
