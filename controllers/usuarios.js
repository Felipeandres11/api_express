import { Usuario } from "../models/usuario.js"
import bcrypt from "bcrypt";

const usuariosGet =  async(req, res) => {
   const {limite=5, desde=0} = req.query
   const estado = {estado: true}
     // const usuarios = await Usuario.find(estado)
    // .skip(Number(desde))
   //  .limit(Number(limite))
   // const total = await Usuario.countDocuments(estado);
   //optimización de codigo para que la respuesta sea inmediata, con el await espero la resolucion de las dos promesas de manera simultanea
   //Desestructuración de arreglos 
   const [total, usuarios] = await Promise.all([
     Usuario.countDocuments(estado),
     Usuario.find(estado)
            .skip(Number(desde))
            .limit(Number(limite))
   ])
   res.json({
        total,
        usuarios
   })
}

const usuariosPOST =  async(req, res) => {
     //const {Nombre, Edad} = req.body
     const {nombre, correo, rol, password } = req.body
     const usuario = new Usuario({nombre, correo, rol, password})
     //Encriptar contraseña
     const salt = bcrypt.genSaltSync(10);
     usuario.password = bcrypt.hashSync(password, salt);
     //Guardar en DB
     await usuario.save();
     res.json({
         "statusCode": 200,
         usuario 
     })
 }


const usuariosPUT =  async(req, res) => {
    const id = req.params.id
    //No tomamos en consideracion password ni google para actualizar, todo lo demás queda como campos del usuario
    const {_id, password, google, correo, ...usuario} = req.body
     //Todo validar contra base de datos
     if(password){
          //Encriptar contraseña
          const salt = bcrypt.genSaltSync(10);
          usuario.password = bcrypt.hashSync(password, salt);
     }
     const actualizarUsuario = await Usuario.findByIdAndUpdate(id, usuario);
     res.json({
          message: actualizarUsuario
     })
}

const usuariosDelete = async(req,res) => {
     const id = req.params.id
     const cambiarEstado = await Usuario.findByIdAndUpdate(id, {estado: false} )
     res.json({
          message: 'Usuario Desactivado',
          cambiarEstado
     })
}
 
 

export {usuariosGet, usuariosPOST,usuariosPUT, usuariosDelete}