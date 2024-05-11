import pkg from "mongoose"
const {Schema, model} = pkg

const schema = Schema({
	id: { type: String, required: true },
	name: { type: String, required: true },
	turma: { type: Number, required: true },
	answers: { type: String, required: true },
	registered: { type: Number, default: new Date().getTime() },
})

const user = model('simulado022024', schema)
export default user