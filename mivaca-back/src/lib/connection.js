import pg from "pg";
import "dotenv/config"; 
const { Pool } = pg; 

const pool = new Pool({ 
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: 'mi-vaquita',
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});


