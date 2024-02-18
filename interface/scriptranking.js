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
const voltar = gebi("voltar")


// Function to generate a table with players rank
async function generate_table() {
	const n = new URL(window.location.href).searchParams.get("lista") || "1"
	if(n == 2){
		if(gebi("opt1").hasAttribute("selected")){
			gebi("opt1").setAttribute("selected", false)
		}
		gebi("opt2").setAttribute("selected", true)
	}
	
	// Fetch API to get the positions and points
	let num = gebi("serie").value
	
	const response = await fetch(`/apiranking?sel=${num}`)
	const rr = await response.json()
	
	let logs = rr/*.slice(0,10)*/
	let alogs = rr/*.slice(0,10)*/
	console.log(logs, alogs)
  var body = gebi('center')
  var tbl = document.createElement("table");
	tbl.id = "tabela"
	tbl.classList.add('tablecenter')
	tbl.classList.add("fl-table")
	tbl.style.align = 'center'
	var tblBody = document.createElement("tbody");

	function create(){
	  var newRow = document.createElement('tr')
	  var newCell = document.createElement('td')
		newCell.style.align = 'center'
	  var ncText = document.createElement('strong')
	  ncText.innerText = 'RANK'
	  newCell.appendChild(ncText)
	  newRow.appendChild(newCell)
	
	  var newCell1 = document.createElement('td')
	  var ncText1 = document.createElement('strong')
	  ncText1.innerText= 'NOME'
		newCell1.appendChild(ncText1)
	  newRow.appendChild(newCell1)

		if(num == "1"){
	  var newCell2 = document.createElement('td')
	  var ncText2 = document.createElement('strong')
	  ncText2.innerText = 'ACERTOS'
	  newCell2.appendChild(ncText2)
	  newRow.appendChild(newCell2)
		}
	
		/*var newCell3 = document.createElement('td')
	  var ncText3 = document.createElement('strong')
	  ncText3.innerText = '%'
	  newCell3.appendChild(ncText3)
	  newRow.appendChild(newCell3)*/
	
	  tblBody.appendChild(newRow)
	
	  for (var i = 0; i < alogs.length; i++) {
	    var row = document.createElement("tr");

			if(num == "1"){
	    	for (var j = 0; j < 1; j++) {
	      	var cell = document.createElement("td");
	      	var cellText = document.createElement('a')
					if(i == 0){
						cell.classList.add("namecolorouro")
					}
					if(i == 1){
						cell.classList.add("namecolorprata")
					}
					if(i == 2){
						cell.classList.add("namecolorbronze")
					}
	      	cellText.innerText = alogs[i].rank
	      	cell.appendChild(cellText);
	      	row.appendChild(cell);
	    	}
			}else{
				for (var j = 0; j < 1; j++) {
	      	var cell = document.createElement("td");
	      	var cellText = document.createElement('a')
	      	cellText.innerText = "-"
	      	cell.appendChild(cellText);
	      	row.appendChild(cell);
	    	}
			}
	
	    for (var a = 0; a < 1; a++) {
	      var cella = document.createElement("td");
	      var cellTexta = document.createElement('a')
	      cellTexta.innerText = alogs[i].name
				if(num == "1"){
					if(i == 0){
						cella.classList.add("namecolorouro")
					}
					if(i == 1){
						cella.classList.add("namecolorprata")
					}
					if(i == 2){
						cella.classList.add("namecolorbronze")
					}
				}
				
				cellTexta.href = '/useridsearch?id='+alogs[i].id
	      cella.appendChild(cellTexta);
	      row.appendChild(cella);
	    }

			if(num == "1"){
	    for (var e = 0; e < 1; e++) {
	      var cell1 = document.createElement("td");
	      var cellText1 = document.createElement('a')
					if(i == 0){
						cella.classList.add("namecolorouro")
					}
					if(i == 1){
						cella.classList.add("namecolorprata")
					}
					if(i == 2){
						cella.classList.add("namecolorbronze")
					}
	      cellText1.innerText = alogs[i].pont
	      cell1.appendChild(cellText1);
	      row.appendChild(cell1);
	    }
			}
	
			/*for (var o = 0; o < 1; o++) {
	      var cell2 = document.createElement("td");
	      var cellText2 = document.createElement('a')
	      cellText2.innerText = alogs[i].percent
	      cell2.appendChild(cellText2);
	      row.appendChild(cell2);
	    }*/
	
	    tblBody.appendChild(row);
	  }
	
	  tbl.appendChild(tblBody);

		gebi("c").appendChild(tbl)
	}

	create()

	var nnp = document.createElement('a')
  nnp.innerText = "© Isaías Nascimento, 2023"
	nnp.id = "copy"
	nnp.classList.add("copy")
	nnp.href = "https://isaiaszxx.yeshayahudesigndeveloper.repl.co/"
	body.appendChild(nnp)
}

generate_table().then(()=> addoptions())

function addoptions(){
	gebi("serie").addEventListener("click", (e) => {
 		gebi(e.target.id).addEventListener("change", (j) => {
			let body = gebi("center")
			gebi("c").removeChild(gebi("tabela"))
			body.removeChild(gebi("copy"))
			generate_table().then(() => {
				addoptions()
			})
   	})
	});
}