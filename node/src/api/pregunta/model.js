import mongoose, { Schema } from 'mongoose'

const preguntaSchema = new Schema({
  pregunta: {
    type: String
  },
  respuestas: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

preguntaSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      pregunta: this.pregunta,
      respuestas: this.respuestas,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Pregunta', preguntaSchema)

export const schema = model.schema
export default model
