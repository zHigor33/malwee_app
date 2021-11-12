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
    conn.query("SELECT * FROM event", (err, rows) => {
        if(err) {
            console.error('Erro ao executar a query', err);
            res.status(500);
            return;
        }

        console.log(rows);

        return res.json({rows});
    });
}

exports.listWaypointsPerEvents = (req, res) => {
    const ID = req.params.id

    if (ID) {
        const query = "SELECT * FROM waypoint WHERE ID = ?";
        conn.query(query, [ID], (err, rows) => {
            if (err) {
                console.error('Erro ao executar a query', err);
                res.status(500);
                console.log({rows});
                return;
                
            }
            
            return res.json({rows});
        });
    }

    else {
        listWaypoints();
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
