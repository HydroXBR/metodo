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

async function addd(completename, nascimento, email, responsavel, rgresp, cpfresp, telresp, telal, endereco, bairro, cep, dia, camisa, bolsista, turma){
	const response = await fetch(`/cadastraradmin?completename=${completename}&nascimento=${nascimento}&email=${email}&responsavel=${responsavel}&rgresp=${rgresp}&cpfresp=${cpfresp}&telresp=${telresp}&telal=${telal}&endereco=${endereco}&bairro=${bairro}&cep=${cep}&dia=${dia}&camisa=${camisa}&bolsista=${bolsista}&turma=${turma}`)
	console.log("addded")
	const rr = await response
	if(!rr) return false
	return rr
}


async function add(completename, nascimento, email, responsavel, rgresp, cpfresp, telresp, telal, endereco, bairro, cep, dia, camisa, bolsista, turma){
	async function checkname(name){
		const response = await fetch(`/checkname?name=${name}`)
		const rr = await response
		if(!rr) return false
		return rr
	}

	checkname(completename).then(async response =>{
		const rr = await response.json();
		console.log(rr);

		if(rr.success === false){
			alert("Erro ao consultar veracidade! Contate o Isaías, por favor.");
			console.log("Reason", rr.reason);
		} else {
			if(rr.reason.includes("already")){
				alert("Aluno(a) já cadastrado anteriormente!")
			}else if(rr.reason.includes("not")){
				addd(completename, nascimento, email, responsavel, rgresp, cpfresp, telresp, telal, endereco, bairro, cep, dia, camisa, bolsista, turma).then(async response => {
					const rr = await response.json();
					console.log(rr);

					if(rr.success === false){
						alert("Erro no cadastro! Contate o Isaías, por favor.");
						console.log("Reason", rr.reason);
					} else {
						alert("Aluno(a) cadastrado com sucesso!")
						window.location.href = "/admin";
					}
				});
			}
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
	
	const form = document.getElementById('formcadastro');

	const voltarBtn = document.getElementById('voltar');
	voltarBtn.addEventListener('click', function() {
			window.location.href = '/admin';
	});
	
	const cpfInput = document.getElementById('cpfresp');
	cpfInput.addEventListener('input', function() {
		let cpf = cpfInput.value.replace(/\D/g, ''); 
		cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); 
		cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); 
		cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); 
		cpfInput.value = cpf;
	});

	const telInput = document.getElementById('telresp');
	telInput.addEventListener('input', function() {
		let tel = telInput.value.replace(/\D/g, ''); 
		tel = tel.replace(/^(\d{2})(\d)/g, '($1) $2'); 
		tel = tel.replace(/(\d)(\d{4})$/, '$1-$2'); 
		telInput.value = tel;
	});

	const telalInput = document.getElementById('telal');
	telalInput.addEventListener('input', function() {
		let tel = telalInput.value.replace(/\D/g, ''); 
		tel = tel.replace(/^(\d{2})(\d)/g, '($1) $2'); 
		tel = tel.replace(/(\d)(\d{4})$/, '$1-$2'); 
		telalInput.value = tel;
	});

	const cepInput = document.getElementById('cep');
	cepInput.addEventListener('input', function() {
		let cep = cepInput.value.replace(/\D/g, '');
		cep = cep.replace(/^(\d{5})(\d)/, '$1-$2'); 
		cepInput.value = cep;
	});

	form.addEventListener('submit', function(event) {
		event.preventDefault();

		const completename = document.getElementById('completename').value;
		const nascimento = document.getElementById('nascimento').value;
		const email = document.getElementById('email').value;
		const responsavel = document.getElementById('responsavel').value;
		const rgresp = document.getElementById('rgresp').value;
		const cpfresp = document.getElementById('cpfresp').value.replace(/\./gmi, "").replace(/\-/gmi, "")
		const telresp = document.getElementById('telresp').value.replace(/\(/gmi, "").replace(/\)/gmi, "").replace(/\-/gmi, "").replace(/ /gmi, "")
		let telal = document.getElementById('telal').value;
		if(telal.length > 0) telal =  document.getElementById('telal').value.replace(/\(/gmi, "").replace(/\)/gmi, "").replace(/\-/gmi, "").replace(/ /gmi, "")
		const endereco = document.getElementById('endereco').value;
		const bairro = document.getElementById('bairro').value;
		const cep = document.getElementById('cep').value;
		const dia = document.getElementById('dia').value;
		let camisa = document.getElementById('camisa').value;
		if(camisa == "none") camisa = ""
		const bolsista = document.getElementById('bolsista').value;
		const turma = document.getElementById('turma').value;

		const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if(!regexEmail.test(email)){
			return alert("Email inválido!");
		}
		
		add(completename, nascimento, email, responsavel, rgresp, cpfresp, telresp, telal, endereco, bairro, cep, dia, camisa, bolsista, turma)
	})
})
