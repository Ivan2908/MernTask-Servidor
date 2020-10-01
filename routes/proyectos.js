const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auths = require('../middleware/auths');
const { check } = require('express-validator');

//crea proyectos
//api/proyectos
router.post('/',
    auths,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto
);

//obtener todos los proyectos
router.get('/',
    auths,
    proyectoController.obtenerProyectos
);

//actualizar el nombre del proyecto
router.put('/:id',
    auths,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.actualizarProyecto
);

//eliminar un proyecto
router.delete('/:id',
    auths,
    proyectoController.eliminarProyecto
);

module.exports =  router;
