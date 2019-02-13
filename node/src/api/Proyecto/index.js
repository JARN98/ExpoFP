import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy, updatePhoto, destroyUltimoComentarioAdmin } from './controller'
import { schema } from './model'
export Proyecto, { schema } from './model'
const fileUpload = require('express-fileupload');

const router = new Router()
const { nombre, descripcion, curso, imagenes, autores, valoracionMedia, comentarios, imagenesDetalladas } = schema.tree

/**
 * @api {post} /Proyectos Create proyecto
 * @apiName CreateProyecto
 * @apiGroup Proyecto
 * @apiParam nombre Proyecto's nombre.
 * @apiParam descripcion Proyecto's descripcion.
 * @apiParam curso Proyecto's curso.
 * @apiParam imagenes Proyecto's imagenes.
 * @apiParam autores Proyecto's autores.
 * @apiParam valoracionMedia Proyecto's valoracionMedia.
 * @apiParam comentarios Proyecto's comentarios.
 * @apiSuccess {Object} proyecto Proyecto's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Proyecto not found.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ nombre, descripcion, curso, imagenes, autores, valoracionMedia, comentarios, imagenesDetalladas }),
  create)

/**
 * @api {get} /Proyectos Retrieve proyectos
 * @apiName RetrieveProyectos
 * @apiGroup Proyecto
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of proyectos.
 * @apiSuccess {Object[]} rows List of proyectos.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /Proyectos/:id Retrieve proyecto
 * @apiName RetrieveProyecto
 * @apiGroup Proyecto
 * @apiSuccess {Object} proyecto Proyecto's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Proyecto not found.
 */
router.get('/:id',

  show)

/**
 * @api {put} /Proyectos/:id Update proyecto
 * @apiName UpdateProyecto
 * @apiGroup Proyecto
 * @apiParam nombre Proyecto's nombre.
 * @apiParam descripcion Proyecto's descripcion.
 * @apiParam curso Proyecto's curso.
 * @apiParam imagenes Proyecto's imagenes.
 * @apiParam autores Proyecto's autores.
 * @apiParam valoracionMedia Proyecto's valoracionMedia.
 * @apiParam comentarios Proyecto's comentarios.
 * @apiSuccess {Object} proyecto Proyecto's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Proyecto not found.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ nombre, descripcion, curso, autores, imagenes }),
  update)


router.put('/imagenes/:id',
  token({ required: true, roles: ['admin'] }),
  body({ imagenesDetalladas }),
  update)

/**
 * @api {delete} /Proyectos/:id Delete proyecto
 * @apiName DeleteProyecto
 * @apiGroup Proyecto
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Proyecto not found.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)


router.delete('/:autor/:contenido',
  token({ required: true }),
  destroyUltimoComentarioAdmin)


export default router
