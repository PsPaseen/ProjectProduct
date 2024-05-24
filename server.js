import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sql from "mssql";
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken' ;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const JWT_SECRET = 'your_jwt_secret'; // Replace with your own secret
const JWT_EXPIRATION = '1h'; // Token expiration time

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

app.post('/register', async (req, res) => {
  const { Username, Password } = req.body;

  if (!Username || !Password ) {
    return res.status(400).send('Username and password are required.');
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Connect to the database
    const pool = await sql.connect(config);

    // Insert user data using parameterized query
    await pool.request()
      .input('Username', sql.NVarChar, Username)
      .input('hashedPassword', sql.NVarChar, hashedPassword)
      .query(`
        INSERT INTO "User" (Username, Password)
        VALUES (@username, @hashedPassword)
      `);

    res.send('User registered successfully!');
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).send('Internal server error. Failed to register user.');
  } finally {
    sql.close();
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ message: 'Username and password are required.' });
  }

  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('username', sql.NVarChar, username)
      .query('SELECT * FROM "User" WHERE Username = @username');

    if (result.recordset.length === 0) {
      return res.status(400).send({ message: 'Invalid username or password.' });
    }

    const user = result.recordset[0];
    const passwordMatch = await bcrypt.compare(password, user.Password);

    if (!passwordMatch) {
      return res.status(400).send({ message: 'Invalid username or password.' });
    }

    const token = jwt.sign({ userID: user.UserID, username: user.Username }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

    // Set the token as a cookie or send it in the response body
    res.cookie('token', token, { httpOnly: true });
    res.send({ message: 'Login successful!', userID: user.UserID , username: user.Username, token }); // ส่งชื่อผู้ใช้และ token กลับไปยัง client
  } catch (error) {
    console.error('Error logging in user:', error.message);
    res.status(500).send({ message: 'Internal server error. Failed to log in.' });
  } finally {
    sql.close();
  }
});

app.get('/product', (req, res) => {
  sql.connect(config)
    .then(pool => {
      return pool.request().query('SELECT * FROM RProduct');
    })
    .then(result => {
      res.json(result.recordset);
    })
    .catch(err => {
      console.error('Error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.get('/test', (req, res) => {

  sql.connect(config)
    .then(pool => {
      return pool.request()
        .query('SELECT * FROM "User" ');

    })
    .then(result => {
      res.json(result.recordset);
    })
}
)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload/');
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const randomValue = Math.random().toString();
    const hash = crypto.createHash('sha256').update(timestamp + randomValue).digest('hex');
    const newFileName = `${hash}.png`; // Attach ".png"
    cb(null, newFileName);
  }
})

const upload = multer({ storage: storage });

app.post('/uploadproduct', upload.single('picture'), async (req, res) => {

  const { Productname, Stock, Productdetail, Productprice } = req.body;

  const Pathpic = req.file ? req.file.path : null;

  console.log('Received form data:', { Productname, Stock, Productdetail, Productprice });
  console.log('Received picture:', Pathpic);

  try {
    const pool = await sql.connect(config);

    const inputdata = await pool.request()
      .input('Productname', sql.NVarChar, Productname)
      .input('Stock', sql.Int, Stock)
      .input('Productdetail', sql.NVarChar, Productdetail)
      .input('Productprice', sql.Money, Productprice)
      .input('Pathpic', sql.NVarChar, Pathpic)
      .query(`
    INSERT INTO RProduct (ProductName,Stock,Productdetail,Productprice,Pathpic)
    VALUES (@Productname,@Stock,@Productdetail,@Productprice,@Pathpic)
    `)

    console.log('Rows affected:', inputdata.rowsAffected);

    await pool.close();

    res.send('Form data received and inserted into the database successfully!');
  } catch (error) {
    console.error('Error inserting data into the database:', error.message);
  }
})

app.get('/image/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, './upload/', filename);

  fs.readFile(filePath, { encoding: 'base64' }, (err, data) => {
    if (err) {
      const filePath = path.join(__dirname, './upload/default.png');
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