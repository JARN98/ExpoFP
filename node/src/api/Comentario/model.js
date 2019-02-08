import mongoose, { Schema } from 'mongoose'

const comentarioSchema = new Schema({
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  nombreAutor: {
    type: String
  },
  contenido: {
    type: String,
    required: true
  },
  valoracion: {
    type: Number
  },
  valido: {
    type: Boolean,
    default: true
  },
  imagenAutor: {
    type: String
  },
  proyecto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Proyecto',
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

comentarioSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      autor: this.autor,
      contenido: this.contenido,
      valoracion: this.valoracion,
      valido: this.valido,
      proyecto: this.proyecto,
      nombreAutor: this.nombreAutor,
      imagenAutor: this.imagenAutor,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Comentario', comentarioSchema)

export const schema = model.schema
export default model
