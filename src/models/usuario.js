import mongoose from 'mongoose'
import validacaoPorRegex from '../functions/validacaoPorRegex';

const esquema = new mongoose.Schema({
  slug: {
    type: String,
    unique: true,
    required: 'é obrigatório!',
    lowercase: true,
    index: true
  },
  nome: {
    type: String,
    required: 'é obrigatório!'
  },
  email: {
    type: String,
    unique: true,
    required: 'é obrigatório!',
    lowercase: true,
    index: true,
    validate: {
      validator: (valor) => { return validacaoPorRegex(valor, "email") },
      message: 'inválido!'
    }
  },
  senha: {
    type: String,
    required: 'é obrigatório!',
    select: false,
  },
  status: {
    type: String,
    required: 'é obrigatório!',
    lowercase: true,
    default: 'não verificado',
    enum: {
      values: ['não verificado', 'verificado', 'banido', 'desativado'],
      message: 'inválido!'
    }
  },
  statusMotivo: {
    type: String,
    default: 'Usuário iniciando cadastro, aguardando verificação do endereço de e-mail.',
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
  foto: {
    type: String,
    required: 'é obrigatório!',
    default: 'usuarioSemFoto.png',
  },
  dataNascimento: {
    type: String,
    required: 'é obrigatório!',
    validate: {
      validator: (valor) => { return validacaoPorRegex(valor, "dataNascimento") },
      message: 'inválida!'
    }
  },
  celular: {
    type: String,
    required: 'é obrigatório!',
    validate: {
      validator: (valor) => { return validacaoPorRegex(valor, "celular") },
      message: 'inválido!'
    }
  },
  pais: {
    type: String,
    required: 'é obrigatório!',
    default: 'Brasil',
  },
  idioma: {
    type: String,
    required: 'é obrigatório!',
    lowercase: true,
    default: 'pt-br',
    enum: {
      values: ['pt-br', 'es'],
      message: 'inválido!'
    }
  },
  empresas: [
    {
      permissao: {
        type: String,
        lowercase: true,
        default: '',
        enum: {
          values: ['colaborador', 'gerente', ''],
          message: 'inválida!'
        }
      },
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Empresa',
        default: '',
      }
    },
  ],
  contasVinculadas: [
    {
      tipo: {
        type: String,
        lowercase: true,
        default: '',
        enum: {
          values: ['google', 'facebook', 'github', ''],
          message: 'inválido!'
        }
      },
      token: {
        type: String,
        default: '',
      },
      email: {
        type: String,
        lowercase: true,
        default: '',
      },
      nome: {
        type: String,
        default: '',
      }
    },
  ],
  dadosAdicionais: {
    type: Object,
    default: {},
  },
},
  {
    timestamps: true
  })

module.exports = mongoose.models.Usuario || mongoose.model('Usuario', esquema)