import { success, notFound } from '../../services/response/'
import { Comentario } from '.'
import { Proyecto } from '../Proyecto'

const store = require('store')

export const create = async ({ bodymen: { body } }, res, next) => {
  await Comentario.create(body)
    .then((comentario) => {
      store.set('idProyectoComentario', comentario.view(true).proyecto)
      store.set('comentario', comentario)

      return comentario.view(true)
    })
    .then(success(res, 201))
    .catch(next)

  console.log(store.get('comentario'))

  await Proyecto.findById(store.get('idProyectoComentario'))
    .then(notFound(res))
    .then((proyecto) => {
      if (proyecto) {
        console.log(proyecto)

        if (proyecto.ultimosComentarios.length >= 5) {
          delete proyecto.ultimosComentarios.shift()
        }

        proyecto.ultimosComentarios.push(store.get('comentario'))

        proyecto.save()
      } else {
        return null
      }
    })
    .then(success(res))
    .catch(next)
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Comentario.count(query)
    .then(count => Comentario.find(query, select, cursor)
      .then((comentarios) => ({
        count,
        rows: comentarios.map((comentario) => comentario.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Comentario.findById(params.id)
    .then(notFound(res))
    .then((comentario) => comentario ? comentario.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Comentario.findById(params.id)
    .then(notFound(res))
    .then((comentario) => comentario ? Object.assign(comentario, body).save() : null)
    .then((comentario) => comentario ? comentario.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Comentario.findById(params.id)
    .then(notFound(res))
    .then((comentario) => comentario ? comentario.remove() : null)
    .then(success(res, 204))
    .catch(next)
