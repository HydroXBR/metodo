function pmaiuscula(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
}

const disciplinas = [
	{ value: "art", label: "Artes" },
	{ value: "port", label: "Português" },
	{ value: "mat", label: "Matemática" },
	{ value: "ucemat", label: "UCE (Matemática)" },
	{ value: "fis", label: "Física" },
	{ value: "hist", label: "História" },
	{ value: "ucahist", label: "UCA - Povos Amazônicos" },
	{ value: "socio", label: "Sociologia" },
	{ value: "geo", label: "Geografia" },
	{ value: "idama", label: "IDAMA" },
	{ value: "edfis", label: "Educação Física" },
	{ value: "ing", label: "Inglês" },
	{ value: "fil", label: "Filosofia" },
	{ value: "bio", label: "Biologia" },
	{ value: "ucabio", label: "UCA (Biologia)" },
	{ value: "quim", label: "Química" },
	{ value: "projv", label: "Projeto de Vida" }
];

function getLabelByValue(value) {
	const disciplina = disciplinas.find(disciplina => disciplina.value === value);
	return disciplina ? disciplina.label : null;
}

document.addEventListener('DOMContentLoaded', async function() {
	try {
		const response = await fetch('/tasks');
		const tasks = await response.json();
		tasks.sort((a, b) => b.entrega - a.entrega);
		
		tasks1 = tasks.filter(task => {
			const today = new Date();
			const todayOnlyDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
			const entregaDate = new Date(task.entrega);
			const entregaOnlyDate = new Date(entregaDate.getFullYear(), entregaDate.getMonth(), entregaDate.getDate());
			return entregaOnlyDate >= todayOnlyDate;
		});
		
		const tableBody = document.getElementById('tabela-tarefas');

		tasks1.forEach(task => {
			const row = tableBody.insertRow(0); 
			const tipoCell = row.insertCell(0);
			const tituloCell = row.insertCell(1);
			const disciplinaCell = row.insertCell(2);
			const pedidaCell = row.insertCell(3);
			const entregaCell = row.insertCell(4);
			const nivelCell = row.insertCell(5);

				

			const p = document.createElement("p");
			p.innerHTML = pmaiuscula(task.tipo)
			p.classList.add(`tipo-${task.tipo.toLowerCase()}`)
			p.classList.add(`tipo`)
			tipoCell.appendChild(p);
			
			const id = task._id
			const ae = document.createElement("a")
			ae.href = `/tarefa?id=${id}`
			ae.innerHTML = pmaiuscula(task.title)
						
			/*tipoCell.textContent = pmaiuscula(task.tipo)*/
			
			tituloCell.appendChild(ae)
			disciplinaCell.textContent = getLabelByValue(task.disc);
			pedidaCell.textContent = new Date(task.pedida).toLocaleDateString(); 
			entregaCell.textContent = new Date(task.entrega).toLocaleDateString();
			nivelCell.textContent = task.nivel;
		});

		// TABELA DOISSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
		tasks2 = tasks.filter(task => {
			const today = new Date();
			const todayOnlyDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
			const entregaDate = new Date(task.entrega);
			const entregaOnlyDate = new Date(entregaDate.getFullYear(), entregaDate.getMonth(), entregaDate.getDate());
			return entregaOnlyDate < todayOnlyDate;
		});

		const tableBody2 = document.getElementById('tabela-anteriores');
		tasks2.forEach(task => {
			const row2 = tableBody2.insertRow(0); 
			const tipoCell2 = row2.insertCell(0);
			const tituloCell2 = row2.insertCell(1);
			const disciplinaCell2 = row2.insertCell(2);
			const pedidaCell2 = row2.insertCell(3);
			const entregaCell2 = row2.insertCell(4);
			const nivelCell2 = row2.insertCell(5);

			const id2 = task._id
			const ae2 = document.createElement("a")
			ae2.href = `/tarefa?id=${id2}`
			ae2.innerHTML = pmaiuscula(task.title)

			const p1 = document.createElement("p");
			p1.innerHTML = pmaiuscula(task.tipo)
			p1.classList.add(`tipo-${task.tipo.toLowerCase()}`)
			p1.classList.add(`tipo`)
			tipoCell2.appendChild(p1);
			
			tituloCell2.appendChild(ae2)
			disciplinaCell2.textContent = getLabelByValue(task.disc);
			pedidaCell2.textContent = new Date(task.pedida).toLocaleDateString(); 
			entregaCell2.textContent = new Date(task.entrega).toLocaleDateString();
			nivelCell2.textContent = task.nivel;
		});
	}catch (err){
		console.error('Erro ao obter dados das tarefas:', err);
	}

	// TABELAAAAAAAA
	try {
		const response = await fetch('/lembretes'); 
		const lembretes = await response.json();

		const containerLembretes = document.getElementById('container-lembretes');
		containerLembretes.innerHTML = ''; 

		function formatarData2(data) {
			const ano = data.getFullYear();
			const mes = data.getMonth() + 1; 
			const dia = data.getDate();

			const anoFormatado = String(ano).padStart(4, '0');
			const mesFormatado = String(mes).padStart(2, '0');
			const diaFormatado = String(dia).padStart(2, '0');

			const dataFormatada = `${anoFormatado}-${mesFormatado}-${diaFormatado}`;

			return dataFormatada;
		}

		const hoje = new Date();
		const hojet = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
		const lembretesHoje = lembretes.filter(lembrete => formatarData2(new Date()) == lembrete.date)

		const amanha = new Date();
		amanha.setDate(hoje.getDate() + 1);

		const diaAmanha = amanha.getDate();
		const mesAmanha = amanha.getMonth() + 1;
		const diaSemanaAmanha = amanha.getDay()

		if ((diaAmanha === 5 || diaAmanha === 20) && diaSemanaAmanha !== 0 && diaSemanaAmanha !== 6) {
			const lembreteAutomatico = {
				title: "Revista de Cabelo",
				desc: "Amanhã tem revista de cabelo masculina!"
			};
			lembretesHoje.push(lembreteAutomatico);
		}

		if (lembretesHoje.length > 0) {
			const strong = document.createElement("strong");
			strong.innerHTML = "⚠️ Lembretes extra"
			containerLembretes.appendChild(strong);
			lembretesHoje.forEach(lembrete => {
					
				const divLembrete = document.createElement('div');
				divLembrete.classList.add('lembrete');

				const titulo = document.createElement('strong');
				titulo.textContent = lembrete.title;

				const descricao = document.createElement('span');
				descricao.textContent = ' | ' + lembrete.desc;

				divLembrete.appendChild(titulo);
				divLembrete.appendChild(descricao);

				containerLembretes.appendChild(divLembrete);
		});
		} else {
			containerLembretes.style.display = 'none';
		}
	} catch (error) {
			console.error('Erro ao obter lembretes:', error);
	}
});