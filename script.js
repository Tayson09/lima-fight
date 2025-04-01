document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contatoForm'); 
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    } else {
        console.error("Formulário não encontrado.");
    }
});

function handleFormSubmit(event) {
    event.preventDefault(); 

    const formData = new FormData(event.target);

    formData.append('timestamp', new Date().toISOString());
    formData.append('honeypot', '');

    fetch('https://script.google.com/macros/s/AKfycbwcbn2Hwbp_YEuzOQ_D5yuPIqs0CC9_hliAOOfGq5In41Mh2wXVx2UPx7A0icIXFYeO5A/exec', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())  
    .then(data => {
        if (data.status === "success") {
            window.location.href = "obrigado.html";
        } else {
            window.location.href = "obrigado.html";
        }
    })
    .catch(error => {
        console.error('Erro ao enviar dados:', error);
        window.location.href = "obrigado.html";
    });
}
