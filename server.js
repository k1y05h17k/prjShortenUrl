const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');

dotenv.config({ path: './config.env'});
const app = require('./app');

// Configuration of Sequelize with base in the environments variables
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD,{
    host: process.env.DB_HOST, 
    port: process.env.DB_PORT,
    dialect: 'postgres',
});

// Test the connection with database
sequelize.authenticate().then(()=>{
    console.log('DB connection successful!');
}).catch((err)=> console.error('Failed to connect PostgresDB', err))


// Start connection in the LocalHost!
const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
