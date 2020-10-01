const Proyecto = require('../Models/Proyecto');
const { validationResult } = require('express-validator');

exports.crearProyecto = async (req,res) => {

    //revisar si hay errores
    const errors = validationResult(req);
    if(!errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array() })
    }
    
   
    try {
        //crear un nuevo poryecto
        const proyecto = new Proyecto(req.body);

        //guardar el Creador via jwt
        proyecto.creador = req.usuario.id

        //guardamos el proyecto
        proyecto.save();
        res.json(proyecto);


    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error');
    }
}

//obtiene todos los proyectos del usuario actual
exports.obtenerProyectos = async (req, res) => {
    try {
        const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({ creado: -1});
        res.json({ proyectos });

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: 'Hubo un error' });
    }
}

//actualizar un proyecto
exports.actualizarProyecto = async (req,res) => {

     //revisar si hay errores
     const errors = validationResult(req);
     if(!errors.isEmpty() ) {
         return res.status(400).json({ errors: errors.array() })
     }

     //extraer la informacion del proyecto
     const { nombre } = req.body;
     const nuevoProyecto = {};
     
     if(nombre) {
         
        nuevoProyecto.nombre = nombre;
    }


    try {
        //Revisar el ID
        let proyecto = await Proyecto.findById(req.params.id);

        //Si el rpoyecto existe o no
        if(!proyecto) {
        return res.status(404).json({ msg: 'Proyecto no encontrado' })
        }

        //verigicar el creador del proyecto
        if(proyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg:'No Autorizado' });
        }

        //actualizar
        proyecto = await Proyecto.findByIdAndUpdate({_id: req.params.id},  {$set: nuevoProyecto},{new: true});

        res.json({proyecto});

        
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
};

//Eliminar un proyecto por su id
exports.eliminarProyecto = async (req,res) => {
    try {
         //Revisar el ID
         let proyecto = await Proyecto.findById(req.params.id);

         //Si el rpoyecto existe o no
         if(!proyecto) {
         return res.status(404).json({ msg: 'Proyecto no encontrado' })
         }
 
         //verigicar el creador del proyecto
         if(proyecto.creador.toString() !== req.usuario.id) {
             return res.status(401).json({ msg:'No Autorizado' });
         }

         //Eliminar proyecto
         await Proyecto.findOneAndRemove({ _id: req.params.id });
         res.json({ msg: 'Proyecto Eliminado' })
 
        
         res.json({proyecto});
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}
