import mongoose from 'mongoose'

const esquema = new mongoose.Schema({
  posicao: {
    type: String,
    lowercase: true,
    default: 'baixo',
    enum: ['cima', 'meio', 'baixo']
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
      enum: ['_blank', '_self', '_parent', '_top']
    }
  },
},
  {
    timestamps: true
  })

module.exports = mongoose.models.Menu || mongoose.model('Menu', esquema)