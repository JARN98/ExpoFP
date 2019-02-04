import mongoose, { Schema } from 'mongoose'

const proyectoResSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  imagen: {
    type: String
  },
  valoracionMedia: {
    type: Number,
    default: 0
  },
  curso: {
    type: String,
    required: true
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

proyectoResSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      nombre: this.nombre,
      imagen: this.imagen,
      curso: this.curso,
      proyecto: this.proyecto,
      valoracionMedia: this.valoracionMedia,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('ProyectoRes', proyectoResSchema)

export const schema = model.schema
export default model
