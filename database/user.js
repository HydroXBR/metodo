import pkg from "mongoose"
const {Schema, model} = pkg

const schema = Schema({
  id: { type: String, required: true },
	name: { type: String, required: true },
	turma: { type: Number, required: true },
	port: { type: Number, required: true },
	lit: { type: Number, required: true },
	mat: { type: Number, required: true },
	fis: { type: Number, required: true },
	quim: { type: Number, required: true },
	bio: { type: Number, required: true },
	geo: { type: Number, required: true },
	hist: { type: Number, required: true },
	total: { type: Number, required: true },
	registered: { type: Number, default: new Date().getTime() },
})

const user = model('simulado081023', schema)
export default user
