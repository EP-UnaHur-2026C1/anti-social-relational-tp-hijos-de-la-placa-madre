require('dotenv').config(); // <-- Esto le permite leer las variables de tu .env

module.exports = {
  development: {
    
    dialect: process.env.DB_DIALECT || 'sqlite',
    storage: process.env.DB_STORAGE || './src/db/data/dev.sqlite',
    
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || 'UnaHur_Anti-Social_Net',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT,
    
    logging: false // Desactiva los logs de Sequelize en la consola
  },
  test: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME_TEST || 'database_test',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME_PROD || 'database_production',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql'
  }
};
