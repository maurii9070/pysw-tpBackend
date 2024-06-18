import Espectador from '../models/Espectador.js'

const crearEspectador = async (req, res) => {
	const espectador = req.body

	try {
		const newEspectador = new Espectador(espectador)
		const espectadorDB = await newEspectador.save()
		res.json({ msg: 'Espectador creado con exito', espectador: espectadorDB })
	} catch (error) {
		console.log(error)
	}
}

const obtenerEspectadores = async (req, res) => {
	try {
		const espectadores = await Espectador.find()
		res.json(espectadores)
	} catch (error) {
		console.log(error)
	}
}

const obtenerEspectadorPorDni = async (req, res) => {
	const { dni } = req.params

	try {
		const espectador = await Espectador.findOne({ dni })
		res.json(espectador)
	} catch (error) {
		console.log(error)
	}
}

export { crearEspectador, obtenerEspectadores, obtenerEspectadorPorDni }
