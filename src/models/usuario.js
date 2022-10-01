import mongoose from 'mongoose'

const esquema = new mongoose.Schema({
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    index: true,
    required: 'é obrigatório!',
  },
  tokenWebAuth: {
    type: String,
    required: 'é obrigatório!'
  },
  nome: {
    type: String,
    required: 'é obrigatório!'
  },
  avatar: {
    type: String,
    default: '/img/avatar/astrocat.png',
    enum: {
      values: ['/img/avatar/astrocat.png', '/img/avatar/babyet.png'],
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