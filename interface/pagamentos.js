const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('active');
	navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
	link.addEventListener('click', () => {
		hamburger.classList.remove('active');
		navLinks.classList.remove('active');
	});
});

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

const mesesAbreviados = [
	"Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"
];

function getmes(numero) {
	if (numero >= 1 && numero <= 12) {
		return mesesAbreviados[numero - 1].toLowerCase();
	} else {
		return null;
	}
}

async function alunos(){
	const response = await fetch(`/alunos`)
	console.log("fetched alunos")
	const rr = await response
	if(!rr) return false
	return rr
}

async function setpago(id, mes, set){
	const response = await fetch(`/setpago?id=${id}&mes=${mes}&set=${set}`)
	console.log(`Set pago: ${id} ${mes} ${set}`)
	const rr = await response
	if(!rr) return false
	return rr
}

async function getalunobyid(id){
	const response = await fetch(`/getalunobyid?id=${id}`)
	console.log("fetched aluno: ", id)
	const rr = await response
	if(!rr) return false
	return rr
}


function defPag(id, mes, isChecked) {
	getalunobyid(id).then(async response => {
		const aluno = await response.json()
		const pgto = aluno.pgto
		let pagamento;

		if(pgto == [] || pgto[mes] == false){
			pagamento = false
		}else{
			pagamento = true
		}

		if(isChecked == true){
			setpago(id, mes, "true").then(async response => {
				const rr = await response.json()
				if(rr.success) alert("Pagamento setado com sucesso.")
			})
		}

		if(isChecked == false){
			setpago(id, mes, "false").then(async response => {
				const rr = await response.json()
				if(rr.success) alert("Pagamento cancelado com sucesso.")
			})
		}
	})
}

document.addEventListener('DOMContentLoaded', function() {
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
		document.body.innerHTML = "Não autorizado!"
		return window.location.href="/login"
	}
	
		const turmaSelect = document.getElementById('turma');
		turmaSelect.addEventListener('change', function() {
			preencherTabela(Number(turmaSelect.value));
		});

		preencherTabela(Number(turmaSelect.value))
		function preencherTabela(turma){
			alunos().then(async response => {
			const todos = await response.json();
			const data = todos.filter(aluno => aluno.turma == turma)
			data.sort((a, b) => a.completename.localeCompare(b.completename));
			const tableBody = document.getElementById('table-body');
			tableBody.innerHTML = '';

			data.forEach((aluno, index) => {
				const row = document.createElement('tr');

				const nCell = document.createElement('td');
				nCell.innerText = index + 1
				nCell.classList.add("ncell")
				nCell.classList.add("aluno")
				row.appendChild(nCell);
				
				const nomeCell = document.createElement('td');
				let a = document.createElement('a')
				a.href = `/aluno?id=`+aluno._id
				a.innerText = aluno.completename
				a.classList.add("aluno")
				nomeCell.appendChild(a)
				row.appendChild(nomeCell);

				for (let mes = 1; mes <= 12; mes++) {
					const mesCell = document.createElement('td');
					const checkbox = document.createElement('input');
					checkbox.type = 'checkbox';
					checkbox.id = `checkbox-${aluno._id}-${mes}`;
					checkbox.addEventListener('change', function() {
						defPag(aluno._id, getmes(mes), this.checked)
					})

					if(aluno.pgto.length > 0){
						let mespgto = aluno.pgto.find(obj => obj.mes == getmes(mes))
						if(mespgto){
							if(mespgto.pago == true){
								checkbox.checked = true
							}else{
								checkbox.checked = false
							}
						}else{
							checkbox.checked = false
						}
					}else{
						checkbox.checked = false
					}

					mesCell.appendChild(checkbox);
					row.appendChild(mesCell);
				}

				tableBody.appendChild(row);
			});
			}).catch(error => {
				console.error('Erro ao obter dados dos alunos:', error);
			});
		}
})
