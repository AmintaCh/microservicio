const express = require('express');
const router = express.Router();

router.get('/registro_alumnos', (req, res) => {
  res.render('registro_alumnos'); 
});

module.exports = router;
