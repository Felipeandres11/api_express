import express from 'express'
import cors from 'cors'
import {router} from '../routes/usuarios.js'
import { dbConnection } from '../database/config.js';


export class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT

        this.usuariosRoutePath = '/api/usuarios'

        //CONEXION A DB
        this.conectarDB();

        //MIDDLEWARE
        this.middlewares();
        //rutas de mi app
        this.routes();

       
    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares(){
        //Directorio publico
        this.app.use(express.static('public'))
        //CORS
        this.app.use(cors())
        //PARSEO y LECTURA DEL BODY
        this.app.use(express.json())
    }

    routes(){
        this.app.use(this.usuariosRoutePath, router )
      
    }

    listen(){
        this.app.listen(this.port, ()=> {
            console.log('Servidor corriendo en puerto', process.env.PORT)
        })
    }

}

