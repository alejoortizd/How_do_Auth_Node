const User = require('../models/User');
const bcrypt = require('bcrypt');
const CONFIG = require('../config/config');

const jwt = require('jsonwebtoken');

//Llega un Username y un password

function login(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    User.findOne({username})
        .then(user => {
            if(!user) return res.status(404).send({message: 'Usuario o Password incorrectos'});
            bcrypt.compare(password, user.password)
                .then(match => {
                    if(match) {
                        payload = {
                            username: user.username,
                            email: user.email,
                            name: user.name,
                            role: user.role
                        }
                        jwt.sign(payload, CONFIG.SECRET_TOKEN, (error, token) => {
                            if(error){
                                res.status(500).send({error})
                            } else {
                                res.status(200).send({message: 'Acceso', token})
                            }
                        })
                    } else {
                        res.status(200).send({message: 'Usuario o Password incorrectos'})
                    }
                }).catch(error =>{
                    console.log(error)
                    res.status(500).send({error})
                })
        }).catch(error =>{
            console.log(error)
            res.status(500).send({error})
        })
}

module.exports =login;