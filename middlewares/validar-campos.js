import { validationResult } from "express-validator";


const validarCampos = (request, response, next) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()){
         return response.status(400).json(errors);
    }

    next();
}

export {validarCampos}