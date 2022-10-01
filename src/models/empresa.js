import mongoose from 'mongoose'

const esquema = new mongoose.Schema({
  slug: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    index: true
  },
  nome: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    default: '',
  },
  tamanho: {
    type: String,
    required: true,
    lowercase: true,
    default: 'startup',
    enum: ['startup', 'pequena', 'média', 'grande', 'multinacional']
  },
  pais: {
    type: String,
    required: true,
    default: 'Brasil',
  },
  documentoFiscal: {
    tipo:{
      type: String,
      required: true,
      default: 'cnpj',
      enum: ['cnpj'],
    },
    valor:{
      type: String,
      required: true,
    }
  },
},
  {
    timestamps: true
  })

module.exports = mongoose.models.Empresa || mongoose.model('Empresa', esquema)