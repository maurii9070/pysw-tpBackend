import mongoose from 'mongoose'
import Transaccion from '../models/Transaccion.js'

const crearTransaccion = async (req, res) => {
	const transaccion = req.body
	// Extraer la cantidadOrigen y tasaConversion del objeto transaccion
	const { cantidadOrigen, tasaConversion } = transaccion
	// Calcular la cantidadDestino
	transaccion.cantidadDestino = cantidadOrigen * tasaConversion

	try {
		const newTransaccion = new Transaccion(transaccion)
		const transaccionDB = await newTransaccion.save()
		res.json({ msg: 'Transaccion creada con exito', transaccion: transaccionDB })
	} catch (error) {
		console.log(error)
	}
}

const obtenerTransacciones = async (req, res) => {
	try {
		const transacciones = await Transaccion.find()
		res.json(transacciones)
	} catch (error) {
		console.log(error)
	}
}

const obtenerTransaccionesPorEmail = async (req, res) => {
	const { email } = req.params
	try {
		const transacciones = await Transaccion.find({ emailCliente: email })
		res.json(transacciones)
	} catch (error) {
		console.log(error)
	}
}

const obtenerTransaccionesPorDivisa = async (req, res) => {
	const { divisa } = req.params
	try {
		const transaccionesOrigen = await Transaccion.find({ monedaOrigen: divisa })
		const transaccionesDestino = await Transaccion.find({ monedaDestino: divisa })
		const transacciones = transaccionesOrigen.concat(transaccionesDestino)
		res.json(transacciones)
	} catch (error) {
		console.log(error)
	}
}

export { crearTransaccion, obtenerTransacciones, obtenerTransaccionesPorEmail, obtenerTransaccionesPorDivisa }
