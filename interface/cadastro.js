async function addd(completename, email, senha, turma, cpf){
	const response = await fetch(`/cadastrar?completename=${completename}&email=${email}&senha=${senha}&turma=${turma}&cpf=${cpf}`)
	console.log("addded")
	const rr = await response
	if(!rr) return false
	return rr
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


async function add(completename, email, senha, turma, cpf){
	async function checkcpf(cpff){
		const response = await fetch(`/checkcpf?cpf=${cpff}`)
		const rr = await response
		if(!rr) return false
		return rr
	}

	checkcpf(cpf).then(async response =>{
		const rr = await response.json();
		console.log(rr);

		if(rr.success === false){
			alert("Erro ao consultar veracidade! Contate o Isaías, por favor.");
			console.log("Reason", rr.reason);
		} else {
			if(rr.reason.includes("already")){
				alert("CPF já cadastrado anteriormente!")
			}else if(rr.reason.includes("not")){
				addd(completename, email, senha, turma, cpf).then(async response => {
					const rr = await response.json();
					console.log(rr);

					if(rr.success === false){
						alert("Erro no cadastro! Contate o Isaías, por favor.");
						console.log("Reason", rr.reason);
					} else {
						const user = User.fromJson(rr.user);
						user.saveToCookies(); 
						window.location.href = "/index.html";
					}
				});
			}
		}
	})
}

document.addEventListener('DOMContentLoaded', function() {
	if (User.isLoggedIn()) {
		const userInfo = User.getUserInfo();

		if(userInfo.profilePicture !== 'null'&& userInfo.profilePicture) {
			document.getElementById("profile").src = userInfo.profilePicture;
		}

		let li = document.getElementById("login")
		li.innerHTML = ""
		let btn = document.createElement("button")
		btn.innerText = "Sair"
		btn.classList.add("btn2")
		btn.onclick = function(event){
			User.logout();
			window.location.href = "/"
		}
		li.appendChild(btn)

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
	
	const form = document.getElementById('formcadastro');
	const cpfInput = document.getElementById('cpf');
	const voltarBtn = document.getElementById('voltar');
	voltarBtn.addEventListener('click', function() {
			window.location.href = '/admin';
	});
	
	cpfInput.addEventListener('input', function() {
		let cpf = cpfInput.value.replace(/\D/g, ''); 
			cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); 
			cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); 
			cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); 
			cpfInput.value = cpf;
	});
	
	form.addEventListener('submit', function(event) {
		event.preventDefault();

		const completename = document.getElementById('completename').value;
		const email = document.getElementById('email').value;
		const senha = document.getElementById('senha').value;
		const csenha = document.getElementById('csenha').value;
		const turma = document.getElementById('turma').value;
		const cpf = document.getElementById('cpf').value;

		const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if(!regexEmail.test(email)){
			return alert("Email inválido!");
		}
		if(senha !== csenha){
			return alert("Senhas não conferem!");
		}

		add(completename, email, senha, turma, cpf)
	})
})