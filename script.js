// Carrossel
const track = document.querySelector(".carrousel-track");
const slides = Array.from(track.children);
const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");
let index = 0;

function updateCarousel() {
  track.style.transform = `translateX(-${index * 100}%)`;
}

btnRight.addEventListener("click", () => {
  index = (index + 1) % slides.length;
  updateCarousel();
});

btnLeft.addEventListener("click", () => {
  index = (index - 1 + slides.length) % slides.length;
  updateCarousel();
});

// Animação ao rolar
const sections = document.querySelectorAll("section, .apresetation, .profile-pic");

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  sections.forEach(sec => {
    const position = sec.getBoundingClientRect().top;
    if (position < windowHeight - 100) {
      sec.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


function inicializarGraficoProfissional() {
    const canvas = document.getElementById('graficoProfissional');
    if (!canvas) return; // Garante que não quebra se o canvas não estiver na tela
    
    const ctx = canvas.getContext('2d');
    
    // Configurações de coordenadas baseadas no tamanho do canvas (800x450)
    const centroX = canvas.width / 2;
    const centroY = canvas.height / 2;
    
    // Dados dos nós
    const noCentral = { texto: "Estrátegia", corBorda: "#00f3ff", corTexto: "#ffffff", raio: 75 };
    const nosSatelites = [
        { texto: "Criação de Arte", angulo: -Math.PI / 2 },       // Topo (90° acima)
        { texto: "Edição de Vídeo", angulo: Math.PI / 6 },        // Inferior Direito
        { texto: "Produção de contéudo", angulo: (5 * Math.PI) / 6 } // Inferior Esquerdo
    ];
    
    const distanciaDoCentro = 180; // Comprimento das linhas de conexão

    function desenharCapsulaTexto(ctx, x, y, texto, eCentro = false) {
        ctx.save();
        
        // Estilização da fonte
        ctx.font = eCentro ? "bold 18px 'Segoe UI', sans-serif" : "600 15px 'Segoe UI', sans-serif";
        const larguraTexto = ctx.measureText(texto).width;
        const paddingX = 24;
        const paddingY = 14;
        
        const larguraCard = larguraTexto + (paddingX * 2);
        const alturaCard = 20 + (paddingY * 2);
        
        // Desenha o fundo do card (Efeito de vidro escuro)
        ctx.fillStyle = eCentro ? "#320046" : "rgba(0, 0, 43, 0.85)";
        ctx.strokeStyle = eCentro ? "#00f3ff" : "#ff91f9";
        ctx.lineWidth = eCentro ? 3 : 1.5;
        
        // Cria cantos arredondados na pílula
        ctx.beginPath();
        ctx.roundRect(x - larguraCard / 2, y - alturaCard / 2, larguraCard, alturaCard, 30);
        ctx.fill();
        ctx.stroke();
        
        // Adiciona sombra/brilho dependendo se é o centro ou satélite
        if (eCentro) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = "#00f3ff";
            // Refaz o contorno para aplicar o brilho externo
            ctx.stroke();
        }

        // Desenha o Texto interno
        ctx.shadowBlur = 0; // Reseta sombra para o texto ficar nítido
        ctx.fillStyle = eCentro ? "#ffffff" : "#ff91f9";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(texto, x, y);
        
        ctx.restore();
    }

    function renderizar() {
        // Limpa o canvas antes de desenhar
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 1. PASSO: Desenhar as linhas de conexão primeiro (para ficarem por baixo dos cards)
        nosSatelites.forEach((satelite) => {
            const satX = centroX + distanciaDoCentro * Math.cos(satelite.angulo);
            const satY = centroY + distanciaDoCentro * Math.sin(satelite.angulo);
            
            // Cria um gradiente linear que vai da palavra satélite até o centro
            const gradienteLinha = ctx.createLinearGradient(satX, satY, centroX, centroY);
            gradienteLinha.addColorStop(0, "#ff91f9");  // Começa no rosa neon
            gradienteLinha.addColorStop(1, "#00f3ff");  // Deságua no turquesa central
            
            ctx.beginPath();
            ctx.moveTo(satX, satY);
            ctx.lineTo(centroX, centroY);
            ctx.strokeStyle = gradienteLinha;
            ctx.lineWidth = 3;
            ctx.stroke();
            
            // Pequeno detalhe estético: círculo conector nas pontas
            ctx.beginPath();
            ctx.arc(satX, satY, 4, 0, 2 * Math.PI);
            ctx.fillStyle = "#ff91f9";
            ctx.fill();
        });
        
        // 2. PASSO: Desenhar as pílulas periféricas (Satélites)
        nosSatelites.forEach((satelite) => {
            const satX = centroX + distanciaDoCentro * Math.cos(satelite.angulo);
            const satY = centroY + distanciaDoCentro * Math.sin(satelite.angulo);
            desenharCapsulaTexto(ctx, satX, satY, satelite.texto, false);
        });
        
        // 3. PASSO: Desenhar a pílula central (Marketing) com destaque principal
        desenharCapsulaTexto(ctx, centroX, centroY, noCentral.texto, true);
    }

    renderizar();
}

// Executa a montagem do gráfico assim que o script carregar
document.addEventListener("DOMContentLoaded", inicializarGraficoProfissional);