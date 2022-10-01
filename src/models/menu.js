import mongoose from 'mongoose'

const esquema = new mongoose.Schema({
  posicao: {
    type: String,
    lowercase: true,
    default: 'baixo',
    enum: {
      values: ['cima', 'meio', 'baixo'],
      message: 'inválida!'
    }
  },
  titulo: {
    type: String,
    required: 'é obrigatório!',
  },
  subTitulo: {
    type: String,
    default: '',
  },
  imgIconPathName: {
    type: String,
    default: '',
  },
  click: {
    link: {
      type: String,
      required: 'é obrigatório!',
    },
    target: {
      type: String,
      default: '_self',
      enum: {
        values: ['_blank', '_self', '_parent', '_top'],
        message: 'inválida!'
      }
    }
  },
},
  {
    timestamps: true
  })

module.exports = mongoose.models.Menu || mongoose.model('Menu', esquema)