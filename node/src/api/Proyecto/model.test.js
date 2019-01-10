import { Proyecto } from '.'

let proyecto

beforeEach(async () => {
  proyecto = await Proyecto.create({ nombre: 'test', descripcion: 'test', curso: 'test', imagenes: 'test', autores: 'test', valoracionMedia: 'test', comentarios: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = proyecto.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(proyecto.id)
    expect(view.nombre).toBe(proyecto.nombre)
    expect(view.descripcion).toBe(proyecto.descripcion)
    expect(view.curso).toBe(proyecto.curso)
    expect(view.imagenes).toBe(proyecto.imagenes)
    expect(view.autores).toBe(proyecto.autores)
    expect(view.valoracionMedia).toBe(proyecto.valoracionMedia)
    expect(view.comentarios).toBe(proyecto.comentarios)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = proyecto.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(proyecto.id)
    expect(view.nombre).toBe(proyecto.nombre)
    expect(view.descripcion).toBe(proyecto.descripcion)
    expect(view.curso).toBe(proyecto.curso)
    expect(view.imagenes).toBe(proyecto.imagenes)
    expect(view.autores).toBe(proyecto.autores)
    expect(view.valoracionMedia).toBe(proyecto.valoracionMedia)
    expect(view.comentarios).toBe(proyecto.comentarios)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
