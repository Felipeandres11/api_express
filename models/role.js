import {Schema, model} from 'mongoose';

const RoleSchema = Schema({
    rol: {
        type: String,
        required: true
    }
})

//Create a new model of user
const Roles = model('Roles', RoleSchema);

export {Roles}