import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { master, token } from '../../services/passport'
import { schema } from './model'
export ProyectoRes, { schema } from './model'

const router = new Router()
const { nombre, imagen, curso, proyecto } = schema.tree

/**
 * @api {post} /ProyectoRes Create proyecto res
 * @apiName CreateProyectoRes
 * @apiGroup ProyectoRes
 * @apiParam nombre Proyecto res's nombre.
 * @apiParam imagen Proyecto res's imagen.
 * @apiParam curso Proyecto res's curso.
 * @apiParam proyecto Proyecto res's proyecto.
 * @apiSuccess {Object} proyectoRes Proyecto res's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Proyecto res not found.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ nombre, imagen, curso, proyecto }),
  create)

/**
 * @api {get} /ProyectoRes Retrieve proyecto res
 * @apiName RetrieveProyectoRes
 * @apiGroup ProyectoRes
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of proyecto res.
 * @apiSuccess {Object[]} rows List of proyecto res.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /ProyectoRes/:id Retrieve proyecto res
 * @apiName RetrieveProyectoRes
 * @apiGroup ProyectoRes
 * @apiSuccess {Object} proyectoRes Proyecto res's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Proyecto res not found.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /ProyectoRes/:id Update proyecto res
 * @apiName UpdateProyectoRes
 * @apiGroup ProyectoRes
 * @apiParam nombre Proyecto res's nombre.
 * @apiParam imagen Proyecto res's imagen.
 * @apiParam curso Proyecto res's curso.
 * @apiParam proyecto Proyecto res's proyecto.
 * @apiSuccess {Object} proyectoRes Proyecto res's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Proyecto res not found.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ nombre, imagen, curso, proyecto }),
  update)

/**
 * @api {delete} /ProyectoRes/:id Delete proyecto res
 * @apiName DeleteProyectoRes
 * @apiGroup ProyectoRes
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Proyecto res not found.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
