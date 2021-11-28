const { query } = require('express');
const conn = require('../../config/conexao');

exports.listWaypoints = (req, res) => {
    conn.query("SELECT * FROM waypoint", (err, rows) => {
        if (err) {
            console.error('Erro ao executar a query', err);
            res.status(500);
            return;
        }

        console.log(rows);

        return res.json({ rows });
    });
}

exports.registerWaypoint = (req, res) => {
    const local_name = req.body.waypoint_name;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const local_image = req.body.waypoint_image;

    const query = "INSERT INTO waypoint (lat,log,local_name,local_image) VALUES (?,?,?,?)";

    conn.query(query, [latitude, longitude, local_name, local_image], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            console.log(rows);
            return res.json(rows);
        }
    });
}
