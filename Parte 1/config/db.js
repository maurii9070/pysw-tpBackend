import mongoose from 'mongoose'
const URI = 'mongodb://localhost/parte1'

export const db = async () => {
	try {
		const db = await mongoose.connect(URI)
		const url = `${db.connection.host}: ${db.connection.port}`
		console.log(`MongoDb se conecto correctamente: ${url}`)
	} catch (error) {
		console.log(`Error: ${error.message}`)
		process.exit(1)
	}
}
