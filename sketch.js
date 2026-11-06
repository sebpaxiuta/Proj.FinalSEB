
let cols, rows;
let escalaGrid = 30; 
let zOffset = 0;     

function setup() {
  createCanvas(800, 600);
  cols = width / escalaGrid;
  rows = height / escalaGrid;
}

function draw() {
  background(18, 22, 30); 
  
  zOffset += 0.015;

  let xOffset = 0;
  for (let i = 0; i < cols; i++) {
    let yOffset = 0;
    for (let j = 0; j < rows; j++) {
      
      let x = i * escalaGrid;
      let y = j * escalaGrid;
      
      let distancia = dist(mouseX, mouseY, x, y);
      
      let raioInfluencia = 180;
      let fatorPressao = 0;
      if (distancia < raioInfluencia) {
        fatorPressao = map(distancia, 0, raioInfluencia, 1, 0);
      }

      let ruidoValor = noise(xOffset, yOffset, zOffset);
      let deslocamentoZ = ruidoValor * 35;
      
      let tamanhoBase = map(ruidoValor, 0, 1, 2, 12);
      let tamanhoFinal = tamanhoBase + (fatorPressao * 22);

      let corVermelho = map(fatorPressao, 0, 1, 50, 255);
      let corVerde    = map(fatorPressao, 0, 1, 150, 80);
      let corAzul     = map(fatorPressao, 0, 1, 220, 120);

      stroke(corVermelho, corVerde, corAzul, 180);
      strokeWeight(map(fatorPressao, 0, 1, 1, 3));

      push();
      translate(x + escalaGrid / 2, y + escalaGrid / 2);
      
      let anguloRotacao = ruidoValor * TWO_PI + (fatorPressao * TWO_PI * 0.5);
      rotate(anguloRotacao);

      line(-tamanhoFinal, 0, tamanhoFinal, 0);
      line(0, -tamanhoFinal, 0, tamanhoFinal);
      
      pop();
      
      yOffset += 0.1;
    }
    xOffset += 0.1;
  }
}