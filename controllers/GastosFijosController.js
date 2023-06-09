import GastosFijos from "../models/GastosFijosModel.js"


export const registrarGastoFijo = async (req, res) => {
    const validarConcepto = await GastosFijos.findOne({
        where: {
            concepto: req.body.concepto
        }
    })

    if(validarConcepto){
        return res.status(401).json({msg: "Gasto fijo ya existe"})
    }

    const { concepto, valor, observacion, fecha } = req.body;

    try {
        const nuevoGastoFijo = await GastosFijos.create({
            concepto: concepto,
            valor: valor,
            observacion: observacion,
            fecha: fecha
        })
        res.status(200).json(nuevoGastoFijo)
    } catch (error) {
        res.status(404).json({msg: error.message})
    }
}

export const obtenerGastosFijos = async (req, res) => {
    try {
        const respuesta = await GastosFijos.findAll({
            attributes: ['UUID', 'concepto','valor','observacion','fecha']
        })
        res.status(200).json(respuesta)
    } catch (error) {
        res.status(404).json({msg: error.message})
    }
}


export const obtenerUnGastoFijo = async (req, res) => {
    const validarGasto = await GastosFijos.findOne({
        where: {
            UUID: req.params.id
        }
    })

    if(!validarGasto){
        return res.status(401).json({msg: "Codigo de gasto fijo no es valido"})
    }

    try {
        const respuesta = await GastosFijos.findOne({
            attributes: ['UUID','valor','concepto','observacion','fecha'],
            where: {
                UUID: req.params.id
            }
        })
        res.status(200).json(respuesta)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

export const modificarGastoFijo = async (req, res) => {
    const validarGasto = await GastosFijos.findOne({
        where: {
            UUID: req.params.id
        }
    })

    if(!validarGasto){
        return res.status(401).json({msg: "Codigo de gasto fijo no es valido"})
    }

    const { valor, concepto, observacion, fecha } = req.body;

    try {
        await GastosFijos.update({
            valor: valor,
            concepto: concepto,
            observacion: observacion,
            fecha: fecha
        }, {
            where: {
                id: validarGasto.id
            }
        })
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}


export const eliminarGastoFijo = async (req, res) => {
    const validarGasto = await GastosFijos.findOne({
        where: {
            UUID: req.params.id
        }
    })

    if(!validarGasto){
        return res.status(401).json({msg: "Codigo de gasto fijo no es valido"})
    }

    try {
        await GastosFijos.destroy({
            where: {
                id: validarGasto.id
            }
        })
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}