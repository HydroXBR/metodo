/*
* Code by Isaías Nascimento - isaiasdesign03@gmail.com
* Last update:  29/08/2022
* Jesus loves you ♥
*/

const ec = txt => encodeURIComponent(txt)
const dec = txt => decodeURIComponent(txt)
const gebi = id => document.getElementById(id)
const gebc = c => document.getElementsByClassName(c)
const whatsappURL = 'https://api.whatsapp.com/send?phone=5592984507170&text=Oi%2C%20Isa%C3%ADas!%20Estou%20tendo%20d%C3%BAvidas%2Fproblemas%20com%20o%20Decifrando%20Matem%C3%A1tica.%20Poderia%20me%20ajudar%3F'
const container = gebc('container')[0]
let d1 = document.getElementsByClassName('rain') ? document.getElementsByClassName('rain')[0] : undefined


document.addEventListener('keydown', (event) => {
  var k = event.key
	
	if(k == 'Enter'){
		gebi("iniciar").click()
	}
}, false)

function htmlToDoc(markup) {
  var parser = new DOMParser()
  return parser.parseFromString(markup, "text/html")
}

if(d1){
	setTimeout(() => {
		let d1 = document.getElementsByClassName('rain')[0]
		let d2 = document.getElementsByClassName('lightining')[0]

		const cont = gebc('container')[0]
		const scr = gebi('script')
		document.body.removeChild(d1)
		document.body.removeChild(d2)
		document.body.removeChild(cont)
		document.body.removeChild(scr)
		
		let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches

		document.body.style['background-image'] = isMobile ? `url(https://i.ibb.co/1MkgLQM/C-pia-de-Decifrando-Matem-tica.gif)` : `url(https://i.ibb.co/275gGbS/Design-sem-nome.gif)`
		
		setTimeout(()=>{
			document.body.appendChild(cont)
			document.body.appendChild(scr)
			document.body.style['background-image'] = 'url(https://i.pinimg.com/originals/65/0b/41/650b41b78f1a18097d031c8a23de797e.jpg)'
		}, 20500)
	}, 4000)
}

// Functions - onClick Event Listeners
function iniciar(){
	return window.location.href = '/login.html'
}

function instrucoes(){
	return window.location.href = '/instrucoes.html'
}

function ranking(){
	return window.location.href = '/ranking.html'
}

function insta(){
	return window.open("https://www.instagram.com/decifrando_matematica/", "_blank")
}

function termos(){
	return window.location.href = '/termos.html'
}

function contato(){
	return window.location.href = whatsappURL
}

function sobre(){
	return window.location.href = '/sobre.html'
}