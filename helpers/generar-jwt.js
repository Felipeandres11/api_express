import jwt from 'jsonwebtoken'

const generarJWT = (uid = '') => {
    
    return new Promise((resolve, reject) => {
        
        const payload = {uid};
        //Primero se envia la información del payload y luego la clave secreta, luego se ejecuta el callback y si todo sale bien se resuelve la promesa
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject('No se pudo generar el token')
            }else {
                resolve(token);
            }
        } )
        
    })
}

export {generarJWT};