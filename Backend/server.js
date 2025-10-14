const app = require('./src/app');
const dotenv = require('dotenv');
const connectDB = require('./src/database/db')

dotenv.config();

connectDB();

app.listen(3000, ()=>{
    console.log("server is runging on ports 3000")
});