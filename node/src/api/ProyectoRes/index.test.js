import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { ProyectoRes } from '.'

const app = () => express(apiRoot, routes)

let proyectoRes

beforeEach(async () => {
  proyectoRes = await ProyectoRes.create({})
})

test('POST /ProyectoRes 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ nombre: 'test', imagen: 'test', curso: 'test', proyecto: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.nombre).toEqual('test')
  expect(body.imagen).toEqual('test')
  expect(body.curso).toEqual('test')
  expect(body.proyecto).toEqual('test')
})

test('GET /ProyectoRes 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /ProyectoRes/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${proyectoRes.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(proyectoRes.id)
})

test('GET /ProyectoRes/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /ProyectoRes/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${proyectoRes.id}`)
    .send({ nombre: 'test', imagen: 'test', curso: 'test', proyecto: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(proyectoRes.id)
  expect(body.nombre).toEqual('test')
  expect(body.imagen).toEqual('test')
  expect(body.curso).toEqual('test')
  expect(body.proyecto).toEqual('test')
})

test('PUT /ProyectoRes/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ nombre: 'test', imagen: 'test', curso: 'test', proyecto: 'test' })
  expect(status).toBe(404)
})

test('DELETE /ProyectoRes/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${proyectoRes.id}`)
  expect(status).toBe(204)
})

test('DELETE /ProyectoRes/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
