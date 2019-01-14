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
