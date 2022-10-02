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
  nome: {
    type: String,
    required: 'é obrigatório!'
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    index: true,
    required: 'é obrigatório!',
    validate: {
      validator: (valor) => { return validacaoPorRegex(valor, "email") },
      message: 'inválida!'
    }
  },
  senha: {
    type: String,
    required: 'é obrigatório!'
  },
  avatar: {
    type: String,
    default: 'astrocat.png',
    enum: {
      values: ['astrocat.png', 'babyet.png'],
      message: 'inválido!'
    }
  },
  pontos: {
    type: Number,
    default: 0,
  },
  permissao: {
    type: String,
    required: 'é obrigatório!',
    lowercase: true,
    default: 'usuário',
    enum: {
      values: ['usuário', 'admin', 'api'],
      message: 'inválida!'
    }
  },
},
  {
    timestamps: true
  })

module.exports = mongoose.models.Usuario || mongoose.model('Usuario', esquema)