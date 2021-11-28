const { query } = require('express');
const conn = require('../../config/conexao');

exports.listActivity = (req, res) => {
    conn.query("SELECT * FROM activity", (err, rows) => {
        if (err) {
            console.error('Erro ao executar a query', err);
            res.status(500);
            return;
        }

        console.log(rows);

        return res.json({ rows });
    });
}

exports.registerActivity = (req, res) => {
    const activity_name = req.body.activity_item;
    const activity_description = req.body.activity_item_description;
    const image = req.body.activity_image;
    const waypoint_ID = req.body.activity_location;

    const query = "INSERT INTO activity (activity_name,activity_description,image,waypoint_ID) VALUES (?,?,?,?)";

    conn.query(query, [activity_name, activity_description, image, waypoint_ID], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            console.log(rows);
            return res.json(rows);
        }
    });
}
