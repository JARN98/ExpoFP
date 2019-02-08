import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Proyecto } from '.'

const app = () => express(apiRoot, routes)

let proyecto

beforeEach(async () => {
  proyecto = await Proyecto.create({})
})

test('POST /Proyectos 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ nombre: 'test', descripcion: 'test', curso: 'test', imagenes: 'test', autores: 'test', valoracionMedia: 'test', comentarios: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.nombre).toEqual('test')
  expect(body.descripcion).toEqual('test')
  expect(body.curso).toEqual('test')
  expect(body.imagenes).toEqual('test')
  expect(body.autores).toEqual('test')
  expect(body.valoracionMedia).toEqual('test')
  expect(body.comentarios).toEqual('test')
})

test('GET /Proyectos 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /Proyectos/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${proyecto.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(proyecto.id)
})

test('GET /Proyectos/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /Proyectos/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${proyecto.id}`)
    .send({ nombre: 'test', descripcion: 'test', curso: 'test', imagenes: 'test', autores: 'test', valoracionMedia: 'test', comentarios: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(proyecto.id)
  expect(body.nombre).toEqual('test')
  expect(body.descripcion).toEqual('test')
  expect(body.curso).toEqual('test')
  expect(body.imagenes).toEqual('test')
  expect(body.autores).toEqual('test')
  expect(body.valoracionMedia).toEqual('test')
  expect(body.comentarios).toEqual('test')
})

test('PUT /Proyectos/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ nombre: 'test', descripcion: 'test', curso: 'test', imagenes: 'test', autores: 'test', valoracionMedia: 'test', comentarios: 'test' })
  expect(status).toBe(404)
})

test('DELETE /Proyectos/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${proyecto.id}`)
  expect(status).toBe(204)
})

test('DELETE /Proyectos/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
