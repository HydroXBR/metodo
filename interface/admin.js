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
			document.getElementById("profile2").src = userInfo.profilePicture;
		}

		document.getElementById("admin").innerText = userInfo.completename;
		document.getElementById("level").innerText = userInfo.permissions;

		if(Number(userInfo.permissions) == 0){
			return document.body.innerHTML = "Não autorizado!"
		}else{
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

	function formatname(fullName) {
		const words = fullName.trim().split(/\s+/);

		const firstName = words[0]; 
		const secondName = words[1];

		if(secondName){
		if (["de", "da", "dos", "das", "do", "henrique", "pedro", "eduarda", "luiza"].includes(secondName.toLowerCase())) {
			if (["de", "da", "dos", "das", "do"].includes(words[2].toLowerCase())) {
				return `${firstName} ${secondName} ${words[2]} ${words[3]}`;
			} else {
				return `${firstName} ${secondName} ${words[2]}`;
			}
		}
		}
		return `${firstName} ${secondName}`;
	}

	function formatarData() {
			// Cria um objeto Date com a data atual
			const data = new Date();

			// Cria arrays com os nomes dos meses e dias da semana
			const meses = [
					"janeiro", "fevereiro", "março", "abril", "maio", "junho",
					"julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
			];

			// Obtém o dia do mês e o mês
			const dia = data.getDate();
			const mes = meses[data.getMonth()];
			const ano = data.getFullYear();

			// Monta a string no formato desejado
			return `${dia} de ${mes} de ${ano}`;
	}

	document.getElementById("date").innerText = formatarData()
	
	preencherTabela()
	function preencherTabela(){
		alunos().then(async response => {
		const todos = await response.json();

		const today = new Date();
		const data = todos.filter(aluno => aluno.dia == today.getDate())
		data.sort((a, b) => a.completename.localeCompare(b.completename));
			
		const tableBody = document.getElementById('table-body');
		tableBody.innerHTML = '';

		if(data.length == 0){
			document.getElementById("tablediv").style.display = "none"
			let pp = document.createElement("p")
			pp.innerText = "Não há pagamentos a receber hoje."
			return document.getElementById("pgtos").appendChild(pp)
		}

		let addZero = num => num < 10 ? '0' + num : num;
			
		data.forEach((aluno, index) => {
			const row = document.createElement('tr');

			const nCell = document.createElement('td');
			nCell.innerText = index + 1
			nCell.classList.add("ncell")
			row.appendChild(nCell);

			const nomeCell = document.createElement('td');
			let a = document.createElement('a')
			a.href = `/aluno?id=`+aluno._id
			a.innerText = formatname(aluno.completename)
			nomeCell.appendChild(a)
			row.appendChild(nomeCell);

			const turmaCell = document.createElement('td');
			turmaCell.innerText = aluno.turma + "°"
			turmaCell.classList.add("ncell")
			row.appendChild(turmaCell);

			function formatWhatsappLink(phoneNumber) {
				let formattedNumber = phoneNumber.replace(/[()\-\s]/g, "");

				if(formattedNumber.length == 0 || formattedNumber.length < 8) return `#`

				if (formattedNumber.length === 8) {
					formattedNumber = "92" + formattedNumber;
				}

				if (formattedNumber.length === 11 && formattedNumber[2] === "9") {
					formattedNumber = formattedNumber.slice(0, 2) + formattedNumber.slice(3);
				}

				const text = `*📌 MENSALIDADE*\n❗️Boa tarde, senhor(a) responsável!\n⚠️ Lembrando que sua mensalidade vence HOJE dia ${addZero(today.getDate())}/${addZero(today.getMonth())} do aluno:\n${aluno.completename}\n\n✅ Estamos aguardando o pagamento.\n\n🔑 *Chave Pix (CNPJ)*\n53.579.716/0001-51\n> Método Centro de Estudos LTDA\n> Caso pagamento em PIX, enviar comprovante, por favor.\n\n📍 Agradecemos a compreensão 😉👍🏻\n\n*MENSAGEM AUTOMÁTICA*`;
				const whatsappLink = `https://api.whatsapp.com/send/?phone=55${formattedNumber}&text=${encodeURIComponent(text)}`;
				return whatsappLink;
			}

			const enviarCell = document.createElement('td');
			let a2 = document.createElement('a')
			a2.href = formatWhatsappLink(aluno.telresp)
			a2.innerText = "Mensagem"
			a2.classList.add("btn-message")
			enviarCell.appendChild(a2)
			row.appendChild(enviarCell);

			tableBody.appendChild(row);
		});
		}).catch(error => {
			console.error('Erro ao obter dados dos alunos:', error);
		});
	}
})
