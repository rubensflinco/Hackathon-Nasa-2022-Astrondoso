import mongoose from 'mongoose'
import validacaoPorRegex from '../functions/validacaoPorRegex'

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
  imgPathName: {
    type: String,
    required: 'é obrigatório!',
  },
  dataDivulgacao: {
    type: String,
    required: 'é obrigatório!',
    validate: {
      validator: (valor) => { return validacaoPorRegex(valor, "dataBrasileira") },
      message: 'inválida!'
    }
  },
},
  {
    timestamps: true
  })

module.exports = mongoose.models.Galeria || mongoose.model('Galeria', esquema)