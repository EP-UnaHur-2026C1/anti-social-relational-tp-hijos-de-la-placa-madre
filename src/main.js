const express = require('express');
const { sequelize } = require('./db/models')
const app = express();
const PORT = process.env.PORT || 3000;

const userRouter = require('./routers/router.user')
const postRouter = require('./routers/router.post')

app.use(express.json()); // Para parsear el cuerpo de las solicitudes como JSON

app.use(userRouter)
app.use(postRouter)

app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos verificada.');
        console.log(`Aplicación iniciada exitosamente en el puerto: ${PORT}`);
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
        process.exit(1);
    }
}).on('error', (err) => {
    console.error('Error al iniciar el servidor:', err.message);
    process.exit(1);
});