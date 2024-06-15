<!DOCTYPE html>
<html lang="pt-vr">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, height=device-height" />
		<link rel="stylesheet" href="aluno.css" type="text/css"/>
		<title>Aluno - Método Pré-Vestibular</title>
		<link rel="icon" type="image/png" href="https://i.ibb.co/jryH3q8/Min-Branca.png">
	</head>
<body>
	<header class="navbar">
		<div class="container">
			<h1 class="logo2">Método Pré-Vestibular</h1>
			<ul class="nav-links" id="nav-links">
				<li><a href="/">Página Inicial</a></li>
				<li><a href="/sobre">Sobre</a></li>
				<li><a href="/simulados">Simulados</a></li>
				<li id="login"><a href="/login">Login</a></li>
				<li><img id="profile" src="https://voxnews.com.br/wp-content/uploads/2017/04/unnamed.png" alt="Foto de Perfil" class="profile-picture"></li>
			</ul>
		</div>
	</header>
	<div class="container2">
		<div class="wrapper fadeInDown">
			<div class="content-login">
				<img src="https://i.ibb.co/jryH3q8/Min-Branca.png" alt="Logo do Método Pré-Vestibular" class="logo">
				<h2 class="active"> Dados do(a) aluno(a) </h2>
				<div class="aviso"><p>Visualizar e/ou editar os dados. SE EDITAR, CLIQUE EM SALVAR PARA MANTER QUALQUER ALTERAÇÃO FEITA.</p></div>
				<form class="box-login" action="#" id="formcadastro">
					<label for="completename">Nome completo</label>
					<input type="text" id="completename" class="campo" name="completename" placeholder="Nome completo" required>

					<label for="nascimento">Data de Nascimento</label>
					<input type="date" id="nascimento" class="campo" name="nascimento" required>

					<label for="email">Email</label>
					<input type="email" id="email" class="campo" name="email" placeholder="Email" minlength="7">

					<label for="responsavel">Responsável</label>
					<input type="text" id="responsavel" class="campo" name="responsavel" placeholder="Responsável" required>

					<label for="rgresp">RG do Responsável</label>
					<input type="text" id="rgresp" class="campo" name="rgresp" placeholder="RG do Responsável" minLength="3" required>

					<label for="cpfresp">CPF do Responsável</label>
					<input type="text" id="cpfresp" class="campo" name="cpfresp" placeholder="CPF do Responsável" maxlength="14" minlength="14">

					<label for="telresp">Telefone do Responsável</label>
					<input type="text" id="telresp" class="campo" name="telresp" placeholder="Telefone do Responsável" maxLength="15" minLength="15" required>

					<label for="telal">Telefone do(a) aluno(a) (opcional)</label>
					<input type="text" id="telal" class="campo" name="telal" placeholder="Telefone do(a) aluno(a)" maxLength="15" minLength="15">

					<label for="endereco">Endereço</label>
					<input type="text" id="endereco" class="campo" name="endereco" placeholder="Endereço">

					<label for="bairro">Bairro</label>
					<input type="text" id="bairro" class="campo" name="bairro" placeholder="Bairro">

					<label for="cep">CEP</label>
					<input type="text" id="cep" class="campo" name="cep" placeholder="CEP" maxLength="9">

					<label for="dia">Dia de pagamento</label>
					<input type="number" id="dia" class="campo" name="dia" required>

					<label for="camisa">Tamanho da Camisa</label>
					<select id="camisa" name="camisa" class="form-input">
						<option value="n">Não solicitado</option>
						<option value="P">P</option>
						<option value="M">M</option>
						<option value="G">G</option>
						<option value="XG">XG</option>
					</select>

					<label for="bolsista">Aluno(a) bolsista?</label>
					<select id="bolsista" name="bolsista" class="form-input">
						<option value="n">Não</option>
						<option value="y">Sim</option>
						<option value="p">Parcial</option>
					</select>

					<label for="turma">Turma</label>
					<select id="turma" name="turma" class="form-input">
						<option value="1">1° Ano</option>
						<option value="2">2° Ano</option>
						<option value="3">Proj. Med. (3° +)</option>
					</select>

					<input type="button" class="botao" value="Deletar usuário 🗑️" id="delete">
					<input type="submit" class="botao" value="Salvar ✅" id="continuar">
					<input type="button" class="botao2" value="Voltar" id="voltar">
				</form>
				</div>
			</div>
		<div class="spacer"></div>
	</div>
	<script type="text/javascript" src="aluno.js"></script>
</body>
</html>
