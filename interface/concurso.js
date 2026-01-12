document.addEventListener('DOMContentLoaded', function () {
    // Configurações
    const API_BASE_URL = '/api/concursos';
    let currentStep = 1;
    let notasVestibulares = [];
    let notasRedacao = [];

    // Elementos DOM
    const form = document.getElementById('formInscricao');
    const steps = document.querySelectorAll('.form-step');
    const stepButtons = document.querySelectorAll('.step');
    const successMessage = document.getElementById('successMessage');
    const motivacaoTextarea = document.getElementById('motivacao');
    const charCount = document.getElementById('charCount');
    
    // Inicializar máscaras
    inicializarMascaras();
    
    // Inicializar controles
    inicializarVestibularControles();
    
    // Event Listeners
    motivacaoTextarea.addEventListener('input', atualizarContadorCaracteres);
    form.addEventListener('submit', enviarInscricao);
    
    // Botões de navegação
    document.querySelectorAll('.btn-next').forEach(btn => {
        btn.addEventListener('click', function() {
            const nextStep = parseInt(this.dataset.next);
            irParaStep(nextStep);
        });
    });
    
    document.querySelectorAll('.btn-prev').forEach(btn => {
        btn.addEventListener('click', function() {
            const prevStep = parseInt(this.dataset.prev);
            irParaStep(prevStep);
        });
    });

    // Inicializar step 1
    irParaStep(1);

    function inicializarMascaras() {
        // Máscara para CPF
        const cpfInput = document.getElementById('cpf');
        if (cpfInput) {
            cpfInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 11) value = value.substring(0, 11);
                
                value = value.replace(/(\d{3})(\d)/, '$1.$2');
                value = value.replace(/(\d{3})(\d)/, '$1.$2');
                value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
                
                e.target.value = value;
            });
        }

        // Máscara para telefone
        const telefoneInput = document.getElementById('telefone');
        if (telefoneInput) {
            telefoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 11) value = value.substring(0, 11);
                
                if (value.length <= 10) {
                    value = value.replace(/(\d{2})(\d)/, '($1) $2');
                    value = value.replace(/(\d{4})(\d)/, '$1-$2');
                } else {
                    value = value.replace(/(\d{2})(\d)/, '($1) $2');
                    value = value.replace(/(\d{5})(\d)/, '$1-$2');
                }
                
                e.target.value = value;
            });
        }
    }

    function inicializarVestibularControles() {
        // Toggle PSC
        const fezPSC = document.getElementById('fezPSC');
        const pscFields = document.getElementById('pscFields');
        
        if (fezPSC && pscFields) {
            fezPSC.addEventListener('change', function() {
                pscFields.style.display = this.checked ? 'block' : 'none';
                if (this.checked) {
                    atualizarCamposPSC();
                } else {
                    notasVestibulares = notasVestibulares.filter(n => !n.nome.startsWith('PSC'));
                }
            });
        }

        // Toggle SIS
        const fezSIS = document.getElementById('fezSIS');
        const sisFields = document.getElementById('sisFields');
        const redacaoSection = document.getElementById('redacaoSection');
        
        if (fezSIS && sisFields && redacaoSection) {
            fezSIS.addEventListener('change', function() {
                sisFields.style.display = this.checked ? 'block' : 'none';
                const serie = document.getElementById('serieAtual').value;
                redacaoSection.style.display = (this.checked && (serie === '2º Ano EM' || serie === '3º Ano EM')) ? 'block' : 'none';
                
                if (this.checked) {
                    atualizarCamposSIS();
                    if (serie === '3º Ano EM' || serie === '4º Ano EM') {
                        atualizarCamposRedacao();
                    }
                } else {
                    notasVestibulares = notasVestibulares.filter(n => !n.nome.startsWith('SIS'));
                    notasRedacao = [];
                }
            });
        }

        // Monitorar mudança na série para atualizar campos
        const serieSelect = document.getElementById('serieAtual');
        if (serieSelect) {
            serieSelect.addEventListener('change', function() {
                const serie = this.value;
                const fezSISChecked = document.getElementById('fezSIS')?.checked;
                
                // Atualizar campos de PSC
                if (document.getElementById('fezPSC')?.checked) {
                    atualizarCamposPSC();
                }
                
                // Atualizar campos de SIS
                if (fezSISChecked) {
                    atualizarCamposSIS();
                    
                    // Mostrar/ocultar seção de redação
                    const redacaoSection = document.getElementById('redacaoSection');
                    if (redacaoSection) {
                        redacaoSection.style.display = (serie === '3º Ano EM' || serie === '4º Ano EM') ? 'block' : 'none';
                        if (serie === '3º Ano EM' || serie === '4º Ano EM') {
                            atualizarCamposRedacao();
                        }
                    }
                }
            });
        }
    }

    function atualizarCamposPSC() {
        const serie = document.getElementById('serieAtual').value;
        const pscNotasGrid = document.getElementById('pscNotasGrid');
        
        if (!pscNotasGrid) return;
        
        pscNotasGrid.innerHTML = '';
        let vestibularesPSC = [];
        
        // Determinar quais PSCs são possíveis baseado na série
        if (serie === '2º Ano EM') {
            vestibularesPSC = ['PSC I'];
        } else if (serie === '3º Ano EM') {
            vestibularesPSC = ['PSC I', 'PSC II'];
        } else if (serie === '4º Ano EM') {
            vestibularesPSC = ['PSC I', 'PSC II', 'PSC III'];
        }
        
        // Criar campos para cada vestibular
        vestibularesPSC.forEach(vestibular => {
            const notaItem = document.createElement('div');
            notaItem.className = 'nota-item';
            notaItem.innerHTML = `
                <label for="nota_${vestibular.replace(' ', '_')}">
                    <i class="fas fa-chart-bar"></i> ${vestibular} (0-54)
                </label>
                <input type="number" 
                       id="nota_${vestibular.replace(' ', '_')}" 
                       name="notas[${vestibular}]"
                       min="0" 
                       max="54" 
                       step="0.1"
                       placeholder="Digite sua nota"
                       oninput="atualizarNotaVestibular('${vestibular}', this.value)">
            `;
            pscNotasGrid.appendChild(notaItem);
        });
    }

    function atualizarCamposSIS() {
        const serie = document.getElementById('serieAtual').value;
        const sisNotasGrid = document.getElementById('sisNotasGrid');
        
        if (!sisNotasGrid) return;
        
        sisNotasGrid.innerHTML = '';
        let vestibularesSIS = [];
        
        // Determinar quais SIS são possíveis baseado na série
        if (serie === '2º Ano EM') {
            vestibularesSIS = ['SIS I'];
        } else if (serie === '3º Ano EM') {
            vestibularesSIS = ['SIS I', 'SIS II'];
        }else if (serie === '4º Ano EM') {
            vestibularesSIS = ['SIS I', 'SIS II', 'SIS III'];
        }
        
        // Criar campos para cada vestibular
        vestibularesSIS.forEach(vestibular => {
            const notaItem = document.createElement('div');
            notaItem.className = 'nota-item';
            notaItem.innerHTML = `
                <label for="nota_${vestibular.replace(' ', '_')}">
                    <i class="fas fa-chart-bar"></i> ${vestibular} (0-60)
                </label>
                <input type="number" 
                       id="nota_${vestibular.replace(' ', '_')}" 
                       name="notas[${vestibular}]"
                       min="0" 
                       max="60" 
                       step="0.1"
                       placeholder="Digite sua nota"
                       oninput="atualizarNotaVestibular('${vestibular}', this.value)">
            `;
            sisNotasGrid.appendChild(notaItem);
        });
    }

    function atualizarCamposRedacao() {
        const serie = document.getElementById('serieAtual').value;
        const redacaoNotasGrid = document.getElementById('redacaoNotasGrid');
        
        if (!redacaoNotasGrid) return;
        
        redacaoNotasGrid.innerHTML = '';
        let redacoes = [];
        
        // Determinar quais redações são possíveis baseado na série
        if (serie === '3º Ano EM') {
            redacoes = ['SIS II'];
        } else if (serie === '4º Ano EM') {
            redacoes = ['SIS II', 'SIS III', 'PSC 3'];
        }
        
        // Criar campos para cada redação
        redacoes.forEach(redacao => {
            const maxNota = redacao === 'PSC 3' ? 9 : 10;
            const notaItem = document.createElement('div');
            notaItem.className = 'nota-item';
            notaItem.innerHTML = `
                <label for="redacao_${redacao.replace(' ', '_')}">
                    <i class="fas fa-edit"></i> Redação ${redacao} (0-${maxNota})
                </label>
                <input type="number" 
                       id="redacao_${redacao.replace(' ', '_')}" 
                       name="redacoes[${redacao}]"
                       min="0" 
                       max="${maxNota}" 
                       step="0.1"
                       placeholder="Digite sua nota"
                       oninput="atualizarNotaRedacao('${redacao}', this.value)">
            `;
            redacaoNotasGrid.appendChild(notaItem);
        });
    }

    window.atualizarNotaVestibular = function(vestibular, nota) {
        // Remover nota existente para este vestibular
        notasVestibulares = notasVestibulares.filter(n => n.nome !== vestibular);
        
        // Adicionar nova nota se for válida
        if (nota && !isNaN(nota) && parseFloat(nota) > 0) {
            const maxNota = vestibular.startsWith('PSC') ? 54 : 60;
            const notaNum = Math.min(parseFloat(nota), maxNota);
            notasVestibulares.push({
                nome: vestibular,
                nota: notaNum
            });
        }
    };

    window.atualizarNotaRedacao = function(vestibular, nota) {
        // Remover nota existente para esta redação
        notasRedacao = notasRedacao.filter(n => n.vestibular !== vestibular);
        
        // Adicionar nova nota se for válida
        if (nota && !isNaN(nota) && parseFloat(nota) > 0) {
            const maxNota = vestibular === 'PSC 3' ? 9 : 10;
            const notaNum = Math.min(parseFloat(nota), maxNota);
            notasRedacao.push({
                vestibular: vestibular,
                nota: notaNum
            });
        }
    };

    function atualizarContadorCaracteres() {
        const count = motivacaoTextarea.value.length;
        charCount.textContent = count;
        
        if (count < 50) {
            charCount.style.color = 'var(--vermelho)';
        } else if (count < 800) {
            charCount.style.color = 'var(--verde)';
        } else {
            charCount.style.color = 'var(--laranja)';
        }
    }

    function irParaStep(step) {
        // Validar step atual antes de sair
        if (!validarStep(currentStep)) {
            return;
        }
        
        // Atualizar steps
        steps.forEach(s => s.classList.remove('active'));
        stepButtons.forEach(b => b.classList.remove('active'));
        
        // Mostrar novo step
        const newStep = document.querySelector(`.form-step[data-step="${step}"]`);
        const newStepButton = document.querySelector(`.step[data-step="${step}"]`);
        
        if (newStep) {
            newStep.classList.add('active');
            currentStep = step;
        }
        
        if (newStepButton) {
            newStepButton.classList.add('active');
        }
        
        // Atualizar campos baseados na série quando chegar no step 3
        if (step === 3) {
            const serie = document.getElementById('serieAtual').value;
            if (document.getElementById('fezPSC')?.checked) {
                atualizarCamposPSC();
            }
            if (document.getElementById('fezSIS')?.checked) {
                atualizarCamposSIS();
                const redacaoSection = document.getElementById('redacaoSection');
                if (redacaoSection) {
                    redacaoSection.style.display = (serie === '2º Ano EM' || serie === '3º Ano EM') ? 'block' : 'none';
                    if (serie === '2º Ano EM' || serie === '3º Ano EM') {
                        atualizarCamposRedacao();
                    }
                }
            }
        }
        
        // Rolar para o topo do formulário
        document.querySelector('.form-container').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }

    function validarStep(step) {
        let isValid = true;
        
        // Limpar erros anteriores
        document.querySelectorAll('.form-error').forEach(el => {
            el.textContent = '';
        });
        
        // Validações específicas por step
        if (step === 1) {
            isValid = validarStep1();
        } else if (step === 2) {
            isValid = validarStep2();
        } else if (step === 3) {
            isValid = validarStep3();
        } else if (step === 4) {
            isValid = validarStep4();
        }
        
        return isValid;
    }

    function validarStep1() {
        let isValid = true;
        
        // Nome completo
        const nome = document.getElementById('nomeCompleto');
        if (!nome.value.trim()) {
            mostrarErro('nomeCompleto', 'Nome completo é obrigatório');
            isValid = false;
        } else if (nome.value.trim().split(' ').length < 2) {
            mostrarErro('nomeCompleto', 'Digite nome e sobrenome');
            isValid = false;
        }
        
        // Email
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            mostrarErro('email', 'Email é obrigatório');
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            mostrarErro('email', 'Email inválido');
            isValid = false;
        }
        
        // CPF
        const cpf = document.getElementById('cpf');
        const cpfClean = cpf.value.replace(/\D/g, '');
        if (!cpf.value.trim()) {
            mostrarErro('cpf', 'CPF é obrigatório');
            isValid = false;
        } else if (cpfClean.length !== 11) {
            mostrarErro('cpf', 'CPF inválido (11 dígitos)');
            isValid = false;
        }
        
        // Data de Nascimento
        const dataNascimento = document.getElementById('dataNascimento');
        if (!dataNascimento.value) {
            mostrarErro('dataNascimento', 'Data de nascimento é obrigatória');
            isValid = false;
        } else {
            const nascimento = new Date(dataNascimento.value);
            const hoje = new Date();
            const idade = hoje.getFullYear() - nascimento.getFullYear();
            
            if (idade < 13 || idade > 25) {
                mostrarErro('dataNascimento', 'Idade deve ser entre 13 e 25 anos');
                isValid = false;
            }
        }
        
        // Telefone
        const telefone = document.getElementById('telefone');
        const telClean = telefone.value.replace(/\D/g, '');
        if (!telefone.value.trim()) {
            mostrarErro('telefone', 'Telefone é obrigatório');
            isValid = false;
        } else if (telClean.length < 10) {
            mostrarErro('telefone', 'Telefone inválido');
            isValid = false;
        }
        
        return isValid;
    }

    function validarStep2() {
        let isValid = true;
        
        // Série atual
        const serie = document.getElementById('serieAtual');
        if (!serie.value) {
            mostrarErro('serieAtual', 'Selecione sua série');
            isValid = false;
        }
        
        // Escola de origem
        const escola = document.getElementById('escolaOrigem');
        if (!escola.value.trim()) {
            mostrarErro('escolaOrigem', 'Escola de origem é obrigatória');
            isValid = false;
        }
        
        // Tipo de escola
        const escolaPublica = document.querySelector('input[name="escolaPublica"]:checked');
        if (!escolaPublica) {
            mostrarErro('escolaPublica', 'Selecione o tipo da escola');
            isValid = false;
        }
        
        return isValid;
    }

    function validarStep3() {
        // Step 3 não tem validações obrigatórias, tudo é opcional
        return true;
    }

    function validarStep4() {
        let isValid = true;
        
        // Motivação
        const motivacao = document.getElementById('motivacao');
        if (!motivacao.value.trim()) {
            mostrarErro('motivacao', 'Por favor, explique sua motivação');
            isValid = false;
        } else if (motivacao.value.trim().length < 20) {
            mostrarErro('motivacao', 'Escreva pelo menos 20 caracteres sobre sua motivação');
            isValid = false;
        }
        
        // Termos
        const termos = document.getElementById('aceiteTermos');
        if (!termos.checked) {
            mostrarErro('termos', 'Você precisa aceitar os termos para continuar');
            isValid = false;
        }
        
        return isValid;
    }

    function mostrarErro(campoId, mensagem) {
        const errorElement = document.getElementById(`error-${campoId}`);
        if (errorElement) {
            errorElement.textContent = mensagem;
        }
    }

    async function enviarInscricao(e) {
        e.preventDefault();
        
        // Validar step atual
        if (!validarStep(4)) {
            return;
        }
        
        // Validar todo o formulário
        for (let i = 1; i <= 4; i++) {
            if (!validarStep(i)) {
                irParaStep(i);
                return;
            }
        }
        
        // Coletar dados do formulário
        const formData = {
            nomeCompleto: document.getElementById('nomeCompleto').value.trim(),
            email: document.getElementById('email').value.trim(),
            cpf: document.getElementById('cpf').value.replace(/\D/g, ''),
            dataNascimento: document.getElementById('dataNascimento').value,
            telefone: document.getElementById('telefone').value.replace(/\D/g, ''),
            serieAtual: document.getElementById('serieAtual').value,
            escolaOrigem: document.getElementById('escolaOrigem').value.trim(),
            escolaPublica: document.querySelector('input[name="escolaPublica"]:checked').value,
            fezPSC: document.getElementById('fezPSC').checked,
            fezSIS: document.getElementById('fezSIS').checked,
            notasVestibulares: notasVestibulares,
            notasRedacao: notasRedacao,
            motivacao: document.getElementById('motivacao').value.trim()
        };
        
        // Mostrar loading
        const submitBtn = document.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        try {
            // Enviar para API
            const response = await fetch('/api/concurso/inscricao', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Mostrar mensagem de sucesso
                mostrarSucesso(result.data);
            } else {
                // Mostrar erro
                mostrarErroGeral(result.message || 'Erro ao enviar inscrição');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
            
        } catch (error) {
            console.error('Erro:', error);
            mostrarErroGeral('Erro de conexão. Tente novamente.');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    function mostrarSucesso(data) {
        // Esconder formulário
        form.style.display = 'none';
        
        // Atualizar detalhes na mensagem de sucesso
        document.getElementById('protocolo').textContent = data.protocolo || 'N/A';
        document.getElementById('successDetails').innerHTML = `
            Olá <strong>${data.nome}</strong>, sua inscrição foi registrada com sucesso!<br>
            Um email de confirmação foi enviado para <strong>${data.email}</strong>.
        `;
        
        // Mostrar mensagem de sucesso
        successMessage.style.display = 'block';
        
        // Rolar para a mensagem de sucesso
        successMessage.scrollIntoView({ behavior: 'smooth' });
    }

    function mostrarErroGeral(mensagem) {
        // Criar notificação de erro
        const notification = document.createElement('div');
        notification.className = 'error-notification';
        notification.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <span>${mensagem}</span>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #f8d7da;
            color: #721c24;
            padding: 12px 20px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.1);
            z-index: 9999;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    // Adicionar estilos CSS para animações
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .fa-spinner {
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
});

// Funções auxiliares globais
function formatarCPF(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function formatarTelefone(telefone) {
    if (telefone.length === 11) {
        return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else {
        return telefone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
}

// Função para imprimir comprovante
function imprimirComprovante() {
    const conteudo = document.getElementById('successMessage').innerHTML;
    const janela = window.open('', '_blank');
    janela.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Comprovante de Inscrição - Método</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .header { text-align: center; margin-bottom: 30px; }
                .logo { font-size: 24px; font-weight: bold; color: #070738; }
                .details { border: 2px solid #070738; padding: 20px; border-radius: 10px; }
                .info-item { margin-bottom: 10px; }
                .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #666; }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="logo">Método Pré-Vestibular</div>
                <h2>Comprovante de Inscrição</h2>
            </div>
            ${conteudo}
            <div class="footer">
                <p>Impresso em: ${new Date().toLocaleString('pt-BR')}</p>
                <p>Este comprovante não necessita de autenticação.</p>
            </div>
        </body>
        </html>
    `);
    janela.document.close();
    janela.print();
}
