import { success, notFound } from '../../services/response/'
import { ProyectoRes } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  ProyectoRes.create(body)
    .then((proyectoRes) => proyectoRes.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  ProyectoRes.count(query)
    .then(count => ProyectoRes.find(query, select, cursor)
      .then((proyectoRes) => ({
        count,
        rows: proyectoRes.map((proyectoRes) => proyectoRes.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  ProyectoRes.findById(params.id)
    .then(notFound(res))
    .then((proyectoRes) => proyectoRes ? proyectoRes.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  ProyectoRes.findById(params.id)
    .then(notFound(res))
    .then((proyectoRes) => proyectoRes ? Object.assign(proyectoRes, body).save() : null)
    .then((proyectoRes) => proyectoRes ? proyectoRes.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  ProyectoRes.findById(params.id)
    .then(notFound(res))
    .then((proyectoRes) => proyectoRes ? proyectoRes.remove() : null)
    .then(success(res, 204))
    .catch(next)
