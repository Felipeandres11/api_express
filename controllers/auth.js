import {Usuario} from '../models/usuario.js'
import bcrypt from "bcrypt";
import {generarJWT} from '../helpers/generar-jwt.js'

const login = async(req,res) => {
    const {correo, password} = req.body;

    try {
        //Verificar si el email existe

        let usuario = await Usuario.findOne({correo: correo});

        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos'
            })
        }

        //Verificar si el usuario esta activo en la base de datos
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'El usuario esta deshabilitado, estado: false'
            })
        }
        //Verificar la contraseña 
        const validPassword = bcrypt.compareSync(password, usuario.password)
        if(!validPassword){
            return res.status(400).json({
                msg: 'La contraseña es incorrecta, intentelo nuevamente'
            })
        }
        //Generar JWT
        const token = await generarJWT(usuario.id)

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'hable con el administrador'
        })
    }
}
export {login}