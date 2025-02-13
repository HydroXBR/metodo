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

		document.getElementById("name").innerText = userInfo.completename;
		
		async function getalunobynameadm(name){
			const response = await fetch(`/getalunobynameadm?name=${name}`)
			console.log("fetched aluno: ", name)
			const rr = await response
			if(!rr) return false
			return rr
		}

		async function getsimuladosbyname(name){
			const response = await fetch(`/getsimuladosbyname?name=${name}`)
			console.log("fetched aluno: ", name)
			const rr = await response
			if(!rr) return false
			return rr
		}

		function formatDate(isoDate) {
			const [year, month, day] = isoDate.split('-');
			return `${day}/${month}/${year}`;
		}

		async function simul(){
			const response = await fetch(`/varsimulados`)
			const rr = await response
			if(!rr) return false
			return rr.json()
		}


		async function fetchsimul(id){
			const response = await fetch(`/apiranking?sel=general&id=${id}`)
			const rr = await response
			if(!rr) return false
			return rr.json()
		}

		getalunobynameadm(userInfo.completename).then(async (response) => {
			const aluno = await response.json();
			if (aluno && Object.keys(aluno).length !== 0) { 
				document.getElementById("turma").innerText = aluno.turma == 3 ? "Projeto Medicina" : aluno.turma + "° Ano";
				document.getElementById("nasc").innerText = formatDate(aluno.nascimento)
				document.getElementById("resp").innerText = aluno.responsavel
				document.getElementById("telresp").innerText = aluno.telresp
				document.getElementById("diapgto").innerText = aluno.dia
			} else {
				alert("Ops! Verifique seu cadastro para uma experiência completa! Seu nome não foi encontrado na base de alunos Método.")
			}
		}).catch(error => {
			console.error("Erro ao buscar o aluno:", error);
		});

		getsimuladosbyname(userInfo.completename).then(async (response) => {
			const aluno = await response.json();
			const simuladosdiv = document.getElementById("simulados");
			if (aluno.success && Object.keys(aluno).length !== 0) {
				simul().then(simulados => {
					let loading1 = document.getElementById("loading1")
					simuladosdiv.removeChild(loading1)
					for(var i = 0; i < aluno.users.length; i++){
						console.log(aluno.users[i])
						let inforow = document.createElement("div")
						inforow.classList.add("info-row")
						let strong = document.createElement("strong")
						strong.innerText = simulados.find(simulado => simulado.id == aluno.users[i].simulado).name
						let a = document.createElement("a")
						a.href = `/desempenho?id=${aluno.users[i]._id}&simulado=${aluno.users[i].simulado}`
						a.innerText = "Ver meu desempenho"

						inforow.appendChild(strong)
						inforow.appendChild(a)
						simuladosdiv.appendChild(inforow)
					}

					let c = document.createElement("canvas")
					c.id = "graficous"
					simuladosdiv.appendChild(c)
				})

				async function history(name) {
					try{
						const simuladoss = await simul();
						const anteriores = simuladoss
						var data = [];

						var coresHex = {
							'azul': '#0000FF',
							'verde': '#008000',
							'vermelho': '#FF0000',
							'laranja': '#FFA500',
							'rosa': '#FFC0CB',
							'amarelo': '#FFFF00',
							'ciano': '#00FFFF'
						};

						const coresArray = Object.values(coresHex);
						function escolherCorAleatoria(array) {
							if (array.length >= coresArray.length) {
								throw new Error("Não há cores únicas disponíveis para selecionar.");
							}

							var corAleatoria;
							do {
								var indiceAleatorio = Math.floor(Math.random() * coresArray.length);
								corAleatoria = coresArray[indiceAleatorio];
							} while (array.find(e => e.color === corAleatoria));

							return corAleatoria;
						}

						function removerAcentos(str) {
							return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
						}

						const promises = anteriores.map(simulado => {
							return fetchsimul(simulado.id).then(anterior => {
								var anteriorAluno = anterior.find(e => removerAcentos(e.completename).toLowerCase() == removerAcentos(userInfo.completename).toLowerCase());

								if (anteriorAluno) {
									let obj = {
										label: anteriorAluno.simulado.date,
										realvalue: anteriorAluno.percent,
										value: `${anteriorAluno.percent}% (${anteriorAluno.pont}/${anteriorAluno.simulado.questions})`,
										color: escolherCorAleatoria(data)
									}

									data.push(obj);
								}
							});
						});

						await Promise.all(promises);

						if (data.length == 1) {
							gebi("graficous").style.display = "none";
							gebi("nota2").innerText = "Parabéns! É seu primeiro #Simulado registrado! Frequente todos os próximos simulados para que você compare a sua pontuação com os simulados anteriores :)"
						} else {
							graphus();
						}

						function graphus() {
							var canvas = document.getElementById('graficous');
							var ctx = canvas.getContext('2d');
							ctx.fillText("Comp. com simulados anteriores", canvas.width / 2.5, canvas.height - 10);
							var barWidth = 30;
							var barMargin = 40;
							var startX = 35;
							var startY = canvas.height - 50;

							var maxPercentage = Math.max(...data.map(item => item.realvalue));
							var maxBarHeight = canvas.height * 0.8; 
							var scale = maxBarHeight / maxPercentage;

							function parseDate(dateString) {
								let parts = dateString.split('-');
								let formattedDate = `${parts[1]}-${parts[0]}-${parts[2]}`;
								return new Date(formattedDate);
							}

							data.sort((a, b) => parseDate(a.label) - parseDate(b.label));

							for (var i = 0; i < data.length; i++) {
								var barHeight = data[i].realvalue * scale; 
								var x = startX + (barWidth + barMargin) * i; 
								var y = startY - barHeight;

								ctx.fillStyle = data[i].color;
								ctx.fillRect(x, y, barWidth, barHeight);

								var textWidth = ctx.measureText(data[i].label).width;
								var textX = x + (barWidth - textWidth) / 2; 
								var textY = y - 5;

								ctx.fillStyle = '#000';
								ctx.fillText(data[i].label, textX, startY + 20);
								ctx.fillText(data[i].value, textX, startY +10);
							}
						}
					} catch (error) {
						console.error("Erro ao carregar simulados:", error);
					}
				}

				history(userInfo.completename);
			} else {
				alert("Seu nome não foi encontrado na base de simulados. Se isso estiver errado, corrija seu nome na base do Método (ou mesmo nos simulados) entrando em contato com o Isaías ou Kerolainy.")
			}
		}).catch(error => {
			console.error("Erro ao buscar o aluno:", error);
		});
	} else {
		return window.location.href="/login"
	}
})
