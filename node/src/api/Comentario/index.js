import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy, destroyUser } from './controller'
import { master, token } from '../../services/passport'
import { schema } from './model'
export Comentario, { schema }
from './model'

const router = new Router()
const { autor, contenido, valoracion, valido, proyecto } = schema.tree


/**
 * @api {post} /Comentarios Create comentario
 * @apiName CreateComentario
 * @apiGroup Comentario
 * @apiParam autor Comentario's autor.
 * @apiParam contenido Comentario's contenido.
 * @apiParam valoracion Comentario's valoracion.
 * @apiParam valido Comentario's valido.
 * @apiSuccess {Object} comentario Comentario's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Comentario not found.
 */
router.post('/',
    token({ required: true }),
    body({ autor, contenido, valoracion, valido, proyecto }),
    create)

/**
 * @api {get} /Comentarios Retrieve comentarios
 * @apiName RetrieveComentarios
 * @apiGroup Comentario
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of comentarios.
 * @apiSuccess {Object[]} rows List of comentarios.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
    token({ required: true }),
    query(),
    index)

/**
 * @api {get} /Comentarios/:id Retrieve comentario
 * @apiName RetrieveComentario
 * @apiGroup Comentario
 * @apiSuccess {Object} comentario Comentario's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Comentario not found.
 */
router.get('/:idProyecto',
    token({ required: true }),
    show)

/**
 * @api {delete} /Comentarios/:id Delete comentario
 * @apiName DeleteComentario
 * @apiGroup Comentario
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Comentario not found.
 */
router.delete('/:id',
    token({ required: true, roles: ['admin'] }),
    destroy)

router.delete('/:autor/:id',
    token({ required: true }),
    destroyUser)





export default router