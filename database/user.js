import pkg from "mongoose"
const {Schema, model} = pkg

const simuladosSchema = Schema({
	id: String, 
	answers: String
});

const schema = Schema({
	completename: { type: String, required: true },
	turma: { type: Number, required: true },
	cpf: { type: String, required: true },
	email: { type: String, required: true },
	senha: { type: String, required: true },
	profilePicture: { type: String, default: "" },
	permissions: { type: Number, default: 0 },
	simulados: [simuladosSchema],
	registered: { type: Number, default: new Date().getTime() },
})

const user = model('metodousers', schema)
export default user