const axios = require('axios');

// Función para consumir la API y obtener los alumnos
async function obtenerAlumnos() {
  try {
    const response = await axios.get('http://localhost:3000/alumnos'); // Puerto 3000
    console.log('Lista de alumnos:', response.data); // Verifica qué datos estás recibiendo
  } catch (error) {
    console.error('Error al obtener alumnos:', error.message);
  }
}

// Ejecutar función
obtenerAlumnos();
