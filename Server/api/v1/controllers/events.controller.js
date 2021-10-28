const conn = require('../../config/conexao');

exports.registerEvent = (req, res) => {
    const title = req.body.title;
    const desc = req.body.desc;
    const image = req.body.image;

    const query = "INSERT INTO eventos (title, description, image) VALUES (?, ?, ?)"

    console.log(title);
    console.log(desc);
    console.log(image);

    conn.query(query, [title, desc, image], (err, rows) => {
        if (err){
            console.error('Erro ao executar a query', err);
            res.status(500);
            return;
        }

        return;
    })
}

exports.listEvents = (req, res) => {
    conn.query("SELECT * FROM eventos", (err, rows) => {
        if(err) {
            console.error('Erro ao executar a query', err);
            res.status(500);
            return;
        }

        console.log(rows);

        return res.json({rows});
    });
}
