/**
 * Artefacto: Superfície Ergonómica Paramétrica (com)FORMA
 * Framework: Input (Rato/Toque + Noise) + Expressão (Malha Topográfica) = Output Interativo
 */

let cols, rows;
let escalaGrid = 30; // Espaçamento entre os pontos da malha
let zOffset = 0;     // Variável para a animação temporal do ruído

function setup() {
  createCanvas(800, 600);
  cols = width / escalaGrid;
  rows = height / escalaGrid;
}

function draw() {
  background(18, 22, 30); // Fundo escuro com estética industrial/digital
  
  // Atualiza o offset temporal para dar movimento orgânico fluido à malha
  zOffset += 0.015;

  let xOffset = 0;
  for (let i = 0; i < cols; i++) {
    let yOffset = 0;
    for (let j = 0; j < rows; j++) {
      
      let x = i * escalaGrid;
      let y = j * escalaGrid;
      
      // Calcula a distância de cada ponto da malha ao cursor (simulando ponto de pressão)
      let distancia = dist(mouseX, mouseY, x, y);
      
      // O impacto da pressão diminui com a distância (raio de influência = 180px)
      let raioInfluencia = 180;
      let fatorPressao = 0;
      if (distancia < raioInfluencia) {
        // Mapeia a proximidade para um fator de deformação suave
        fatorPressao = map(distancia, 0, raioInfluencia, 1, 0);
      }

      // Ruído de Perlin combinado com o input do utilizador para gerar ondulação
      let ruidoValor = noise(xOffset, yOffset, zOffset);
      let deslocamentoZ = ruidoValor * 35;
      
      // O tamanho do elemento reage tanto ao ruído base como à "pressão" do rato
      let tamanhoBase = map(ruidoValor, 0, 1, 2, 12);
      let tamanhoFinal = tamanhoBase + (fatorPressao * 22);

      // Mapeamento cromático baseado na posição espacial e no fator de pressão
      let corVermelho = map(fatorPressao, 0, 1, 50, 255);
      let corVerde    = map(fatorPressao, 0, 1, 150, 80);
      let corAzul     = map(fatorPressao, 0, 1, 220, 120);

      stroke(corVermelho, corVerde, corAzul, 180);
      strokeWeight(map(fatorPressao, 0, 1, 1, 3));

      // Desenha elementos geométricos modulares que simulam uma textura de material adaptativo
      push();
      translate(x + escalaGrid / 2, y + escalaGrid / 2);
      
      // Rotação subtil gerada pelo ruído e afetada pelo rato
      let anguloRotacao = ruidoValor * TWO_PI + (fatorPressao * TWO_PI * 0.5);
      rotate(anguloRotacao);

      // Renderiza pequenas cruzes / formas texturais paramétricas
      line(-tamanhoFinal, 0, tamanhoFinal, 0);
      line(0, -tamanhoFinal, 0, tamanhoFinal);
      
      pop();
      
      yOffset += 0.1;
    }
    xOffset += 0.1;
  }
}