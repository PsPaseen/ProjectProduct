import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sql from "mssql";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const config = {
  server: 'database-1.cfk6quekolwy.us-east-1.rds.amazonaws.com',
  database: 'cs367',
  user: 'admin',
  password: '123456789',
  encrypt: false,
  trustServerCertificate: false,
};

async function testConnection() {
    try {
      await sql.connect(config);
      console.log('Connected to the database successfully!');
    } catch (error) {
      console.error('Error connecting to the database:', error.message);
    } finally {
      await sql.close();
    }
  }
  testConnection();