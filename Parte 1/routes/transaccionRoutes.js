import express from 'express'
import {
	crearTransaccion,
	obtenerTransacciones,
	obtenerTransaccionesPorEmail,
	obtenerTransaccionesPorDivisa,
} from '../controllers/transaccionController.js'

const router = express.Router()

router.route('/').post(crearTransaccion).get(obtenerTransacciones)
router.route('/:email').get(obtenerTransaccionesPorEmail)
router.route('/divisa/:divisa').get(obtenerTransaccionesPorDivisa)

export default router
