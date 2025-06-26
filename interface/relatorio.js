async function getalunobyid(id){
	const response = await fetch(`/getalunobyid?id=${id}`)
	console.log("fetched aluno: ", id)
	const rr = await response
	if(!rr) return false
	return rr
}

function cap(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
}


const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const pid = params.get('aluno');
const emit = params.get('emi');

const now = new Date();
const day = now.getDate().toString().padStart(2, '0');
const month = (now.getMonth() + 1).toString().padStart(2, '0');
const year = now.getFullYear();
const hours = now.getHours().toString().padStart(2, '0');
const minutes = now.getMinutes().toString().padStart(2, '0');

const formattedDate = `${day}/${month}/${year} às ${hours}h${minutes}`;
console.log(formattedDate);

const mab = [
		"Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"
];

async function preencher(id){
	let resp = document.getElementById('resp');
	let aaluno = document.getElementById('aluno');
	getalunobyid(id).then(async response => {
		const aluno = await response.json()

		var turma
		switch(aluno.turma){
			case 1:
				turma = "1° Ano"
				break;
			case 2:
				turma = "2° Ano"
				break;
			case 3:
				turma = "PROJETO MEDICINA"
				break;
		}

		console.log(aluno)

		var emitente;
		switch(emit){
			case "k":
				emitente = "Kerolainy Stephany - Secretária Método Pré-Vestibular"
				break;
			case "l":
				emitente = "Júlio Xavier - Secretário Método Pré-Vestibular"
				break;
			case "i":
				emitente = "Isaías Nascimento - Assistente Método Pré-Vestibular"
				break;
			case "j":
				emitente = "Janderson Pacheco - Diretor-Geral Método Pré-Vestibular"
				break;
			default:
				emitente = "Kerolainy Stephany - Secretária Método Pré-Vestibular"
				break;
		}

		resp.innerHTML = aluno.responsavel;
		aaluno.innerHTML = `${aluno.completename} - ${turma}`;
		emi.innerHTML += emitente
		data.innerHTML = formattedDate;

		let pgto = aluno.pgto
		if(pgto.length > 0){
			pgto.forEach(obj => {
				if(obj.pago == true){
					let mesabv = mab.find(mes => mes.toLowerCase() == obj.mes)
					let element = document.getElementById(`pago-${mab.indexOf(cap(mesabv))+1}`)
					element.innerHTML = "Pago"
					element.classList.remove("nao")
					element.classList.add("sim")
				}
			})
		}
	})
}

preencher(pid)
