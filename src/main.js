const express = require('express');
const { sequelize } = require('./db/models')
const {} = require('./routers')
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Para parsear el cuerpo de las solicitudes como JSON

app.listen(PORT, async (err) => {
    
    if(err) {
        console.log(err);
        process.exit(1);
    }
    await sequelize.sync({});
    console.log(`App inicia en el puerto ${PORT}`);
});