import mongoose, { Mongoose } from "mongoose"

const dbConnection = async()=>{
    try {
      await mongoose.connect(process.env.MONGODB_CNN, {
        useNewUrlParser: true, // <-- no longer necessary
        useUnifiedTopology: true // <-- no longer necessary
      }, console.log("Base de datos online"))
      
    } catch (error) {
      console.log(error)
      throw new Error("Error a la hora de iniciar la base de datos")  
    }
}

export {dbConnection};