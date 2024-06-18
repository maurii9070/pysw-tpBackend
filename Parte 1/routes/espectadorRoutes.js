import express from 'express'
import {
	crearEspectador,
	obtenerEspectadores,
	obtenerEspectadorPorDni,
} from '../controllers/espectadorController.js'

const router = express.Router()

router.route('/').post(crearEspectador).get(obtenerEspectadores)
router.route('/:dni').get(obtenerEspectadorPorDni)

export default router
