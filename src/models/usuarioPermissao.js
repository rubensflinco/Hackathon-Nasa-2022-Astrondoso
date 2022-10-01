import mongoose from 'mongoose'

const esquema = new mongoose.Schema({
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Usuario',
  },
  permissao: {
    type: String,
    required: 'é obrigatório!',
    lowercase: true,
    default: 'usuário',
    enum: {
      values: ['usuário', 'admin'],
      message: 'inválida!'
    }
  },
  site: {
    type: String,
    required: 'é obrigatório!',
    default: 'todos',
  },
},
  {
    timestamps: true
  })

module.exports = mongoose.models.UsuarioPermissao || mongoose.model('UsuarioPermissao', esquema)