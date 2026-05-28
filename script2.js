// ==========================================
// 1. Gerenciamento do Carrossel
// ==========================================
const track = document.querySelector(".carrousel-track");
const slides = Array.from(track ? track.children : []);
const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");
let index = 0;

function updateCarousel() {
  if (track) track.style.transform = `translateX(-${index * 100}%)`;
}

if (btnRight && btnLeft && slides.length > 0) {
  btnRight.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    updateCarousel();
  });

  btnLeft.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    updateCarousel();
  });
}

// ==========================================
// 2. Animação Inteligente de Scroll
// ==========================================
const sections = document.querySelectorAll("section, .animate-fade");

const appearanceObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target); 
    }
  });
}, {
  threshold: 0.15
});

sections.forEach(sec => appearanceObserver.observe(sec));


// ==========================================
// 3. Inicialização do Gráfico (Visão Macroscópica)
// ==========================================
function inicializarGraficoProfissional() {
  const canvas = document.getElementById('graficoProfissional');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const centroX = canvas.width / 2;
  const centroY = canvas.height / 2;
  
  const noCentral = { texto: "Estratégia", corFundo: "#1a1a1a", corTexto: "#ffffff" };
  const nosSatelites = [
    { texto: "Criação de Conteúdo", angulo: -Math.PI / 2 },
    { texto: "Edição de Vídeo", angulo: Math.PI / 6 },
    { texto: "Design Editorial", angulo: (5 * Math.PI) / 6 }
  ];
  
  const distanciaDoCentro = 160;

  function desenharCapsulaTexto(ctx, x, y, texto, eCentro = false) {
    ctx.save();
    ctx.font = eCentro ? "600 16px 'Inter', sans-serif" : "500 14px 'Inter', sans-serif";
    
    const larguraTexto = ctx.measureText(texto).width;
    const paddingX = 20;
    const paddingY = 12;
    const larguraCard = larguraTexto + (paddingX * 2);
    const alturaCard = 16 + (paddingY * 2);
    
    ctx.fillStyle = eCentro ? "#1a1a1a" : "#ffffff";
    ctx.strokeStyle = eCentro ? "#1a1a1a" : "#e8e5e0";
    ctx.lineWidth = 1;
    
    ctx.beginPath();
    // Tratativa para garantir suporte ao roundRect
    if (ctx.roundRect) {
      ctx.roundRect(x - larguraCard / 2, y - alturaCard / 2, larguraCard, alturaCard, 4);
    } else {
      ctx.rect(x - larguraCard / 2, y - alturaCard / 2, larguraCard, alturaCard);
    }
    ctx.fill();
    ctx.stroke();
    
    ctx.fillStyle = eCentro ? "#ffffff" : "#666666";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(texto, x, y);
    ctx.restore();
  }

  function renderizar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    nosSatelites.forEach((satelite) => {
      const satX = centroX + distanciaDoCentro * Math.cos(satelite.angulo);
      const satY = centroY + distanciaDoCentro * Math.sin(satelite.angulo);
      
      ctx.beginPath();
      ctx.moveTo(satX, satY);
      ctx.lineTo(centroX, centroY);
      ctx.strokeStyle = "#e8e5e0";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });
    
    nosSatelites.forEach((satelite) => {
      const satX = centroX + distanciaDoCentro * Math.cos(satelite.angulo);
      const satY = centroY + distanciaDoCentro * Math.sin(satelite.angulo);
      desenharCapsulaTexto(ctx, satX, satY, satelite.texto, false);
    });
    
    desenharCapsulaTexto(ctx, centroX, centroY, noCentral.texto, true);
  }

  renderizar();
}

// ==========================================
// 4. Menu Dropdown (Navegação Interna)
// ==========================================
const selectItens = document.getElementById("itens");

if (selectItens) {
  selectItens.addEventListener("change", function() {
    const destino = this.value; 
    
    // Verifica se o valor é de fato um seletor de ID (começa com #)
    if (destino && destino.startsWith('#')) {
      const elementoDestino = document.querySelector(destino);
      if (elementoDestino) {
        elementoDestino.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
}

// ==========================================
// 5. Inicialização Geral após o carregamento do DOM
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  inicializarGraficoProfissional();
});