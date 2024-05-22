async function simul(){
	const response = await fetch(`/varsimulados`)
	const rr = await response
	if(!rr) return false
	return rr.json()
}

const ec = txt => encodeURIComponent(txt)
const dec = txt => decodeURIComponent(txt)
const gebi = id => document.getElementById(id)
const gebc = c => document.getElementsByClassName(c)

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

	simul().then(simulados => {
		const queryString = window.location.search;
		const params = new URLSearchParams(queryString);
		let cat = params.get("cat")

		let si = simulados
		if(cat){
			si = simulados.filter(simulado => simulado.id.includes("NA"))

			var link = document.createElement('link');
			link.type = 'image/png';
			link.rel = 'icon';
			var existingIcon = document.querySelector("link[rel='shortcut icon']")
			if (existingIcon) {
				document.head.removeChild(existingIcon);
			}
			document.head.appendChild(link)

			gebi("logoclass").innerHTML = "Núcleo da Aprovação - LS"
			logoclass.classList.remove("logo")
			logoclass.classList.add("logona")
			gebi("simulinks").setAttribute("href", "/simulados?cat=NA")
			gebi("metodo").setAttribute("src", "https://i.ibb.co/1QvjfDp/Design-sem-nome-2.png")
			document.body.style.backgroundImage = "url(https://www.portaldoholanda.com.br/sites/default/files/imagecache/2020_noticia_fotogrande/portaldoholanda-906224-imagem-foto-1amazonas.jpg)"
			link.href = "https://i.ibb.co/1QvjfDp/Design-sem-nome-2.png"
			document.head.appendChild(link)
			gebi("inicio").style.display = "none"
			gebi("pphoto").style.display = "none"
			gebi("sobre").style.display = "none"
			gebi("login").style.display = "none"
		}else{
			document.body.style.backgroundImage = "url(https://s3.amazonaws.com/i.snag.gy/hATqGL.jpg)"
			si = simulados.filter(e => !e.id.includes("NA"))
		}
		
		for(var i = 0; i < si.length; i++){
			var button = document.createElement("button")
			button.innerHTML = si[i].name
			var a = document.createElement("a")
			a.href = `/ranking?id=${si[i].id}`
			a.appendChild(button)

			document.getElementById("buttons").appendChild(a)
		}
	})
})
