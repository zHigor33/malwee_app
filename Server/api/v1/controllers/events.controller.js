const { query } = require('express');
const conn = require('../../config/conexao');

exports.registerEvent = (req, res) => {
    const event_name = req.body.event_name;
    const event_image = req.body.event_image;
    const event_date = req.body.event_date;
    const event_time = req.body.event_time;
    const waypoint_ID = parseInt(req.body.waypoint_ID);
    const description = req.body.description;

    console.log(req.body);

    const query = "INSERT INTO event (event_name, description, event_date, event_time, event_image, waypoint_ID) VALUES (?, ?, ?, ?, ?, ?)"

    conn.query(query, [event_name, description, event_date, event_time, event_image, waypoint_ID], (err, rows) => {
        if (err){
            console.error('Erro ao executar a query', err);
            res.status(500);
            return;
        }

        return;
    });
}

exports.listEvents = (req, res) => {
    let date = new Date();
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let year = date.getFullYear();
    let format_date = year+'-'+month+'-'+day;

    console.log(format_date);

    const query = "SELECT * FROM event WHERE event_date >= ?";

    conn.query(query, [format_date], (err, rows) => {
        if(err) {
            console.error('Erro ao executar a query', err);
            res.status(500);
            return;
        }

        // Formatando data;
        for (let i = 0; i < rows.length; i++) {
            let date = rows[i].event_date;
            let day = String(date.getDate()).padStart(2, '0');
            let month = String(date.getMonth() + 1).padStart(2, '0');
            let year = date.getFullYear();

            let format_date = day + "/" + month + "/" + year

            // console.log(format_date);
            
            rows[i].event_date = format_date;
        }

        // Formatando horario;
        for (let i = 0; i < rows.length; i++) {
            let time = rows[i].event_time.toString();
            let format_time = time.slice(0,5);
            
            // console.log(format_time);

            rows[i].event_time = format_time;
        }

        // console.log(rows);

        return res.json({rows});
    });
}

exports.listWaypointsPerEvents = (req, res) => {
    const ID = req.params.id

    if (ID) {
        const query = "SELECT local_name FROM waypoint WHERE ID = ?";

        conn.query(query, [ID], (err, rows) => {
            if (err) {
                console.error('Erro ao executar a query', err);
                res.status(500);
                console.log({rows});
                return;
            }
            
            return res.json(rows);
        });
    }

    else {
        res.json('Indefinido');
    }
}

exports.listWaypoints = (req, res) => {
    conn.query("SELECT * FROM waypoint", (err, rows) => {
        if(err) {
            console.error('Erro ao executar a query', err);
            res.status(500);
            return;
        }

        console.log(rows);

        return res.json({rows});
    });
}
