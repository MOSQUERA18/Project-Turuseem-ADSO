import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload'
// import expressSession from 'express-session';

import db from './database/db.js';
import apprenticeRoutes from './routes/ApprenticeRoutes.js'
import memorandumRoutes from './routes/memorandumRoutes.js'
import userRouter from './routes/UserRoutes.js'
import programaRoutes from './routes/programaRoutes.js'

const app = express();
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(express.json())
app.use(fileUpload())
app.use('/api/user', userRouter)
app.use('/aprendiz', apprenticeRoutes)
app.use('/memorando', memorandumRoutes)
app.use('/programa', programaRoutes)

try {
    await db.authenticate()
    console.log('Conexion a la db exitosa');
} catch (error) {
    console.log(`Error de conexion a la bd ${error}`);
}
app.listen(PORT, () => {
    console.log('Server running on port 8000');
})