import mongoose from 'mongoose'

const esquema = new mongoose.Schema({
  slug: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    index: true
  },
  titulo: {
    type: String,
    required: true,
  },
  subTituo: {
    type: String,
    required: true,
  },
  secoes: {
    titulo: {
      type: String,
      required: true,
    },
    conteudo: {
      type: String,
      required: true,
    }
  },
},
  {
    timestamps: true
  })

module.exports = mongoose.models.Artigo || mongoose.model('Artigo', esquema)