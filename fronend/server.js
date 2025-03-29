require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3001;


const apiUrl = 'http://localhost:3000/estudiantes'; 

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));


app.engine('hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');

// Rutas
const alumnosRoutes = require('./routes/alumnos');
app.use('/alumnos', alumnosRoutes); 


app.get('/', async (req, res) => {
  try {
    const response = await axios.get(apiUrl);
    res.render('alumnos', { alumnos: response.data });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener los estudiantes');
  }
});


app.post('/add', async (req, res) => {
  const { codigo_carrera, anio_inicio, codigo_estudiante, nombre1, nombre2, apellido1, apellido2, telefono, correoElectronico, fechaNacimiento } = req.body;

  try {

    await axios.post(apiUrl, {
      codigo_carrera,
      anio_inicio,
      codigo_estudiante,
      nombre1,
      nombre2,
      apellido1,
      apellido2,
      telefono,
      correoElectronico,
      fechaNacimiento
    });
    res.redirect('/alumnos');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al agregar el estudiante');
  }
});

// Ruta para eliminar un estudiante
app.post('/alumnos/delete/:codigo_carrera/:anio_inicio/:codigo_estudiante', async (req, res) => {
  const { codigo_carrera, anio_inicio, codigo_estudiante } = req.params;

  try {
    // Hacer una solicitud DELETE a la API para eliminar el estudiante
    await axios.delete(`${apiUrl}/${codigo_carrera}/${anio_inicio}/${codigo_estudiante}`);
    res.redirect('/alumnos');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al eliminar el estudiante');
  }
});

// Ruta para editar un estudiante
app.get('/alumnos/edit/:codigo_estudiante', async (req, res) => {
  const { codigo_estudiante } = req.params;

  try {
    // Hacer una solicitud GET a la API para obtener los datos del estudiante
    const response = await axios.get(`${apiUrl}/${codigo_estudiante}`);
    const alumno = response.data;
    res.render('edit', { alumno });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener los datos del estudiante');
  }
});

app.post('/edit/:codigo_estudiante', async (req, res) => {
  const { codigo_estudiante } = req.params;
  const { nombre1, nombre2, apellido1, apellido2, telefono, correoElectronico, fechaNacimiento } = req.body;

  try {
    // Hacer una solicitud PUT a la API para actualizar los datos del estudiante
    await axios.put(`${apiUrl}/${codigo_estudiante}`, {
      nombre1,
      nombre2,
      apellido1,
      apellido2,
      telefono,
      correoElectronico,
      fechaNacimiento
    });
    res.redirect('/alumnos');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al actualizar el estudiante');
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
