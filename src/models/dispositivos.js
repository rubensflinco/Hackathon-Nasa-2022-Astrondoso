import mongoose from 'mongoose'

const esquema = new mongoose.Schema({
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Usuario',
  },
  tokenNotificacao: {
    type: String,
    default: '',
  },
  dadosNavegador: {
    type: Object,
    default: {},
  },
  dadosInternet: {
    type: Object,
    default: {},
  },
  nome: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    lowercase: true,
    default: 'desconhecido',
    enum: ['celular', 'desktop', 'notebook', 'tablet', 'televisão', 'desconhecido']
  },
},
  {
    timestamps: true
  })

module.exports = mongoose.models.Dispositivos || mongoose.model('Dispositivos', esquema)