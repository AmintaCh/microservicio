const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

// Cargar las variables de entorno
dotenv.config();

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Ruta GET para obtener los estudiantes
app.get('/estudiantes', (req, res) => {
  db.query('SELECT * FROM alumnos', (err, results) => {
    if (err) {
      console.error('Error al obtener los alumnos:', err);
      return res.status(500).json({ error: 'Error al obtener los alumnos err' });
    }
    res.status(200).json(results);
  });
});


// Ruta POST para agregar un estudiante
app.post('/estudiantes', (req, res) => {
  const { codigo_carrera, anio_inicio, codigo_estudiante, nombre1, nombre2, apellido1, apellido2, telefono, correoElectronico, fechaNacimiento } = req.body;

  db.query(`INSERT INTO alumnos 
    (codigo_carrera, anio_inicio, codigo_estudiante, nombre1, nombre2, apellido1, apellido2, telefono, correoElectronico, fechaNacimiento) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [codigo_carrera, anio_inicio, codigo_estudiante, nombre1, nombre2, apellido1, apellido2, telefono, correoElectronico, fechaNacimiento], (err, result) => {
    if (err) {
      console.error('Error al agregar alumno:', err);
      return res.status(500).json({ error: 'Error al agregar alumno' });
    }
    res.status(201).json({ message: 'Alumno agregado exitosamente' });
  });
});


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
