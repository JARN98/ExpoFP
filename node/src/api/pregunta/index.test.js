import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Pregunta } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, pregunta

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  pregunta = await Pregunta.create({})
})

test('POST /preguntas 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, pregunta: 'test', respuestas: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.pregunta).toEqual('test')
  expect(body.respuestas).toEqual('test')
})

test('POST /preguntas 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /preguntas 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /preguntas 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /preguntas/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${pregunta.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(pregunta.id)
})

test('GET /preguntas/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /preguntas/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${pregunta.id}`)
    .send({ pregunta: 'test', respuestas: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(pregunta.id)
  expect(body.pregunta).toEqual('test')
  expect(body.respuestas).toEqual('test')
})

test('PUT /preguntas/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ pregunta: 'test', respuestas: 'test' })
  expect(status).toBe(404)
})

test('DELETE /preguntas/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${pregunta.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /preguntas/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${pregunta.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /preguntas/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${pregunta.id}`)
  expect(status).toBe(401)
})

test('DELETE /preguntas/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
