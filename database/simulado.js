import pkg from "mongoose"
const {Schema, model} = pkg

const schema = Schema({
	simulado: { type: String, required: true },
	completename: { type: String, required: true },
	turma: { type: Number, required: true },
	answers: { type: String, required: true }
})

const user = model('metodosimula', schema)
export default user