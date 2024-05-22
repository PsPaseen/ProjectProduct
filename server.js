import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sql from "mssql";
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

  app.get('/test',(req,res)=>{

    sql.connect(config) 
    .then(pool=>{
        return pool.request()
        .query('SELECT * FROM "User" ');

    })
    .then(result =>{
        res.json(result.recordset) ;
    })
  }
)

app.get('/image', (req, res) => {
  const filename = "test01.jpg";
  const filePath = path.join(__dirname, './upload/', filename);

  fs.readFile(filePath, { encoding: 'base64' }, (err, data) => {
      if (err) {
          const filePath = path.join(__dirname, './uploads/default.png');
          fs.readFile(filePath, { encoding: 'base64' }, (err, data) => {
              const base64Data = `data:image/jpeg;base64,${data}`;
              res.send(base64Data);
          });
      } else {
          //res.send(data);
          const base64Data = `data:image/jpeg;base64,${data}`;
          res.send(base64Data);
      }
  });
});

const PORT = 80;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});