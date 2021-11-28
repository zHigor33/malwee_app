const { query } = require('express');
const conn = require('../../config/conexao');

exports.listMuseum = (req, res) => {
    conn.query("SELECT * FROM museum", (err, rows) => {
        if (err) {
            console.error('Erro ao executar a query', err);
            res.status(500);
            return;
        }

        console.log(rows);

        return res.json({ rows });
    });
}

exports.registerMuseum = (req, res) => {
    const artifact_name = req.body.museum_item;
    const artifact_description = req.body.museum_item_description;
    const image = req.body.museum_image;

    const query = "INSERT INTO museum (artifact_name,artifact_description,image) VALUES (?,?,?)";

    conn.query(query, [artifact_name, artifact_description, image], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            console.log(rows);
            return res.json(rows);
        }
    });
}
