import express from 'express'
import cors from 'cors'
import { db } from './config/db.js'
import productoRoutes from './routes/productoRoutes.js'
import transaccionRoutes from './routes/transaccionRoutes.js'
import espectadorRoutes from './routes/espectadorRoutes.js'
import ticketRoutes from './routes/ticketRoutes.js'

const app = express()

// Leer datos via Body
app.use(express.json())

// conectar la bd
db()

// Middleware
app.use(cors({ origin: 'http://localhost:4200' }))

// Rutas
app.use('/api/productos', productoRoutes)
app.use('/api/transacciones', transaccionRoutes)
app.use('/api/espectador', espectadorRoutes)
app.use('/api/ticket', ticketRoutes)

//settings
app.set('port', process.env.PORT || 4000)

// starting the server
app.listen(app.get('port'), () => {
	console.log(`server on port ${app.get('port')}`)
})
