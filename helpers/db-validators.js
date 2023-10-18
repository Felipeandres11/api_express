import { Roles } from "../models/role.js"
import {Usuario} from '../models/usuario.js'

const esRolValido = async(rol = '') => {
    const existeRol = await Roles.findOne({rol: rol})
    if(!existeRol){
        throw new Error (`El rol ${rol} no esta registrado en la base de datos`)
    }
}


const existeEmail = async(correo = '') => {
    const email = await Usuario.findOne({correo})
    
    if(email){
        throw new Error (`El email ${correo} esta registrado en la base de datos`)
    }
} 


const existeUsuarioPorId = async(id = '') => {
    const existeUsuario = await Usuario.findById(id)
    if(!existeUsuario){
        throw new Error (`El id ${id} no esta registrado en la base de datos`)
    }
} 



export {esRolValido, existeEmail,  existeUsuarioPorId}