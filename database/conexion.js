const mysql = require('mysql2');

// const pool = mysql.createPool(
//     {
//         host : process.env.LOCAL_HOST,
//         user : process.env.LOCAL_USER,
//         database : process.env.LOCAL_DATABASE,
//         port : process.env.LOCAL_PORT,
//         connectTimeout: 5000,
//     }
// )

const pool = mysql.createPool(
    {

        host : process.env.HOST,
        user : process.env.USER,
        database : process.env.DATABASE,
        password : process.env.PASSWORD,
        connectTimeout: 5000,
        
    }
)

pool.on('connection', (connection) => {
    console.log('Nueva conexión establecida');

});

pool.on('enqueue', () => {
    console.log('Esperando para obtener una conexión');
});

pool.on('release', (connection) => {
    console.log('Conexión liberada');
});

// Manejo de eventos para errores
pool.on('error', (err) => {
    console.error('Error en el pool de conexiones:', err);
});

module.exports = pool;