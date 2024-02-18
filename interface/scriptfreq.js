/*
* Code by Isaías Nascimento - isaiasdesign03@gmail.com
* Last update:  22/05/2023
* Jesus loves you ♥
*/

const gebi = id => document.getElementById(id)
const ec = txt => encodeURIComponent(txt)
const dec = txt => decodeURIComponent(txt)

const continuar = gebi("continuar")

function removeError(element){
	element.addEventListener("click", function(event){
		if(this.classList.contains("error")){
			this.classList.remove("error")
		}
	})

	return true
}

const alunos = [
  {
    "completename": "Adllynes Santos da Silva Avelino",
    "status": "on",
    "sabado": false,
    "abr": "Adllynes Santos"
  },
  {
    "completename": "Alana Larissa Rebouças",
    "status": "on",
    "sabado": false,
    "abr": "Alana Larissa"
  },
  {
    "completename": "Ana Cristina de Carvalho Lopes",
    "status": "on",
    "sabado": false,
    "abr": "Ana Cristina"
  },
  {
    "completename": "Ana Luiza Sena de Vasconcelos",
    "status": "on",
    "sabado": false,
    "abr": "Ana Luiza"
  },
  {
    "completename": "Andrews Mitchell Braga Santos",
    "status": "on",
    "sabado": false,
    "abr": "Andrews Mitchell"
  },
  {
    "completename": "Anna Luiza Jaques Ramos",
    "status": "on",
    "sabado": false,
    "abr": "Anna Jaques"
  },
  {
    "completename": "Beatriz Morais Coelho da Silva",
    "status": "on",
    "sabado": false,
    "abr": "Beatriz Morais"
  },
  {
    "completename": "Bryan Eduardo De Souza Da Silva ",
    "status": "on",
    "sabado": false,
    "abr": "Bryan Eduardo"
  },
  {
    "completename": "Caleb Alves da Silva",
    "status": "on",
    "sabado": false,
    "abr": "Caleb Alves"
  },
  {
    "completename": "Calebe Batista Ramos",
    "status": "on",
    "sabado": false,
    "abr": "Calebe Batista"
  },
  {
    "completename": "Camila Jhennifer Silva Soares",
    "status": "on",
    "sabado": false,
    "abr": "Camila Jhennifer"
  },
  {
    "completename": "Carlos Diego Chaves Monteiro",
    "status": "on",
    "sabado": false,
    "abr": "Carlos Diego"
  },
  {
    "completename": "Carlos Eduardo Pereira Gomes",
    "status": "on",
    "sabado": false,
    "abr": "Carlos Eduardo"
  },
  {
    "completename": "Chayanne Brasil Rodrigues",
    "status": "on",
    "sabado": false,
    "abr": "Chayanne Brasil"
  },
  {
    "completename": "Deborah Portela da Silva",
    "status": "on",
    "sabado": false,
    "abr": "Deborah Portela"
  },
  {
    "completename": "Eduarda Pinheiro Bonfim",
    "status": "on",
    "sabado": false,
    "abr": "Eduarda Pinheiro"
  },
  {
    "completename": "Eduardo Silva Rossoni",
    "status": "on",
    "sabado": false,
    "abr": "Eduardo Silva"
  },
  {
    "completename": "Emanuelle Tavares da Silva",
    "status": "on",
    "sabado": false,
    "abr": "Emanuelle Tavares"
  },
	{
    "completename": "Emilly da Silva Lira",
    "status": "on",
    "sabado": false,
    "abr": "Emilly Lira"
  },
  {
    "completename": "Emilly Taynara da Cruz Cruz",
    "status": "on",
    "sabado": false,
    "abr": "Emilly Taynara"
  },
  {
    "completename": "Emmanuel Silva Melo",
    "status": "on",
    "sabado": false,
    "abr": "Emmanuel Silva"
  },
  {
    "completename": "Emyle Gabrielly Guedes de Matos ",
    "status": "on",
    "sabado": false,
    "abr": "Emyle Gabrielly"
  },
  {
    "completename": "Gabrielly Barbosa Feitoza",
    "status": "on",
    "sabado": false,
    "abr": "Gabrielly Barbosa"
  },
  {
    "completename": "Hilton Gabriel Lopes Barbosa",
    "status": "on",
    "sabado": false,
    "abr": "Hilton Gabriel"
  },
  {
    "completename": "Ian Felipe Machado Coelho",
    "status": "on",
    "sabado": false,
    "abr": "Ian Felipe"
  },
  {
    "completename": "Irna Jordão Marques",
    "status": "on",
    "sabado": false,
    "abr": "Irna Jordão"
  },
  {
    "completename": "Isaías Francisco da Silva do Nascimento",
    "status": "on",
    "sabado": false,
    "abr": "Isaías Francisco"
  },
  {
    "completename": "Isis Jordão Marques",
    "status": "on",
    "sabado": false,
    "abr": "Isis Jordão"
  },
  {
    "completename": "Joana Victoria Souza Pereira",
    "status": "on",
    "sabado": false,
    "abr": "Joana Victoria"
  },
  {
    "completename": "João Lucas Oliveira",
    "status": "on",
    "sabado": false,
    "abr": "João Lucas"
  },
  {
    "completename": "João Victor Aguiar de Moraes",
    "status": "on",
    "sabado": false,
    "abr": "João Aguiar"
  },
	{
    "completename": "João Victor da Silva Sampaio",
    "status": "on",
    "sabado": false,
    "abr": "João Sampaio"
  },
  {
    "completename": "Joaquim Cruz Melo",
    "status": "on",
    "sabado": false,
    "abr": "Joaquim Cruz"
  },
  {
    "completename": "José Henrique Matos de Almeida ",
    "status": "on",
    "sabado": false,
    "abr": "José Henrique"
  },
  {
    "completename": "Kamille de Souza Ataide",
    "status": "on",
    "sabado": false,
    "abr": "Kamille Souza"
  },
  {
    "completename": "Larissa Meneses de Oliveira",
    "status": "on",
    "sabado": false,
    "abr": "Larissa Meneses"
  },
  {
    "completename": "Lara Isper do Amaral",
    "status": "on",
    "sabado": false,
    "abr": "Lara Isper"
  },
	{
    "completename": "Letícia de Assis Marinho",
    "status": "on",
    "sabado": false,
    "abr": "Letícia de Assis"
  },
  {
    "completename": "Luana Dias Pereira",
    "status": "on",
    "sabado": false,
    "abr": "Luana Dias"
  },
  {
    "completename": "Lucas Daniel Teixeira de Lima",
    "status": "on",
    "sabado": false,
    "abr": "Lucas Daniel"
  },
  {
    "completename": "Lucas Meireles Prestes",
    "status": "on",
    "sabado": false,
    "abr": "Lucas Meireles"
  },
  {
    "completename": "Lukas Gabriel Lima Pinto",
    "status": "on",
    "sabado": false,
    "abr": "Lukas Gabriel"
  },
  {
    "completename": "Luís Antônio Cezário Rocha",
    "status": "on",
    "sabado": false,
    "abr": "Luís Antônio"
  },
  {
    "completename": "Luiz Carlos Bastista de Alencar",
    "status": "on",
    "sabado": false,
    "abr": "Luiz Carlos"
  },
  {
    "completename": "Luiz Gustavo Silva Santiago",
    "status": "on",
    "sabado": false,
    "abr": "Luiz Gustavo"
  },
	{
    "completename": "Luziana Stephany da Silva",
    "status": "on",
    "sabado": false,
    "abr": "Luziana Stephany"
  },
  {
    "completename": "Maria Clara Pinheiro de Oliveira",
    "status": "on",
    "sabado": false,
    "abr": "Maria Clara"
  },
  {
    "completename": "Maria Eduarda dos Anjos Campos",
    "status": "on",
    "sabado": true,
    "abr": "Maria Eduarda"
  },
  {
    "completename": "Mário Henrique da Costa Freire",
    "status": "on",
    "sabado": false,
    "abr": "Mário Henrique"
  },
  {
    "completename": "Myrianne Ferreira Carvalho",
    "status": "on",
    "sabado": false,
    "abr": "Myrianne Ferreira"
  },
	{
    "completename": "Nathália Brito de Freitas",
    "status": "on",
    "sabado": false,
    "abr": "Nathália Brito"
  },
  {
    "completename": "Nicole de Souza Maciel",
    "status": "on",
    "sabado": false,
    "abr": "Nicole Souza"
  },
  {
    "completename": "Nicolly Franco Otapiassis",
    "status": "on",
    "sabado": false,
    "abr": "Nicolly Franco"
  },
	{
    "completename": "Pâmella Vitória do Nascimento Lima",
    "status": "on",
    "sabado": false,
    "abr": "Pâmella Vitória"
  },
	{
    "completename": "Paulo André de Albuquerque Souza",
    "status": "on",
    "sabado": false,
    "abr": "Paulo André"
  },
  {
    "completename": "Paulo Eduardo Brandão de Oliveira",
    "status": "on",
    "sabado": false,
    "abr": "Paulo Eduardo"
  },
  {
    "completename": "Pedro Henrique Silva de Araújo Lima",
    "status": "on",
    "sabado": false,
    "abr": "Pedro H. Araújo"
  },
  {
    "completename": "Pedro Henrique Oliveira da Silva",
    "status": "on",
    "sabado": false,
    "abr": "Pedro H. Oliveira"
  },
  {
    "completename": "Pedro Lucas Maia Sousa",
    "status": "on",
    "sabado": false,
    "abr": "Pedro Lucas"
  },
  {
    "completename": "Rebbekah Gabrielle da Silva Gurgel ",
    "status": "on",
    "sabado": false,
    "abr": "Rebbekah Gabrielle"
  },
  {
    "completename": "Rebeka Jeshua de Castro Veras",
    "status": "on",
    "sabado": false,
    "abr": "Rebeka Jeshua"
  },
  {
    "completename": "Safira Tomiko Alencar",
    "status": "on",
    "sabado": false,
    "abr": "Safira Tomiko"
  },
  {
    "completename": "Sara Cristina da Costa Mar",
    "status": "on",
    "sabado": false,
    "abr": "Sara Mar"
  },
  {
    "completename": "Sara Cristina Lemos",
    "status": "on",
    "sabado": false,
    "abr": "Sara Lemos"
  },
  {
    "completename": "Sarah Camille Rachid de Souza",
    "status": "on",
    "sabado": false,
    "abr": "Sarah Camille"
  },
  {
    "completename": "Silas Santos Araújo",
    "status": "on",
    "sabado": false,
    "abr": "Silas Santos"
  },
	{
    "completename": "Raissa Silva da Penha",
    "status": "on",
    "sabado": false,
    "abr": "Raissa Penha"
  },
	{
    "completename": "Thiago Lopes de Souza Filho",
    "status": "on",
    "sabado": false,
    "abr": "Thiago Lopes"
  },
  {
    "completename": "Thicyane Fernanda de Souza Aguiar",
    "status": "on",
    "sabado": false,
    "abr": "Thicyane Fernanda"
  },
  {
    "completename": "Valentina Fonseca Marinho",
    "status": "on",
    "sabado": false,
    "abr": "Valentina Fonseca"
  },
  {
    "completename": "Vitória Moraes de Albuquerque",
    "status": "on",
    "sabado": false,
    "abr": "Vitória Moraes"
  },
	{
    "completename": "Vitória Ribeiro Dias",
    "status": "on",
    "sabado": false,
    "abr": "Vitória Ribeiro"
  },
  {
    "completename": "Vitória Yasmin Xavier de Araújo",
    "status": "on",
    "sabado": false,
    "abr": "Vitória Yasmin"
  },
  {
    "completename": "Viviane Arévalo Moreira Souza",
    "status": "on",
    "sabado": false,
    "abr": "Viviane Arévalo"
  },
	{
    "completename": "Yoseph Ferreira Brandão",
    "status": "on",
    "sabado": false,
    "abr": "Yoseph Ferreira"
  },
  {
    "completename": "Yuri Silveira de Carvalho",
    "status": "on",
    "sabado": false,
    "abr": "Yuri Silveira"
  }
]


