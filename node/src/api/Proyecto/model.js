import mongoose, { Schema } from 'mongoose'

const proyectoSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  curso: {
    type: String,
    required: true
  },
  imagenes: [{
    type: String
  }],
  autores: {
    type: String
  },
  valoracionMedia: {
    type: Number,
    default: 0
  },
  comentarios: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comentario'
  },
  ultimosComentarios: [{
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
  }]
},
{
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

proyectoSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      nombre: this.nombre,
      descripcion: this.descripcion,
      curso: this.curso,
      imagenes: this.imagenes,
      autores: this.autores,
      valoracionMedia: this.valoracionMedia,
      comentarios: this.comentarios,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Proyecto', proyectoSchema)

export const schema = model.schema
export default model
