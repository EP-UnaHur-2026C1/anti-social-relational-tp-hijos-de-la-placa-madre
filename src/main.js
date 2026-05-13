const express = require('express');
const { sequelize } = require('./db/models')
const app = express();
const PORT = process.env.PORT || 3000;

const userRouter = require('./routers/router.user')

app.use(express.json()); // Para parsear el cuerpo de las solicitudes como JSON

app.use(userRouter)

app.listen(PORT, (err) => {
    // Si ocurre un error al intentar levantar el servidor
    if (err) {
        console.error("Error al iniciar el servidor:", err.message);
        process.exit(1); // Finaliza el proceso de Node con un código de error
    }

    /**
     * sequelize.sync({ force: true })
     * Sincroniza los modelos con la base de datos.
     * ATENCIÓN: { force: true } elimina las tablas existentes y las recrea. 
     * Úsalo solo en etapa de desarrollo.
     */
    sequelize.sync({ force: false })
        .then(() => {
            console.log('Base de datos sincronizada correctamente.');
            console.log(`Aplicación iniciada exitosamente en el puerto: ${PORT}`);
        })
        .catch((error) => {
            console.error('Error al sincronizar la base de datos:', error);
        });
});