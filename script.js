// Configuração inicial
document.addEventListener('DOMContentLoaded', function() {
    // Configurar timestamp do formulário
    const formTimestamp = document.getElementById('formTimestamp');
    if(formTimestamp) {
        formTimestamp.value = new Date().toISOString();
    }

    // Gerenciar mensagens de status
    const urlParams = new URLSearchParams(window.location.search);
    const formStatus = document.getElementById('form-status');

    if (urlParams.has('success')) {
        formStatus.innerHTML = `
            <div class="success-message">
                ✔️ Mensagem enviada com sucesso!
            </div>
        `;
        window.history.replaceState({}, document.title, window.location.pathname + '#contato');
    }

    if (urlParams.has('error')) {
        formStatus.innerHTML = `
            <div class="error-message">
                ❌ Ocorreu um erro ao enviar a mensagem. Tente novamente.
            </div>
        `;
        window.history.replaceState({}, document.title, window.location.pathname + '#contato');
    }

    // Configurar envio do formulário
    const contactForm = document.getElementById('contatoForm');
    if(contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
});

// Função para lidar com o envio do formulário
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const button = form.querySelector('button[type="submit"]');
    const originalButtonText = button.innerHTML;
    
    // Mostrar estado de carregamento
    button.innerHTML = '<div class="loader"></div>';
    button.disabled = true;

    // Enviar dados
    fetch(form.action, {
        method: 'POST',
        body: new URLSearchParams(new FormData(form)),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => response.text())
    .then(data => {
        window.location.href = window.location.href.split('?')[0] + '?success=true#contato';
    })
    .catch(error => {
        window.location.href = window.location.href.split('?')[0] + '?error=true#contato';
    })
    .finally(() => {
        button.innerHTML = originalButtonText;
        button.disabled = false;
    });
}