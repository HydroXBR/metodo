/*
* Code by Isaías Nascimento - isaiasdesign03@gmail.com
* Last update:  01/09/2023
* Jesus loves you ♥
*/

// Util arrow functions
const ec = txt => encodeURIComponent(txt)
const dec = txt => decodeURIComponent(txt)
const gebi = id => document.getElementById(id)
const gebc = c => document.getElementsByClassName(c)
const voltar = gebi("voltar")

function toggleview(button){
	this.checked = !this.checked;

	if(!this.checked){
		const el = document.getElementsByClassName("gab")
		for(var i = 0; i < el.length; i++){
			el[i].style.color = "#000000"
		}
	}else if(this.checked){
		const el = document.getElementsByClassName("gab")
		for(var i = 0; i < el.length; i++){
			el[i].style.color = "#000000"
		}
	}
}

async function setUser(name, turma, port, lit, mat, fis, quim, bio, geo, hist, total){
	const response = await fetch(`/zsetuser?port=${port}&lit=${lit}&mat=${mat}&fis=${fis}&quim=${quim}&bio=${bio}&geo=${geo}&hist=${hist}&name=${name}&turma=${turma}&total=${total}`)
	const rr = await response
	if(!rr) return false

	return rr
}


// Function to generate a table with players rank
async function generate_table() {
	// Fetch API to get the positions and points
	const n = new URL(window.location.href).searchParams.get("serie") || "1"
	const response = await fetch(`/apianswers?serie=${n}`)
	const rr = await response.json()
	
	let logs = rr/*.slice(0,10)*/
	let alogs = rr/*.slice(0,10)*/


	let selected = alogs[0]
	
  var body = gebi('center')
  var tbl = document.createElement("table");
	tbl.classList.add('tablecenter')
	tbl.id = "tabela"
	tbl.style.align = 'center'
	var tblBody = document.createElement("tbody");

	function create(){
  	var newRow = document.createElement('tr')
  	var newCell = document.createElement('td')
		newCell.style.align = 'center'
  	var ncText = document.createElement('strong')
  	ncText.innerText = 'N°⠀⠀'
  	newCell.appendChild(ncText)
  	newRow.appendChild(newCell)

  	var newCell1 = document.createElement('td')
 		var ncText1 = document.createElement('strong')
  	ncText1.innerText= 'Gabarito'
		newCell1.appendChild(ncText1)
  	newRow.appendChild(newCell1)

  	var newCell2 = document.createElement('td')
  	var ncText2 = document.createElement('strong')
  	ncText2.innerText = 'Resposta'
  	newCell2.appendChild(ncText2)
  	newRow.appendChild(newCell2)

		var newCell3 = document.createElement('td')
  	var ncText3 = document.createElement('strong')
  	ncText3.innerText = 'Resultado'
 	 newCell3.appendChild(ncText3)
  	newRow.appendChild(newCell3)

		/*var newCell3 = document.createElement('td')
 		var ncText3 = document.createElement('strong')
  	ncText3.innerText = '%'
  	newCell3.appendChild(ncText3)
  	newRow.appendChild(newCell3)*/

  	tblBody.appendChild(newRow)


  	for (var i = 0; i < alogs[0].answers.length; i++) {
    	var row = document.createElement("tr");

    	for (var j = 0; j < 1; j++) {
      	var cell = document.createElement("td");
      	var cellText = document.createElement('a')
			
      	cellText.innerText = i+1
				cell.classList.add("num")
      	cell.appendChild(cellText);
      	row.appendChild(cell);
    	}


    	for (var a = 0; a < 1; a++) {
      	var cella = document.createElement("td");
      	var cellTexta = document.createElement('a')
				cellTexta.classList.add("gab")
      	cellTexta.innerText = selected.answers[i]
				cellTexta.id = `gab${i+1}`
				cellTexta.style.color = "#000000"
			
			
				cella.appendChild(cellTexta);
				cella.classList.add("correct")
      	row.appendChild(cella);
    	}

    	for (var e = 0; e < 1; e++) {
      	var cell1 = document.createElement("td");
      	/*var cellText1 = document.createElement('a')*/
			
      	let inn = document.createElement("select")
				inn.classList.add("selectors") 
				inn.id = `answer${i+1}`
				inn.innerHTML = " "

				let oopt = document.createElement("option")
				oopt.value = ""
				oopt.innerHTML = "Selecione"
				let aopt = document.createElement("option")
				aopt.value = "A"
				aopt.innerHTML = "A"
				let bopt = document.createElement("option")
				bopt.value = "B"
				bopt.innerHTML = "B"
				let copt = document.createElement("option")
				copt.value = "C"
				copt.innerHTML = "C"
				let dopt = document.createElement("option")
				dopt.value = "D"
				dopt.innerHTML = "D"
				let eopt = document.createElement("option")
				eopt.value = "E"
				eopt.innerHTML = "E"
				let nopt = document.createElement("option")
				nopt.value = "N"
				nopt.innerHTML = "N"

				inn.appendChild(oopt)
				inn.appendChild(aopt)
				inn.appendChild(bopt)
				inn.appendChild(copt)
				inn.appendChild(dopt)
				inn.appendChild(eopt)
				inn.appendChild(nopt)


			
				cell1.appendChild(inn)	
      	/*cell1.appendChild(cellText1);*/
      	row.appendChild(cell1);
    	}

			for (var o = 0; o < 1; o++) {
      	var cell2 = document.createElement("td");
      	var cellText2 = document.createElement('a')
				cellText2.classList.add("correct")
				cellText2.classList.add("correctcheck")
				cellText2.id = `correct${i+1}`
			
      	cell2.appendChild(cellText2);
      	row.appendChild(cell2);
    	}

    	tblBody.appendChild(row);
 		}

  	tbl.appendChild(tblBody);
  	body.appendChild(tbl)
	}
	
	create()

	let salvar = document.createElement("button")
	salvar.innerText = "Salvar e ver aproveitamento"
	salvar.id = "salvar"
	salvar.addEventListener("click", function(event){
		var port = 0;
		var lit = 0;
		var mat = 0;
		var fis = 0;
		var quim = 0;
		var bio = 0;
		var geo = 0;
		var hist = 0;

		let gabb = document.getElementsByClassName("correctcheck")
		console.log(gabb)
			
		for(var k = 0; k < gabb.length; k++){
			/*if(gabb[k].innerText == "") return alert("Ops! Você esqueceu de preencher alguma resposta =/ Preencha completamente, por favor!")*/
		}
		
		if(!gabb) return alert("Erro ao salvar dados. Contate o administrador.")

		for(var y = 0; y < 8; y++){
			if(gabb[y].innerText == "✔️") port++
		}
		for(var y = 8; y < 12; y++){
			if(gabb[y].innerText == "✔️") lit++
		}
		for(var y = 12; y < 20; y++){
			if(gabb[y].innerText == "✔️") hist++
		}
		for(var y = 20; y < 28; y++){
			if(gabb[y].innerText == "✔️") geo++
		}
		for(var y = 28; y < 36; y++){
			console.log(gabb[y].innerText)
			if(gabb[y].innerText == "✔️") bio++
		}
		for(var y = 36; y < 44; y++){
			console.log(gabb[y].innerText)
			if(gabb[y].innerText == "✔️") mat++
		}
		for(var y = 44; y < 52; y++){
			if(gabb[y].innerText == "✔️") fis++
		}
		for(var y = 52; y < 60; y++){
			if(gabb[y].innerText == "✔️") quim++
		}

		let total = port + lit + mat + fis + quim + bio + geo + hist;

		let name = encodeURIComponent(gebi("name").value)
		let turma = n
		let params = `?port=${port}&lit=${lit}&mat=${mat}&fis=${fis}&quim=${quim}&bio=${bio}&geo=${geo}&hist=${hist}&name=${name}&turma=${turma}&total=${total}`

		console.log(params)
		
		setUser(name, turma, port, lit, mat, fis, quim, bio, geo, hist, total)
			.then(async response => {
				const rr = await response.json()

				if(rr.success == false){
					if(/already/gmi.test(rr.message)){
						gebi("name").classList.add("error")
						return alert("Ops, erro! Já existe um usuário com este username. Se esqueceu a senha, contate um administrador através da guia Contato na página inicial.")
					}else{
						console.log(rr.message)
						return alert("Ops, erro! Verifique se os dados estão corretos e, se necessário, contate um administrador através da guia Contato na página inicial.")
					}
				}else{
					alert("Enviado com sucesso!")
				}
			})
		/*window.open("/check"+params, '_blank').focus()*/
	})

	let nnp = document.createElement('p')
  nnp.innerText = "2023 © Isaías Nascimento • Método"
	nnp.id = "copy"

	body.appendChild(salvar)
	body.appendChild(nnp)
}


generate_table().then(() => {
	addevent()
})

function addevent(){
	const selectors = document.getElementsByClassName("selectors")

	if(selectors.length == 0) return console.error("No selectors found!")

	for(var i = 0; i < selectors.length; i++){
		selectors[i].addEventListener("focus", (e) => {
  		gebi(e.target.id).addEventListener("change", (j) => {
				let id = j.target.id.match(/\d+/gmi)[0]
				let tselector = gebi(`answer${id}`)
				console.log(tselector.id, "ID")
				
				let tselectorid = tselector.id.match(/\d+/gmi)[0]
				let gab = gebi(`gab${tselectorid}`).innerText


				if(tselector.value == gab){
					gebi(`correct${id}`).innerHTML = "✔️"
				}else if(tselector.value == ""){
					gebi(`correct${id}`).innerHTML = ""
				}else{
					gebi(`correct${id}`).innerHTML = "❌"
				}
    	})
		});
	}
}