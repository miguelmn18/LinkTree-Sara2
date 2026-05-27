// Gerenciamento do Carrossel
const track = document.querySelector(".carrousel-track");
const slides = Array.from(track.children);
const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");
let index = 0;

function updateCarousel() {
  track.style.transform = `translateX(-${index * 100}%)`;
}

if (btnRight && btnLeft) {
  btnRight.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    updateCarousel();
  });

  btnLeft.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    updateCarousel();
  });
}

// Animação Inteligente de Scroll (Intersection Observer - Melhor Performance)
const sections = document.querySelectorAll("section, .animate-fade");

const appearanceObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target); // Executa a animação apenas uma vez
    }
  });
}, {
  threshold: 0.15
});

sections.forEach(sec => appearanceObserver.observe(sec));


// Inicialização do Gráfico com Design Premium (Cores Sóbrias)
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
    
    // Design Limpo: Fundo sólido com bordas extremamente sutis
    ctx.fillStyle = eCentro ? "#1a1a1a" : "#ffffff";
    ctx.strokeStyle = eCentro ? "#1a1a1a" : "#e8e5e0";
    ctx.lineWidth = 1;
    
    ctx.beginPath();
    ctx.roundRect(x - larguraCard / 2, y - alturaCard / 2, larguraCard, alturaCard, 4); // Cantos levemente facetados (estilo SaaS moderno)
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
    
    // Desenha linhas conectores elegantes de tom cinza suave
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
    
    // Desenha os nós periféricos
    nosSatelites.forEach((satelite) => {
      const satX = centroX + distanciaDoCentro * Math.cos(satelite.angulo);
      const satY = centroY + distanciaDoCentro * Math.sin(satelite.angulo);
      desenharCapsulaTexto(ctx, satX, satY, satelite.texto, false);
    });
    
    // Desenha o nó central por cima
    desenharCapsulaTexto(ctx, centroX, centroY, noCentral.texto, true);
  }

  renderizar();
}

const selectItens = document.getElementById("itens");

selectItens.addEventListener("change", function() {
  const destino = this.value; // Pega o valor da opção selecionada (ex: #biography)
  
  if (destino) {
    // Faz a página rolar suavemente até o elemento com o ID correspondente
    document.querySelector(destino).scrollIntoView({
      behavior: "smooth"
    });
  }
});


// 2. Adiciona o evento 'change' (mudança)
selectItens.addEventListener("change", function() {
  // 'this.value' pega o valor da <option> que foi clicada/selecionada
  const valorSelecionado = this.value; 
  
  console.log("O usuário escolheu a cor: " + valorSelecionado);
  
  // Exemplo de ação com o valor:
  if (valorSelecionado === "azul") {
      document.body.style.backgroundColor = "lightblue";
  } else if (valorSelecionado === "verde") {
      document.body.style.backgroundColor = "lightgreen";
  } else if (valorSelecionado === "vermelho") {
      document.body.style.backgroundColor = "coral";
  }
});