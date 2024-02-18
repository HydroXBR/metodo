import pkg from "mongoose"
const {Schema, model} = pkg

const schema = Schema({
  id: { type: String, required: true },
	pass: { type: String, required: true },
	completename: { type: String, required: false, default:"" },
	name: {type: String, required: true},
	turma: { type: Number, required: true },
	_120523: {type: Object, required: false, default: null},
	registered: {type: Number, default: new Date().getTime() },
})

const userr = model('metodosystem', schema)
export default userr
