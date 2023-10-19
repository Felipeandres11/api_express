import Router from 'express'
const usuarios_router = Router();
import {usuariosGet, usuariosPOST,usuariosPUT, usuariosDelete} from '../controllers/usuarios.js'
import { validarCampos } from "../middlewares/validar-campos.js";
import { check } from 'express-validator';
import {esRolValido, existeEmail, existeUsuarioPorId} from '../helpers/db-validators.js'
import {validarJWT} from '../middlewares/validar-jwt.js'



usuarios_router.get('/', usuariosGet)
usuarios_router.post('/', 
    [
       check('correo', 'El correo no es valido').isEmail(),
       check('correo').custom((correo) => existeEmail(correo)),
       check('nombre', 'El nombre es obligatorio').not().isEmpty(),
       check('password', 'El password es obligatorio, debe ser de más de 6 letras').isLength({min: 6}),
       check('rol').custom((rol) => esRolValido(rol)), // Se podría enviar asi esRolValido(), ya que express reconoce el rol como argumento 
       validarCampos
    ]
,usuariosPOST)
usuarios_router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom((id) => existeUsuarioPorId(id)),
    check('rol').custom((rol) => esRolValido(rol)),
    validarCampos

], usuariosPUT,)

usuarios_router.delete('/:id', [
                       validarJWT,
                       check('id', 'No es un ID valido').isMongoId(),
                       check('id').custom((id) => existeUsuarioPorId(id)),validarCampos], 
usuariosDelete)

export {usuarios_router};