const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const auths = require('../middleware/auths');
const { check } = require('express-validator');

//crear una tarea
//api/tareas
router.post('/',
    auths,
    [
      check('nombre', 'El nombre es obligatorio').not().isEmpty(),
      check('proyecto', 'El proyecto es obligatorio').not().isEmpty() 
    ],
    tareaController.crearTarea
)

//obtener las tareas del proyecto
router.get('/',
    auths,
    tareaController.obtenerTareas
);

//actualizar las tareas del proyecto
router.put('/:id',
    auths,
    tareaController.actualizarTareas
);

module.exports = router;

//Eliminar las tareas del proyecto
router.delete('/:id',
    auths,
    tareaController.eliminarTareas
);

module.exports = router;