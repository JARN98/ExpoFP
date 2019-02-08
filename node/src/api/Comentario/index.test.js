import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Comentario } from '.'

const app = () => express(apiRoot, routes)

let comentario

beforeEach(async () => {
  comentario = await Comentario.create({})
})

test('POST /Comentarios 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ autor: 'test', contenido: 'test', valoracion: 'test', valido: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.autor).toEqual('test')
  expect(body.contenido).toEqual('test')
  expect(body.valoracion).toEqual('test')
  expect(body.valido).toEqual('test')
})

test('GET /Comentarios 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /Comentarios/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${comentario.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(comentario.id)
})

test('GET /Comentarios/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /Comentarios/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${comentario.id}`)
    .send({ autor: 'test', contenido: 'test', valoracion: 'test', valido: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(comentario.id)
  expect(body.autor).toEqual('test')
  expect(body.contenido).toEqual('test')
  expect(body.valoracion).toEqual('test')
  expect(body.valido).toEqual('test')
})

test('PUT /Comentarios/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ autor: 'test', contenido: 'test', valoracion: 'test', valido: 'test' })
  expect(status).toBe(404)
})

test('DELETE /Comentarios/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${comentario.id}`)
  expect(status).toBe(204)
})

test('DELETE /Comentarios/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
