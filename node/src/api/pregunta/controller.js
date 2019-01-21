import { success, notFound } from '../../services/response/'
import { Pregunta } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Pregunta.create(body)
    .then((pregunta) => pregunta.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Pregunta.count(query)
    .then(count => Pregunta.find(query, select, cursor)
      .then((preguntas) => ({
        count,
        rows: preguntas.map((pregunta) => pregunta.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Pregunta.findById(params.id)
    .then(notFound(res))
    .then((pregunta) => pregunta ? pregunta.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Pregunta.findById(params.id)
    .then(notFound(res))
    .then((pregunta) => pregunta ? Object.assign(pregunta, body).save() : null)
    .then((pregunta) => pregunta ? pregunta.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Pregunta.findById(params.id)
    .then(notFound(res))
    .then((pregunta) => pregunta ? pregunta.remove() : null)
    .then(success(res, 204))
    .catch(next)
