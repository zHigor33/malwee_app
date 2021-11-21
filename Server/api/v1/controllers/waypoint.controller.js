const { query } = require('express');
const conn = require('../../config/conexao');

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

