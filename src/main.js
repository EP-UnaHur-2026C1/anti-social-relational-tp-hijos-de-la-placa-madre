const express = require('express');
const { sequelize } = require('./db/models')
const app = express();
const PORT = process.env.PORT || 3000;

const userRouter = require('./routers/router.user')

app.use(express.json()); // Para parsear el cuerpo de las solicitudes como JSON

app.use(userRouter)

app.listen(PORT, async (err) => {
    
    if(err) {
        console.log(err);
        process.exit(1);
    }
    await sequelize.sync({});
    console.log(`App inicia en el puerto ${PORT}`);
});