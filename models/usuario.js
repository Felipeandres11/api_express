import {Schema, model} from 'mongoose';

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: true
    }
})

//Tiene que ser una función normal no de flecha para hacer referencia a la instancia con this 
UsuarioSchema.methods.toJSON = function(){
    //this.toObject devuelve el objeto literal que hace referencia la instancia 
    //Estamos sacando la version y el password,  y todos los demas parametros seran almacenados en usuario 
    const {__v, password, ...usuario } = this.toObject();
    return usuario;
}

//Create a new model of user
const Usuario = model('Usuario', UsuarioSchema);

export {Usuario}