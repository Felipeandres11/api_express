import Router from 'express'
const router = Router();
import {usuariosGet, usuariosPOST,usuariosPUT} from '../controllers/usuarios.js'
import { validarCampos } from "../middlewares/validar-campos.js";
import { check } from 'express-validator';
import {esRolValido, existeEmail, existeUsuarioPorId} from '../helpers/db-validators.js'



router.get('/', usuariosGet)
router.post('/', 
    [
       check('correo', 'El correo no es valido').isEmail(),
       check('correo').custom((correo) => existeEmail(correo)),
       check('nombre', 'El nombre es obligatorio').not().isEmpty(),
       check('password', 'El password es obligatorio, debe ser de más de 6 letras').isLength({min: 6}),
       check('rol').custom((rol) => esRolValido(rol)), // Se podría enviar asi esRolValido(), ya que express reconoce el rol como argumento 
       validarCampos
    ]
,usuariosPOST)
router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom((id) => existeUsuarioPorId(id)),
    check('rol').custom((rol) => esRolValido(rol)),
    validarCampos

], usuariosPUT,)

export {router};