/*
* Code by Isaías Nascimento - isaiasdesign03@gmail.com
* Last update:  20/05/2023
* Jesus loves you ♥
*/

// Util arrow functions
const ec = txt => encodeURIComponent(txt)
const dec = txt => decodeURIComponent(txt)
const gebi = id => document.getElementById(id)
const gebc = c => document.getElementsByClassName(c)
const voltar = gebi("voltar");

const round = (num, places) => {
	if (!("" + num).includes("e")) {
		return +(Math.round(num + "e+" + places)  + "e-" + places);
	} else {
		let arr = ("" + num).split("e");
		let sig = ""
		if (+arr[1] + places > 0) {
			sig = "+";
		}

		return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + places)) + "e-" + places);
	}
}

const id = new URL(window.location.href).searchParams.get("id").replace(/useridsearch/gmi,'').trim()

console.log(id)


async function getuser() {
	// Fetch API to get the positions and points
	const response = await fetch(`/zgetuser?id=${id}&token=pass4p5`)
	const rr = await response.json()
	/*const rr = {
    id: 'nxqcyho9z3',
    name: 'yrhdhdghgf hggf hgf',
    turma: 1,
    port: 2,
    lit: 4,
    mat: 5,
    fis: 8,
    quim: 3,
    bio: 8,
    geo: 8,
    hist: 8,
    total: 60,
    registered: 1693623988779,
    __v: 0
  }*/

	gebi("name").innerHTML = rr.name
	gebi("serie").innerHTML = `${rr.turma}º ano`

	function preencherGraficos() {
		const materias = [
			{mat: "port", pont:rr.port, total: 8},
			{mat: "lit", pont:rr.lit, total: 4},
			{mat: "hist", pont:rr.hist, total: 8},
			{mat: "geo", pont:rr.geo, total: 8},
			{mat: "bio", pont:rr.bio, total: 8},
			{mat: "quim", pont:rr.quim, total: 8},
			{mat: "mat", pont:rr.mat, total: 8},
			{mat: "fis", pont:rr.fis, total: 8}
		]

		for(var i = 0; i<materias.length;i++){
			console.log(materias[i].pont + '|' + materias[i].total)
			const medidor = gebi("idg"+materias[i].mat);
  		medidor.style.width = round(materias[i].pont/materias[i].total*100,2) + '%';
  		gebi("pc"+materias[i].mat).innerHTML = round(materias[i].pont/materias[i].total*100,2) + "%";

			gebi("desc"+materias[i].mat).innerHTML = `${materias[i].pont} de ${materias[i].total}`
		}

		const medidortotal = document.getElementById("idgtotal");
  	
		medidortotal.style.width = (rr.total/60)*100 + '%';
  	
		document.getElementById("pctotal").innerHTML = round(((rr.total)/60)*100,2) + '%';
		gebi("desctotal").innerHTML = `${rr.total} de 60`
	}
	
	preencherGraficos()
}

getuser()

voltar.addEventListener('click', function(event){
	window.location.href = '/ranking.html'
})