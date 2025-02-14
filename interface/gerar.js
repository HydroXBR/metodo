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

async function alunos(){
	const response = await fetch(`/alunos`)
	console.log("fetched alunos")
	const rr = await response
	if(!rr) return false
	return rr
}

document.addEventListener('DOMContentLoaded', function() {
	if (User.isLoggedIn()) {
		const userInfo = User.getUserInfo();
		let li = document.getElementById("login")
		li.innerHTML = ""
		let newa = document.createElement("a")
		let btn = document.createElement("button")
		btn.innerText = "Sair"
		btn.classList.add("btn-login")
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
	
	const voltarBtn = document.getElementById('voltar');
	voltarBtn.addEventListener('click', function() {
			window.location.href = '/admin';
	});
	
	alunos().then(async response => {
		const todos = await response.json();
		const alunosSelect = document.getElementById('aluno');
		
		const turmaSelect = document.getElementById('turma');
		turmaSelect.addEventListener('change', function() {
			preencherSeletores(Number(turmaSelect.value));
		});

		const typeSelect = document.getElementById('type');
		typeSelect.addEventListener('change', function() {
			if(typeSelect.value == "recibo"){
				if(!document.getElementById("divvalor").innerHTML == "") return;
				console.log("Dif")
				const valor = document.createElement('input');
				valor.type = "number"
				const valorlabel = document.createElement('label');
				valorlabel.innerText = "Valor (R$)";
				valorlabel.setAttribute("for", "valor");
				valor.setAttribute("id", "valor");
				valor.setAttribute("name", "valor");
				valor.setAttribute("placeholder", "Valor do recibo");
				valor.setAttribute("required", "");
				valor.classList.add("campo")

				document.getElementById("mesdiv").style.display = "block"
				document.getElementById("divvalor").appendChild(valorlabel);									document.getElementById("divvalor").appendChild(valor);
			}else{
				console.log("nao dif")
				document.getElementById("divvalor").innerHTML = "";
				document.getElementById("mesdiv").style.display = "none"
			}
		});

		preencherSeletores(Number(turmaSelect.value))
		function preencherSeletores(turma){
			alunosSelect.innerHTML = "";
			const data = todos.filter(aluno => aluno.turma == turma)
			data.forEach(aluno => {
				var opt = document.createElement('option');
				opt.value = aluno._id;
				opt.innerHTML = aluno.completename;

				document.getElementById("aluno").appendChild(opt);
			})
		}
	})

	const form = document.getElementById('formgerar');
	form.addEventListener('submit', function(event) {
		event.preventDefault();
		const type = document.getElementById('type').value;
		const turma = document.getElementById('turma').value;
		const aluno = document.getElementById('aluno').value;
		const mes = document.getElementById('mes').value;
		const emi = document.getElementById('emi').value;

		const typeSelect = document.getElementById('type');
		if(typeSelect.value == "recibo"){
			const valor = document.getElementById('valor').value;
			window.location.href = `/${type}?type=${type}&turma=${turma}&aluno=${aluno}&mes=${mes}&valor=${valor}&emi=${emi}`
		}else{
			window.location.href = `/${type}?type=${type}&aluno=${aluno}&emi=${emi}`
		}
	})
})
