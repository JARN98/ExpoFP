import { Pregunta } from '.'

let pregunta

beforeEach(async () => {
  pregunta = await Pregunta.create({ pregunta: 'test', respuestas: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = pregunta.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(pregunta.id)
    expect(view.pregunta).toBe(pregunta.pregunta)
    expect(view.respuestas).toBe(pregunta.respuestas)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = pregunta.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(pregunta.id)
    expect(view.pregunta).toBe(pregunta.pregunta)
    expect(view.respuestas).toBe(pregunta.respuestas)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
