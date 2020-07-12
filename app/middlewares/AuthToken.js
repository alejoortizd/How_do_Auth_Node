const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');

module.exports = function(req, res, next){
    if(req.path != '/auth/login'){
        if(req.headers.authorization){
            let token = req.headers.authorization.split(' ')[1]
            jwt.verify(token, CONFIG.SECRET_TOKEN, (error, decoded) => {
                if(error) return res.status(403).send({message: 'No tienes los permisos suficientes para estar aqui'});
                if(req.method != 'GET') {
                    if(decoded.role ==='admin') next();
                    else res.status(403).send({message: 'No tienes permisos suficientes para estar aqui'});
                } else {
                    next();
                }
            });
        } else res.status(403).send({message: 'No tienes permisos suficientes para estar aqui'});
    } else next();
}