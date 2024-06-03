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
		Cookie.set("loggedIn", "true", 1)
		Cookie.set("userEmail", this.email, 1)
		Cookie.set("userPermissions", this.permissions, 1)
		Cookie.set("userProfilePicture", this.profilePicture, 1)
		Cookie.set("completename", this.completename, 1)
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
			}
		} else {
			return null
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
	)
}

function addAnimationOnScroll() {
	var animatedElements = document.querySelectorAll('.animated');
	animatedElements.forEach(function(el) {
		if (isElementInViewport(el)) {
			el.classList.add('fadeIn');
		}
	})
}

window.addEventListener('scroll', addAnimationOnScroll);

document.addEventListener('DOMContentLoaded', function(){
	/*if (User.isLoggedIn()) {
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
	}*/

	const ec = txt => encodeURIComponent(txt)
	const dec = txt => decodeURIComponent(txt)
	const gebi = id => document.getElementById(id)
	const gebc = c => document.getElementsByClassName(c)
	const voltar = gebi("voltar");
	const prob = gebi("prob");

	const cid = new URL(window.location.href).searchParams.get("id")
	if(!cid){
		alert("Erro ao carregar dados. Contate o administrador.")
		window.location.href = '/ranking.html'
	}
	
	const id = new URL(window.location.href).searchParams.get("id")
	const idsimulado = new URL(window.location.href).searchParams.get("simulado")

	const round = (num, places) => {
		if (!("" + num).includes("e")) {
			return +(Math.round(num + "e+" + places)  + "e-" + places);
		} else {
			let arr = ("" + num).split("e");
			let sig = ""
			if (+arr[1] + places > 0) {
				sig = "+";
			}

			return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + places)) + "e-" + places);
		}
	}

	async function getuser() {
		const response = await fetch(`/apiranking?sel=general&id=${idsimulado}`)
		const rrr = await response.json()

		const r = rrr.filter(a => a.id == id)
		let rr = r[0]
		if(!rr) return alert("Usuário não encontrado! Contate Isaías Nascimento para mais informações.") 
		rr.total = rr.port + rr.lit + rr.hist + rr.fis + rr.quim + rr.bio + rr.geo + rr.mat;

		gebi("name").innerHTML = rr.completename
		gebi("serie").innerHTML = Number(rr.turma) > 3 ? `${Number(rr.turma) - 3}° ano` : `${Number(rr.turma)}° ano`  

		gebi("title").innerHTML = rr.simulado.name + ` (${rr.simulado.date.replace(/\-/gmi, "/")})`
		voltar.addEventListener('click', function(event){
			window.location.href = `/ranking?id=${rr.simulado.id}`
		})
		prob.addEventListener('click', function(event){
			window.location.href = `https://api.whatsapp.com/send?phone=559284507170&text=Ol%C3%A1%2C%20Isa%C3%ADas!%20Sou%20${rr.completename}%2C%20e%20estou%20com%20d%C3%BAvidas%2Fproblemas%20em%20rela%C3%A7%C3%A3o%20ao%20simulado%20de%20ID%20${idsimulado}. %20(N%C3%83O%20APAGAR!)`
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
						var anteriorAluno = anterior.find(e => removerAcentos(e.completename).toLowerCase() == removerAcentos(rr.completename).toLowerCase());
						
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

				var canvas2 = document.getElementById('radarChart');
				var ctx2 = canvas2.getContext('2d');

				var data2 = [	];
				const promises2 = anteriores
					.filter(simulado => simulado.id === rr.simulado.id) 
					.map(simulado => {
						return fetchsimul(simulado.id).then(anterior => {
							var anteriorAluno = anterior.find(e => e.completename == rr.completename);
							if (anteriorAluno) {
								var org = anteriorAluno.simulado.organization
								for(var i = 0; i < org.length; i++){
									let objj = {
										value: (anteriorAluno[org[i].materia]/org[i].q)*100, 
										materia: org[i].name
									}

									data2.push(objj)
								}
							}
						})
					})

				await Promise.all(promises2);

				var legends = data2.map(item => item.materia);

				var centerX = canvas2.width / 2;
				var centerY = canvas2.height / 2;
				var radius = Math.min(centerX, centerY) * 0.8;
				var numCategories = data2.length;
				var angleIncrement = (2 * Math.PI) / numCategories;

				function drawRadarChart() {
					ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

					ctx2.beginPath();
					for (var i = 0; i < numCategories; i++) {
						var angle = i * angleIncrement;
						var x = centerX + Math.cos(angle) * radius;
						var y = centerY + Math.sin(angle) * radius;
						ctx2.lineTo(x, y);

						var legendX = x; 
						var legendY = y; 
						
						if (x < centerX) {
							legendX -= ctx2.measureText(legends[i]).width;
						}
						if (y > centerY) {
							legendY += 10; 
						}
						ctx2.fillText(legends[i], legendX, legendY);
					}
					
					ctx2.closePath();
					ctx2.strokeStyle = 'black';
					ctx2.stroke();

					ctx2.beginPath();
					for (var i = 0; i < numCategories; i++) {
						var angle = i * angleIncrement;
						var value = data2[i].value;
						var normalizedValue = (value / 100) * radius;
						var x = centerX + Math.cos(angle) * normalizedValue;
						var y = centerY + Math.sin(angle) * normalizedValue;
						if (i === 0) {
							ctx2.moveTo(x, y);
						} else {
							ctx2.lineTo(x, y);
						}
					}
						
					ctx2.closePath();
					ctx2.fillStyle = 'rgba(255, 0, 0, 0.5)';
					ctx2.fill();
				}

				drawRadarChart();
			} catch (error) {
				console.error("Erro ao carregar simulados:", error);
			}
		}

		history(rr.completename);

		async function espelho(){
			var body = gebi('center')
			var tbl = document.createElement("table");
			tbl.classList.add('tablecenter')
			tbl.id = "tabela"
			tbl.style.align = 'center'
			var tblBody = document.createElement("tbody");
			var selected = rr.simulado.answers.find(e=>e.turma == Number(rr.turma)).respostas
			var ans = rr.letras

			var special = rr.simulado.special
			var mat = rr.simulado.matspecial

			function create(){
				var newRow = document.createElement('tr')
				var newCell = document.createElement('td')
				newCell.style.align = 'center'
				var ncText = document.createElement('strong')
				ncText.innerText = 'N°⠀⠀'
				newCell.appendChild(ncText)
				newRow.appendChild(newCell)

				var newCell1 = document.createElement('td')
				var ncText1 = document.createElement('strong')
				ncText1.innerText= 'Gabarito oficial'
				newCell1.appendChild(ncText1)
				newRow.appendChild(newCell1)

				var newCell2 = document.createElement('td')
				var ncText2 = document.createElement('strong')
				ncText2.innerText = 'Resposta aluno(a)'
				newCell2.appendChild(ncText2)
				newRow.appendChild(newCell2)

				var newCell3 = document.createElement('td')
				var ncText3 = document.createElement('strong')
				ncText3.innerText = 'Resultado'
				newCell3.appendChild(ncText3)
				newRow.appendChild(newCell3)

				tblBody.appendChild(newRow)

				for (var i = 0; i < selected.length + 8; i++) {
					var row = document.createElement("tr");
					var reali = i;
					switch(true) {
						case (i <= 0):
							reali = 0;
							break;
						case (i >= 1 && i <= rr.simulado.special[1]-1):
							reali = i;
							break;
						case (i >= rr.simulado.special[1] && i <= rr.simulado.special[2]-1):
							reali = i - 1;
							break;
						case (i >= rr.simulado.special[2] && i <= rr.simulado.special[3]-1):
							reali = i - 2;
							break;
						case (i >= rr.simulado.special[3] && i <= rr.simulado.special[4]-1):
							reali = i - 3;
							break;
						case (i >= rr.simulado.special[4] && i <= rr.simulado.special[5]-1):
							reali = i - 4;
							break;
						case (i >= rr.simulado.special[5] && i <= rr.simulado.special[6]-1):
							reali = i - 5;
							break;
						case (i >= rr.simulado.special[6] && i <= rr.simulado.special[7]-1):
							reali = i - 6;
							break;
						case (i >= rr.simulado.special[7]):
							reali = i - 7;
							break;
					}

					for (var j = 0; j < 1; j++) {
						var cell = document.createElement("td");
						var cellText = document.createElement('a')
						if (special.includes(i)) {
							var td = document.createElement("td");
							td.setAttribute("colspan", "4"); 
							td.classList.add("materia")
							cellText.innerText = mat.find(m => m.special == i).materia
							td.appendChild(cellText); 
							row.appendChild(td); 
						} else {
							cellText.innerText = reali
							cell.classList.add("num");
							cell.appendChild(cellText);
							row.appendChild(cell);
						}
					}

					for (var a = 0; a < 1; a++) {
						if(!special.includes(i)){
							var cella = document.createElement("td");
							var cellTexta = document.createElement('a')
							cellTexta.classList.add("gab")
							cellTexta.innerText = selected[reali-1]
							cellTexta.id = `gab${reali-1}`
							cellTexta.style.color = "#000000"


							cella.appendChild(cellTexta);
							cella.classList.add("correct")
							row.appendChild(cella);
						}
					}

					for (var e = 0; e < 1; e++) {
						if(!special.includes(i)){
							var cell1 = document.createElement("td");
							cell1.classList.add("resp")
							let inn = document.createElement("a")
							inn.id = `answeruser${reali-1}`
							inn.innerText = ans[reali-1]

							cell1.appendChild(inn)
							row.appendChild(cell1);
						}
					}

					for (var o = 0; o < 1; o++) {
						if(!special.includes(i)){
							var cell2 = document.createElement("td");
							var cellText2 = document.createElement('p')
							cellText2.classList.add("correctcheck")
							cellText2.id = `correct${reali}`

							cell2.appendChild(cellText2);
							row.appendChild(cell2);
						}
					}

					tblBody.appendChild(row);
				}

				tbl.appendChild(tblBody);
				body.appendChild(tbl)
			}

			create()
		}

		espelho().then(e => {
			const alogs = document.querySelectorAll(".num")
			for (var o = 0; o < alogs.length; o++){
				let idd = o+1
				const tselector = gebi(`gab${o}`)
				const ans = gebi(`answeruser${o}`)

				if(tselector.innerText == ans.innerText){
					gebi(`correct${idd}`).innerText = "✔️"
				}else if(tselector.innerText == "X"){
					tselector.innerText = "X"
					tselector.style.color = 'red'
					gebi(`correct${idd}`).innerText = "✔️"
				}else{
					gebi(`correct${idd}`).innerText = "❌"
				}
			}
		})
		
		function preencherGraficos() {
			const materias = []
			let org = rr.simulado.organization
			for(var i = 0; i < org.length; i++){
				let obj = {mat: org[i].materia, pont: rr[org[i].materia], total: org[i].q, comp: org[i].name}
				materias.push(obj)
			}

			materias.forEach(materia => {
				materia.porcentagem = (materia.pont / materia.total) * 100;
			});

			const maxPorcentagem = Math.max(...materias.map(materia => materia.porcentagem));

			const materiasDestaque = materias.filter(materia => materia.porcentagem === maxPorcentagem);

			for(var i = 0; i < materiasDestaque.length; i++){
				let dt = gebi("destaques")
				let span = document.createElement("span")
				span.innerText = materiasDestaque[i].comp
				span.classList.add("destaque")
				dt.appendChild(span)
				dt.appendChild(document.createElement("br"))
			}

			for(var i = 0; i<materias.length;i++){
				const medidor = gebi("idg"+materias[i].mat);
				medidor.style.width = round(materias[i].pont/materias[i].total*100,2) + '%';
				gebi("pc"+materias[i].mat).innerHTML = round(materias[i].pont/materias[i].total*100,2) + "%";

				gebi("desc"+materias[i].mat).innerHTML = `${materias[i].pont} de ${materias[i].total}`
			}

			const medidortotal = document.getElementById("idgtotal");

			medidortotal.style.width = (rr.total/rr.simulado.questions)*100 + '%';

			document.getElementById("pctotal").innerHTML = round(((rr.total)/54)*100,2) + '%';
			gebi("desctotal").innerHTML = `${rr.total} de ${rr.simulado.questions}`
		}

		preencherGraficos()
	}

	getuser()

})
