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

// Efeito de Scroll Dinâmico
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    header.classList.add('header-scrolled');
    if (currentScroll > lastScroll) {
      header.style.transform = 'translateY(-80px)';
    } else {
      header.style.transform = 'translateY(0)';
    }
  } else {
    header.classList.remove('header-scrolled');
  }
  lastScroll = currentScroll;
  
  // Progress Bar
  const progress = (currentScroll / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  document.querySelector('.scroll-progress').style.width = `${progress}%`;
});

// Efeito de Partículas na Navbar
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('mousemove', (e) => {
    const particle = document.createElement('div');
    particle.className = 'nav-particle';
    particle.style.left = `${e.clientX}px`;
    particle.style.top = `${e.clientY}px`;
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 3000);
  });
});

// Menu Mobile
const menuToggle = document.querySelector('.menu-toggle');
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  document.querySelector('.nav-links').classList.toggle('active');
});

// Ativar Link Atual
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute('id');
    }
  });
  
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href').includes(current)) {
      a.classList.add('active');
    }
  });
});
