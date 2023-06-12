import express from "express"
import { obtenerBalance } from "../controllers/CalculoController.js";
import checkAuth from "../middleware/authValidacion.js";


const router = express.Router();

router.get("/resultado", obtenerBalance);

export default router;
