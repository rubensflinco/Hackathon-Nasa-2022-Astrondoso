import mongoose from 'mongoose'

const esquema = new mongoose.Schema({
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    index: true,
    required: 'é obrigatório!',
  },
  titulo: {
    type: String,
    required: 'é obrigatório!',
  },
  subTituo: {
    type: String,
    required: 'é obrigatório!',
  },
  secoes: {
    titulo: {
      type: String,
      required: 'é obrigatório!',
    },
    conteudo: {
      type: String,
      required: 'é obrigatório!',
    }
  },
},
  {
    timestamps: true
  })

module.exports = mongoose.models.Artigo || mongoose.model('Artigo', esquema)