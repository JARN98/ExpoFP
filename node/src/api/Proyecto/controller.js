import { success, notFound } from '../../services/response/'
import { Proyecto } from '.'
import { ProyectoRes } from '../ProyectoRes'

  const store = require('store')

export const create = async ({ bodymen: { body } }, res, next) => {
  const crearProyecto = await Proyecto.create(body)
    .then((proyecto) => {
      store.set('idProyecto', proyecto.view(true).id)
      return proyecto.view(true)
    })
    .then(success(res, 201))
    .catch(next)

  const CrearProyectoRes = await ProyectoRes.create({
    nombre: body.nombre,
    curso: body.curso,
    imagen: body.imagenes,
    proyecto: store.get('idProyecto')
  })
    .then(proyectoRes => proyectoRes.view(true))
    .then(success(res, 201))
    .catch(next)
}
export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Proyecto.count(query)
    .then(count => Proyecto.find(query, select, cursor)
      .then((proyectos) => ({
        count,
        rows: proyectos.map((proyecto) => proyecto.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Proyecto.findById(params.id)
    .then(notFound(res))
    .then((proyecto) => proyecto ? proyecto.view() : null)
    .then(success(res))
    .catch(next)

export const updatePhoto = ({ bodymen: { body }, params }, res, next) =>
  Proyecto.findById(params.id)
    .then(notFound(res))
    .then((proyecto) => {


      // var tipo = req.params.tipo;
      var id = params.id;

      // // tipos de colección
      // var tiposValidos = ['hospitales', 'medicos', 'usuarios'];
      // if (tiposValidos.indexOf(tipo) < 0) {
      //     return res.status(400).json({
      //         ok: false,
      //         mensaje: 'Tipo de colección no es válida',
      //         errors: { message: 'Tipo de colección no es válida' }
      //     });
      // }


      if (!bodymen.files) {
        return res.status(400).json({
          ok: false,
          mensaje: 'No selecciono nada',
          errors: { message: 'Debe de seleccionar una imagen' }
        });
      }

      // Obtener nombre del archivo
      var archivo = bodymen.files.imagenes;
      var nombreCortado = archivo.name.split('.');
      var extensionArchivo = nombreCortado[nombreCortado.length - 1];

      // Sólo estas extensiones aceptamos
      var extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

      if (extensionesValidas.indexOf(extensionArchivo) < 0) {
        return res.status(400).json({
          ok: false,
          mensaje: 'Extension no válida',
          errors: { message: 'Las extensiones válidas son ' + extensionesValidas.join(', ') }
        });
      }

      // Nombre de archivo personalizado
      // 12312312312-123.png
      var nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extensionArchivo}`;


      // Mover el archivo del temporal a un path
      var path = `../../uploads/PrincipalProyecto/${nombreArchivo}`;

      archivo.mv(path, err => {

        if (err) {
          return res.status(500).json({
            ok: false,
            mensaje: 'Error al mover archivo',
            errors: err
          });
        }


        archivo.mv(path, function (err) {
          if (err)
            return res.status(500).send(err);

          res.send('Archivo subido con éxito!');
        });


      })

      return proyecto ? Object.assign(proyecto, body).save() : null
    })
    .then((proyecto) => proyecto ? proyecto.view(true) : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Proyecto.findById(params.id)
    .then(notFound(res))
    .then((proyecto) => proyecto ? Object.assign(proyecto, body).save() : null)
    .then((proyecto) => proyecto ? proyecto.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Proyecto.findById(params.id)
    .then(notFound(res))
    .then((proyecto) => proyecto ? proyecto.remove() : null)
    .then(success(res, 204))
    .catch(next)
