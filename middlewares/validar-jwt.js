import jwt from 'jsonwebtoken'
const validarJWT = (req,res , next) => {
    const token = req.header('x-token');
    
    if(!token){
        return res.status(401).json({
            msg: 'no hay token en la peticion'
        })
    }


    try {
        
    } catch (error) {
        
    }


    
}

export {validarJWT}