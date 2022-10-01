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
  subTitulo: {
    type: String,
    default: '',
  },
  idGaleria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Galeria',
    required: 'é obrigatório!',
  },
  opcoes: [
    {
    titulo: {
      type: String,
      required: 'é obrigatório!',
    },
    correta: {
      type: Boolean,
      default: false,
    }
  }
  ],
},
  {
    timestamps: true
  })

module.exports = mongoose.models.Perguntas || mongoose.model('Perguntas', esquema)