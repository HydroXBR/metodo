import pkg from "mongoose"
const {Schema, model} = pkg

const pgtoSchema = Schema({
	mes: String,
	pago: Boolean
});

const schema = Schema({
	completename: { type: String, required: true },
	nascimento: { type: String, default: ""},
	responsavel: { type: String, default: ""},
	cpfresp: { type: String, default: ""},
	rgresp: { type: String, default: ""},
	telresp: { type: String, default: ""},
	telal: { type: String, default: "" },
	email: { type: String, default: "" },
	endereco: { type: String, default: "" },
	bairro: { type: String, default: ""},
	cep: { type: String, default: "" },
	dia: { type: Number, required: false },
	bolsista: { type: String, default: "n" },
	camisa: { type: String, default: "" },
	turma: { type: Number, default: 1},
	pgto: [pgtoSchema],
	registered: { type: Number, default: new Date().getTime() },
})

const useradm = model('useradm', schema)
export default useradm
