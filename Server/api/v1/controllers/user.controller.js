const conn = require('../../config/conexao');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

exports.login = (req, res) => {
    console.log("Secret: ", process.env.SECRET);
    const email = req.body.email;
    const user_password = req.body.user_password;

    const query = "SELECT * FROM user WHERE email=?"


    conn.query(query, [email], (err, rows) => {
        if (err) {
            console.error('Erro ao executar a query', err);
            res.status(500);
            return;
        }

        if (rows.length == 0) {
            console.warn('Email nao encontrado');
            res.status(404);
            return;
        }

        bcrypt.compare(user_password, rows[0].user_password, (err, resp) => {
            if (err) {
                console.error('Erro ao comparar a senha');
                res.status(500);
                return;
            }

            if (!resp) {
                console.error('O BCRYPT nao deu uma respota. fdp');
                res.status(403);
                return;
            }

            console.log('ate aqui tudo bem, vamos tentar assinar ;)')
            const usuario = rows[0].id
            jwt.sign({ usuario }, process.env.SECRET, { expiresIn: 30 }, (err, token) => {
                if (err) {
                    console.error('puts, deu ruim ao assinar', err);
                }

                console.log('deu tudo certo');
                res.status(200);
                // res.json({
                //     auth: true,
                //     token: token
                // })
                res.json({ token });
            });
        });
    });
}

exports.loginWeb = (req, res) => {
    console.log("Secret: ", process.env.SECRET);
    const email = req.body.email;
    const user_password = req.body.user_password;

    console.log("Entrou na rota");
    console.log(req.body.email);

    const query = 'SELECT * FROM user WHERE email=? AND user_adm=1';


    conn.query(query, [email], (err, rows) => {

        if (err) {
            console.error('Erro ao executar a query', err);
            res.status(500);
            return;
        }

        if (rows.length == 0) {
            console.warn('Email nao encontrado');
            res.status(404);
            return;
        }

        bcrypt.compare(user_password, rows[0].user_password, (err, resp) => {
            if (err) {
                console.error('Erro ao comparar a senha');
                res.status(500);
                return;
            }

            if (!resp) {
                console.error('O BCRYPT nao deu uma respota. fdp');
                res.status(403);
                return;
            }

            console.log('ate aqui tudo bem, vamos tentar assinar ;)')
            const usuario = rows[0].id
            const user = rows[0]
            jwt.sign({ usuario }, process.env.SECRET, { expiresIn: 30 }, (err, token) => {
                if (err) {
                    console.error('puts, deu ruim ao assinar', err);
                }

                console.log('deu tudo certo');
                res.status(200);
                // res.json({
                //     auth: true,
                //     token: token
                // })
                res.json({ token, user });
            });
        });
    });
}

exports.verify = (req, res, next) => {

    const token = req.headers['access-token']

    if (!token) {
        res.status(401)
        res.send({
            auth: false,
            message: 'O token está em branco'
        })
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {

        if (err) {
            res.status(500)
            res.send({
                auth: false,
                message: 'Falha de autenticação'
            })
        } else {
            next()
        }
    })
}

exports.register = (req, res) => {
    const user_password = req.body.user_password;
    const user_name = req.body.user_name;
    const email = req.body.email;
    const salt = 10;
    const query = "INSERT INTO user (user_name,email,user_password) VALUES (?,?,?)";

    bcrypt.hash(user_password, salt, function (err, hash) {
        console.log(req.body);

        if (err) {
            console.log(err);
            res.status(500);
            return;
        }

        if (!hash) {
            console.log(hash);
            res.status(500);
            return;
        }

        conn.query(query, [user_name, email, hash], (err, rows) => {
            if (err) {
                console.log(err);
            } else {
                console.log(rows);
                return res.json(rows);
            }
        });
    });
}
