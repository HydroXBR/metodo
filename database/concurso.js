import pkg from "mongoose"
const {Schema, model} = pkg

const redacaoSchema = new Schema({
  vestibular: {
    type: String,
    enum: ['SIS II', 'SIS III', 'PSC III'],
    required: true
  },
  nota: {
    type: Number,
    min: 0,
    max: 10,
    required: true
  }
});

const vestibularSchema = new Schema({
  nome: {
    type: String,
    enum: ['PSC I', 'PSC II', 'PSC III', 'SIS I', 'SIS II', 'SIS III'],
    required: true
  },
  nota: {
    type: Number,
    min: 0,
    max: 60,
    required: true
  }
});

const inscricaoSchema = new Schema({
  nomeCompleto: {
    type: String,
    required: [true, 'Nome completo é obrigatório'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Por favor, insira um email válido']
  },
  cpf: {
    type: String,
    required: [true, 'CPF é obrigatório'],
    unique: true,
    trim: true
  },
  dataNascimento: {
    type: Date,
    required: [true, 'Data de nascimento é obrigatória']
  },
  telefone: {
    type: String,
    required: [true, 'Telefone é obrigatório'],
    trim: true
  },
  
  serieAtual: {
    type: String,
    enum: ['9º Ano EF', '1º Ano EM', '2º Ano EM', '3º Ano EM'],
    required: [true, 'Série atual é obrigatória']
  },
  escolaOrigem: {
    type: String,
    required: [true, 'Escola de origem é obrigatória'],
    trim: true
  },
  escolaPublica: {
    type: Boolean,
    required: [true, 'Informe se a escola é pública ou particular']
  },
  
  fezPSC: {
    type: Boolean,
    default: false
  },
  fezSIS: {
    type: Boolean,
    default: false
  },

  notasVestibulares: [vestibularSchema],
  notasRedacao: [redacaoSchema],
  
  motivacao: {
    type: String,
    required: [true, 'Por favor, explique por que deseja estudar no Método'],
    trim: true,
    minlength: [20, 'Por favor, escreva pelo menos 20 caracteres sobre sua motivação'],
    maxlength: [1000, 'Limite máximo de 1000 caracteres']
  },
  
  dataInscricao: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pendente', 'confirmado', 'classificado', 'bolsa_concedida', 'desclassificado'],
    default: 'pendente'
  },
  
  dataProva: {
    type: Date,
    default: () => new Date('2026-01-18T08:00:00')
  },
  compareceuProva: {
    type: Boolean,
    default: false
  },
  notaConcurso: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  percentualBolsa: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  
  dataAtualizacao: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Índices para consultas rápidas
inscricaoSchema.index({ cpf: 1 }, { unique: true });
inscricaoSchema.index({ email: 1 });
inscricaoSchema.index({ status: 1 });
inscricaoSchema.index({ serieAtual: 1 });
inscricaoSchema.index({ dataInscricao: -1 });

// Middleware para atualizar data de atualização
inscricaoSchema.pre('save', function(next) {
  this.dataAtualizacao = new Date();
  next();
});

inscricaoSchema.methods.calcularIdade = function() {
  const hoje = new Date();
  const nascimento = new Date(this.dataNascimento);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();
  
  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }
  
  return idade;
};

inscricaoSchema.methods.ehElegivel = function() {
  const idade = this.calcularIdade();
  return idade >= 13 && idade <= 40;
};

const Inscricao = model('InscricaoConcurso', inscricaoSchema);

export default Inscricao;
