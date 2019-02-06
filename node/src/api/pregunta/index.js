import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy, updateMany } from './controller'
import { schema } from './model'
export Pregunta, { schema }
from './model'

const router = new Router()
const { pregunta, respuestaA, respuestaB, respuestaC, nA, nB, nC } = schema.tree

/**
 * Intento de Interfaz
 */
// const Interface = require('es6-interface');
// const testInterface1 = new Set(['requiered(id, nA, nB, nC)']);

// class testClass extends Interface(testInterface1) {
//     constructor() {
//         super()
//     }

//     requiered(id, nA, nB, nC){

//     }

// }

// new testClass()

/**
 * @api {post} /preguntas Create pregunta
 * @apiName CreatePregunta
 * @apiGroup Pregunta
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam pregunta Pregunta's pregunta.
 * @apiParam respuestas Pregunta's respuestas.
 * @apiSuccess {Object} pregunta Pregunta's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Pregunta not found.
 * @apiError 401 admin access only.
 */
router.post('/',
    token({ required: true, roles: ['admin'] }),
    body({ pregunta, respuestaA, respuestaB, respuestaC }),
    create)

/**
 * @api {get} /preguntas Retrieve preguntas
 * @apiName RetrievePreguntas
 * @apiGroup Pregunta
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of preguntas.
 * @apiSuccess {Object[]} rows List of preguntas.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
    query(),
    index)

/**
 * @api {get} /preguntas/:id Retrieve pregunta
 * @apiName RetrievePregunta
 * @apiGroup Pregunta
 * @apiSuccess {Object} pregunta Pregunta's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Pregunta not found.
 */
router.get('/:id',
    show)

/**
 * @api {put} /preguntas/:id Update pregunta
 * @apiName UpdatePregunta
 * @apiGroup Pregunta
 * @apiParam pregunta Pregunta's pregunta.
 * @apiParam respuestas Pregunta's respuestas.
 * @apiSuccess {Object} pregunta Pregunta's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Pregunta not found.
 */
router.put('/:id',
    body({ nA, nB, nC }),
    update)

/**
 * @api {put} /illo Update preguntas
 * @apiName UpdatePreguntas
 * @apiGroup Pregunta
 * @apiParam pregunta Pregunta's pregunta.
 * @apiParam respuestas Pregunta's respuestas.
 * @apiSuccess {Object} pregunta Pregunta's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Pregunta not found.
 */
router.put('/',
    body({ nA, nB, nC }),
    updateMany)

/**
 * @api {delete} /preguntas/:id Delete pregunta
 * @apiName DeletePregunta
 * @apiGroup Pregunta
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Pregunta not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
    token({ required: true, roles: ['admin'] }),
    destroy)

export default router