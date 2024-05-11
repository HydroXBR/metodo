import pkg from "mongoose"
const {Schema, model} = pkg

const pgtoSchema = Schema({
	mes: String,
	pago: Boolean
});

const schema = Schema({
	completename: { type: String, required: true },
	nascimento: { type: String, required: true },
	responsavel: { type: String, required: true },
	cpfresp: { type: String, required: true },
	rgresp: { type: String, required: true },
	telresp: { type: String, required: true },
	telal: { type: String, default: "" },
	email: { type: String, default: "" },
	endereco: { type: String, required: true },
	bairro: { type: String, required: true },
	cep: { type: String, required: true },
	dia: { type: Number, required: true },
	bolsista: { type: String, default: "n" },
	camisa: { type: String, default: "" },
	turma: { type: Number, required: true },
	pgto: [pgtoSchema],
	registered: { type: Number, default: new Date().getTime() },
})

const useradm = model('useradm', schema)
export default useradm