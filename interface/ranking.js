async function simul(){
	const response = await fetch(`/varsimulados`)
	const rr = await response
	if(!rr) return false
	return rr.json()
}
// Classe Cookie para manipular cookies
class Cookie {
	static set(name, value, days) {
		let expires = "";
		if (days) {
			let date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			expires = "; expires=" + date.toUTCString();
		}
		document.cookie = name + "=" + (value || "")  + expires + "; path=/";
	}

	static get(name) {
		let nameEQ = name + "=";
		let ca = document.cookie.split(';');
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1, c.length);
			}
			if (c.indexOf(nameEQ) == 0) {
				return c.substring(nameEQ.length, c.length);
			}
		}
		return null;
	}

	static erase(name) {   
		document.cookie = name+'=; Max-Age=-99999999;';  
	}
}

// Classe User para armazenar informações do usuário em cookies
class User {
	constructor(email, permissions, profilePicture, completename) {
		this.email = email;
		this.completename = completename;
		this.permissions = permissions;
		this.profilePicture = profilePicture;
	}

	static fromJson(json) {
		return new User(json.email, json.permissions, json.profilePicture, json.completename);
	}

	saveToCookies() {
		Cookie.set("loggedIn", "true", 1); // Expira em 1 dia
		Cookie.set("userEmail", this.email, 1);
		Cookie.set("userPermissions", this.permissions, 1);
		Cookie.set("userProfilePicture", this.profilePicture, 1);
		Cookie.set("completename", this.completename, 1);
	}

	static isLoggedIn() {
		return Cookie.get("loggedIn") === "true";
	}

	static getUserInfo() {
		if (User.isLoggedIn()) {
			return {
				email: Cookie.get("userEmail"),
				permissions: Cookie.get("userPermissions"),
				profilePicture: Cookie.get("userProfilePicture"),
				completename: Cookie.get("completename")
			};
		} else {
			return null;
		}
	}

	static logout() {
		Cookie.erase("loggedIn");
		Cookie.erase("userEmail");
		Cookie.erase("userPermissions");
		Cookie.erase("userProfilePicture");
		Cookie.erase("completename");
	}
}

function isElementInViewport(el) {
		var rect = el.getBoundingClientRect();
		return (
				rect.top >= 0 &&
				rect.left >= 0 &&
				rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
				rect.right <= (window.innerWidth || document.documentElement.clientWidth)
		);
}

// Função para adicionar classe de animação quando o elemento está visível
function addAnimationOnScroll() {
		var animatedElements = document.querySelectorAll('.animated');
		animatedElements.forEach(function(el) {
				if (isElementInViewport(el)) {
						el.classList.add('fadeIn');
				}
		});
}

// Adicionar evento de scroll para chamar a função quando o usuário rolar a página
window.addEventListener('scroll', addAnimationOnScroll);

document.addEventListener('DOMContentLoaded', function(){
	if (User.isLoggedIn()) {
		const userInfo = User.getUserInfo();
		let li = document.getElementById("login")
		li.innerHTML = ""
		let newa = document.createElement("a")
		let btn = document.createElement("button")
		btn.innerText = "Sair"
		btn.classList.add("btn2")
		btn.onclick = function(event){
			User.logout();
			window.location.href = "/"
		}
		newa.appendChild(btn)
		li.appendChild(newa)

		if(userInfo.profilePicture !== 'null'&& userInfo.profilePicture) {
			document.getElementById("profile").src = userInfo.profilePicture;
		}

		if(userInfo.permissions > 0){
			let ul = document.getElementById("nav-links")
			let admin = document.createElement("li")
			let aadmin = document.createElement("a")
			aadmin.href = "/admin"
			aadmin.innerText = "Admin"
			admin.appendChild(aadmin)
			ul.appendChild(admin)
		}
	} else {
		console.log("Usuário não está logado.");
	}

	const ec = txt => encodeURIComponent(txt)
	const dec = txt => decodeURIComponent(txt)
	const gebi = id => document.getElementById(id)
	const gebc = c => document.getElementsByClassName(c)

	async function generate_table() {
		simul().then(async simulados => {
			const queryString = window.location.search;
			const params = new URLSearchParams(queryString);
			let id = params.get("id")
			var simuatual = simulados.find(simu => simu.id === id)
			let num = gebi("serie").value || simuatual.turmas[0]

			const response = await fetch(`/apiranking?sel=${num}&id=${id}`)
			const rr = await response.json()

			gebi("title").innerHTML = simuatual.name + ` (${simuatual.date.replace(/\-/gmi, "/")})`
			for (var i = 0; i < simuatual.turmas.length; i++) {
					let turma = simuatual.turmas[i];
					// Verifica se a opção já existe no seletor
					let opcaoExistente = document.querySelector("#serie option[value='" + turma + "']");
					if (!opcaoExistente) { // Se a opção não existe, adicione-a
							let opt = document.createElement("option");
							opt.value = turma;
							opt.innerText = turma + "° ano";
							gebi("serie").appendChild(opt);
					}
			}

			let logs = rr
			let alogs = rr

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

				if(Number(num) < 4){
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

					if(Number(num) < 4){
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
						if(Number(num) < 4){
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

						cellTexta.href = '/desempenho?id='+alogs[i].id+"&simulado="+id
						cella.appendChild(cellTexta);
						row.appendChild(cella);
					}

					if(Number(num) < 4){
						for (var e = 0; e < 1; e++) {
							var cell1 = document.createElement("td");
							var cellText1 = document.createElement('a')
								if(i == 0){
									cell1.classList.add("namecolorouro")
								}
								if(i == 1){
									cell1.classList.add("namecolorprata")
								}
								if(i == 2){
									cell1.classList.add("namecolorbronze")
								}
							cellText1.innerText = alogs[i].pont
							cell1.appendChild(cellText1);
							row.appendChild(cell1);
						}
					}

					tblBody.appendChild(row);
				}

				tbl.appendChild(tblBody);

				gebi("c").appendChild(tbl)
			}

			create()

			var nnp = document.createElement('p')
			nnp.innerText = "Programação e desenvolvimento: © Isaías Nascimento, 2024"
			nnp.id = "copy"
			nnp.classList.add("copy")
			body.appendChild(nnp)
		})
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
})
