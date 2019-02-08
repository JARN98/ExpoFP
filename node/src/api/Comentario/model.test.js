import { Comentario } from '.'

let comentario

beforeEach(async () => {
  comentario = await Comentario.create({ autor: 'test', contenido: 'test', valoracion: 'test', valido: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = comentario.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(comentario.id)
    expect(view.autor).toBe(comentario.autor)
    expect(view.contenido).toBe(comentario.contenido)
    expect(view.valoracion).toBe(comentario.valoracion)
    expect(view.valido).toBe(comentario.valido)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = comentario.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(comentario.id)
    expect(view.autor).toBe(comentario.autor)
    expect(view.contenido).toBe(comentario.contenido)
    expect(view.valoracion).toBe(comentario.valoracion)
    expect(view.valido).toBe(comentario.valido)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
