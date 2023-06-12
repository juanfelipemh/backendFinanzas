import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
//import dbConnection from "./config/Database.js";

import usuarioRoutes from "./routes/usuarioRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import ingresoRoutes from "./routes/ingresoRoutes.js";
import egresoRoutes from "./routes/egresoRoutes.js";
import conceptoRoutes from "./routes/conceptoRoutes.js";
import gastoFijoRoutes from "./routes/gastoFijoRoutes.js"
import calculoRoutes from "./routes/calculoRoutes.js"


dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

/*app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
})); */
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))


app.use(session({
    secret: 'palabrasupersecreta', // Cambia 'secreto' por una cadena de caracteres aleatoria y segura
    resave: false,
    saveUninitialized: true
  }));

/*
const dominiosPermitidos = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function(origin, callback){
        if(dominiosPermitidos.indexOf(origin) !== -1){
            callback(null, true)
        } else {
            callback(new Error("No permitido por CORS"))
        }
    }
}
*/


// CREAR TABLAS BASE DE DATOS
import Usuario from "./models/UsuarioModel.js";
import Ingresos from "./models/IngresosModel.js";
import Egresos from "./models/EgresosModel.js";
import Concepto from "./models/ConceptoModel.js";
import GastosFijos from "./models/GastosFijosModel.js"
import dbConnection from "./config/Database.js";
import session from "express-session";

/*
(async()=>{
    await dbConnection.sync()
})();   */


app.use("/api", usuarioRoutes);
app.use("/api", authRoutes);
app.use("/api", ingresoRoutes)
app.use("/api", egresoRoutes)
app.use("/api", conceptoRoutes)
app.use("/api", gastoFijoRoutes)
app.use("/api", calculoRoutes)

app.listen(PORT, () => {
    console.log(`Servidor conectado ${PORT}`);
})