function generateMessage(){
	let faltas = gebi("faltas").value
	let faltasinfo = gebi("faltasinfo").value
	
	const faltou = /\n/gmi.test(faltas) ? faltas.split(/\n/gmi) : faltas.split(/[a-z][A-Z]/gmi)
	const faltouinfo = /\n/gmi.test(faltasinfo) ? faltasinfo.split(/\n/gmi) : faltasinfo.split(/[a-z][A-Z]/gmi)

	var textf = "";
	var textfj = "";

	var semana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
	var d = new Date()
	var day = d.getDate()
	var month = d.getMonth()
	var dayweek = d.getDay()

	var listaf = [];
	for(var i = 0; i<faltou.length; i++){
		if(dayweek !== 6){
			var filter = alunos.filter(a => a.completename == faltou[i] && a.status == "on" && a.sabado == false) 

			if(filter) for(var j=0;j<filter.length;j++){listaf.push(filter[j].abr)}
		}else{
			var filter = alunos.filter(a => a.completename == faltou[i] && a.status == "on")
				
			if(filter) for(var j=0;j<filter.length;j++){listaf.push(filter[j].abr)}
		}
	}
	textf = listaf.join("\n") || ""

	var listafj = [];
	for(var i = 0; i<faltouinfo.length; i++){
		if(dayweek !== 6){
			var filter = alunos.filter(a => a.completename == faltouinfo[i] && a.status == "on" && a.sabado == false)

			if(filter) for(var j=0;j<filter.length;j++){listafj.push(filter[j].abr)}
		}else{
			var filter = alunos.filter(a => a.completename == faltouinfo[i] && a.status == "on")
				
			if(filter) for(var j=0;j<filter.length;j++){listafj.push(filter[j].abr)}
		}
	}
	textfj = listafj.join("\n") || ""

	let addZero = num => Number(num) < 10 ? "0"+ num : num

	return `📋 *Relatório de Ausências*
📆 *Data:* ${semana[d.getDay()]}, ${addZero(day)}/${addZero(month+1)}/2023

🔴 *Faltas (${listaf.length})*
${textf}\n
🟡 *Faltas informadas pelos responsáveis (${listafj.length})*
${textfj}`
}

continuar.addEventListener("click", function(event){
	removeError(faltas)
	removeError(faltasinfo)

	let t = generateMessage()
		
	function textToClipboard (text) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
	}

	textToClipboard(t)

	alert("Texto copiado!")
})

gebi("wpp").addEventListener("click", function(event){
	removeError(faltas)
	removeError(faltasinfo)

	let t = generateMessage()
		
	window.location.href = "https://api.whatsapp.com/send?phone=+5592984507170&text="+ec(t)
})