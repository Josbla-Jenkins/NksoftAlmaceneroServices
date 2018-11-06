
const jwt = require('jsonwebtoken');


let verifyToken = (req, res, next)=>{
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded)=>{
        if(err){
            return res.status(401).json(
                {
                    ok: false,
                    err: {
                        message: 'token no valido'
                    }
                }
            );
        }

        req.user = decoded.user;
        next();
    });
};

let verifyAcountOwner = (req, res, next)=>{
    let user = req.user;
    let id = req.params.id;
    let admin = req.user.role;

    if(user._id != id){
        if(admin === 'ADMIN_ROLE'){
            return next();
        }else{
            return res.status(401).json(
                {
                    ok: false,
                    err: {
                        message: 'No tiene permisos para esto'
                    }
                }
            ); 
        } 
    }
    next();
};

module.exports = {
    verifyToken,
    verifyAcountOwner
}