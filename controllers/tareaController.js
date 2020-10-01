const Tarea = require('../Models/Tarea');
const Proyecto = require('../Models/Proyecto');
const { validationResult } = require('express-validator');


//crea una nueva tarea
exports.crearTarea = async (req,res) => {

    //revisar si hay errores
    const errors = validationResult(req);
    if(!errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {

        //extraer el proyecto y comprobar si existe
        const { proyecto } = req.body;
        
        
        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }

        //Revisar si el proyecto actual pertecene al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg:'No Autorizado' });
        }

        //creamos la tarea
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({ tarea });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//obtiene las tareas por proyecto
exports.obtenerTareas = async (req ,res) => {

    try {
        
        //extraer el proyecto y comprobar si existe
        const { proyecto } = req.query;

        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }

        //Revisar si el proyecto actual pertecene al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg:'No Autorizado' });
        }

        //obtener las tareas por proyecto
        const tareas = await Tarea.find({ proyecto });
        res.json({ tareas });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.actualizarTareas = async (req,res) => {
    
    try {
        
         //extraer el proyecto y comprobar si existe
         const { proyecto, nombre, estado } = req.body;

          //revisar si la tarea existe
          let tarea = await Tarea.findById(req.params.id);
          
          if(!tarea) {
            return res.status(404).json({ msg:'No existe la Tarea' });
        }


         const existeProyecto = await Proyecto.findById(proyecto);
 
         //Revisar si el proyecto actual pertecene al usuario autenticado
         if(existeProyecto.creador.toString() !== req.usuario.id) {
             return res.status(401).json({ msg:'No Autorizado' });
         }

         // crear un objeto con la nueva informacion
         const nuevaTarea = {};

         nuevaTarea.nombre = nombre;
         nuevaTarea.estado = estado;
         
         //guardar la tarea
         tarea = await Tarea.findByIdAndUpdate({ _id: req.params.id }, nuevaTarea, { new: true});

         res.json({ tarea });



    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.eliminarTareas = async (req,res) => {

    try {
        
        //extraer el proyecto y comprobar si existe
        const { proyecto } = req.query;

         //revisar si la tarea existe
         let tareaExiste = await Tarea.findById(req.params.id);
         
         if(!tareaExiste) {
           return res.status(404).json({ msg:'No existe la Tarea' });
       }


        const existeProyecto = await Proyecto.findById(proyecto);

         //Revisar si el proyecto actual pertecene al usuario autenticado
         if(existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg:'No Autorizado' });
        }
       
        
        //Eliminar
        await Tarea.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Tarea Eliminada' });

   } catch (error) {
       console.log(error);
       res.status(500).send('Hubo un error');
   }     
  
}