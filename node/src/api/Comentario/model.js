import mongoose, { Schema } from 'mongoose'

const comentarioSchema = new Schema({
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  contenido: {
    type: String,
    required: true
  },
  valoracion: {
    type: Number
  },
  valido: {
    type: Boolean
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
