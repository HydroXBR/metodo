async function addd(email, senha){
	const response = await fetch(`/logar?email=${email}&senha=${senha}`)
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

async function add(email, senha){
	await addd(email, senha).then(async response => {
		const rr = await response.json();
		console.log(rr);

		if(rr.success == false){
			alert("Usuário ou senha incorretos. Se você ainda não tem uma conta, cadastre-se. Se o erro persistir, entre em contato com Isaías.");
			console.log("Reason", rr.reason);
		} else {
			const user = User.fromJson(rr.user);
			user.saveToCookies(); 
			window.location.href = "/index.html";
		}
	});
}

document.addEventListener('DOMContentLoaded', function() {
	const form = document.getElementById('formlogin');

	form.addEventListener('submit', function(event) {
		event.preventDefault();
		const emailInput = document.getElementById('email')
		const senhaInput = document.getElementById('senha')

		add(emailInput.value, senhaInput.value)
	})
})