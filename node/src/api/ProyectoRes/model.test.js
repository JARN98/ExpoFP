import { ProyectoRes } from '.'

let proyectoRes

beforeEach(async () => {
  proyectoRes = await ProyectoRes.create({ nombre: 'test', imagen: 'test', curso: 'test', proyecto: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = proyectoRes.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(proyectoRes.id)
    expect(view.nombre).toBe(proyectoRes.nombre)
    expect(view.imagen).toBe(proyectoRes.imagen)
    expect(view.curso).toBe(proyectoRes.curso)
    expect(view.proyecto).toBe(proyectoRes.proyecto)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = proyectoRes.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(proyectoRes.id)
    expect(view.nombre).toBe(proyectoRes.nombre)
    expect(view.imagen).toBe(proyectoRes.imagen)
    expect(view.curso).toBe(proyectoRes.curso)
    expect(view.proyecto).toBe(proyectoRes.proyecto)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
