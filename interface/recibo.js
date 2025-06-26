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

String.prototype.extenso = function(c){
		var ex = [
				["zero", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"],
				["dez", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"],
				["cem", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"],
				["mil", "milhão", "bilhão", "trilhão", "quadrilhão", "quintilhão", "sextilhão", "setilhão", "octilhão", "nonilhão", "decilhão", "undecilhão", "dodecilhão", "tredecilhão", "quatrodecilhão", "quindecilhão", "sedecilhão", "septendecilhão", "octencilhão", "nonencilhão"]
		];
		var a, n, v, i, n = this.replace(c ? /[^,\d]/g : /\D/g, "").split(","), e = " e ", $ = "real", d = "centavo", sl;
		for(var f = n.length - 1, l, j = -1, r = [], s = [], t = ""; ++j <= f; s = []){
				j && (n[j] = (("." + n[j]) * 1).toFixed(2).slice(2));
				if(!(a = (v = n[j]).slice((l = v.length) % 3).match(/\d{3}/g), v = l % 3 ? [v.slice(0, l % 3)] : [], v = a ? v.concat(a) : v).length) continue;
				for(a = -1, l = v.length; ++a < l; t = ""){
						if(!(i = v[a] * 1)) continue;
						i % 100 < 20 && (t += ex[0][i % 100]) ||
						i % 100 + 1 && (t += ex[1][(i % 100 / 10 >> 0) - 1] + (i % 10 ? e + ex[0][i % 10] : ""));
						s.push((i < 100 ? t : !(i % 100) ? ex[2][i == 100 ? 0 : i / 100 >> 0] : (ex[2][i / 100 >> 0] + e + t)) +
						((t = l - a - 2) > -1 ? " " + (i > 1 && t > 0 ? ex[3][t].replace("ão", "ões") : ex[3][t]) : ""));
				}
				a = ((sl = s.length) > 1 ? (a = s.pop(), s.join(" ") + e + a) : s.join("") || ((!j && (n[j + 1] * 1 > 0) || r.length) ? "" : ex[0][0]));
				a && r.push(a + (c ? (" " + (v.join("") * 1 > 1 ? j ? d + "s" : (/0{6,}$/.test(n[0]) ? "de " : "") + $.replace("l", "is") : j ? d : $)) : ""));
		}
		return r.join(e);
}

const responsavel = document.getElementById('responsavel');
const mes = document.getElementById('mes');
const valor = document.getElementById('valor');
const desc = document.getElementById('desc');
const data = document.getElementById('data');
const value = document.getElementById('value');

function descricao(mes, turma, aluno){
	return `Parcela ${mes} de 12 referente ao contrato de 2025 - Curso Método Pré-Vestibular do(a) aluno(a) ${aluno.toUpperCase()} da turma ${turma}.`
}

const queryString = window.location.search;
const params = new URLSearchParams(queryString);

const pmes = params.get('mes');
const pvalor = params.get('valor');
const id = params.get('aluno');
const emit = params.get('emi');

const now = new Date();
const day = now.getDate().toString().padStart(2, '0');
const month = (now.getMonth() + 1).toString().padStart(2, '0');
const year = now.getFullYear();
const hours = now.getHours().toString().padStart(2, '0');
const minutes = now.getMinutes().toString().padStart(2, '0');

const formattedDate = `${day}/${month}/${year} às ${hours}h${minutes}`;
console.log(formattedDate);

async function preencher(id){
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
		
		responsavel.innerHTML = aluno.responsavel;
		value.innerHTML += pvalor+",00"
		valor.innerHTML = cap(pvalor.extenso(true))
		desc.innerHTML = descricao(pmes, turma, aluno.completename);
		emi.innerHTML += emitente
		data.innerHTML = formattedDate;
	})
}

preencher(id)
