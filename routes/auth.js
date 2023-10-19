import Router from 'express'
const auth_router = Router();
import {login} from '../controllers/auth.js'
import { validarCampos } from "../middlewares/validar-campos.js";
import { check } from 'express-validator';
import {esRolValido, existeEmail, existeUsuarioPorId} from '../helpers/db-validators.js'



auth_router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login)



export {auth_router};