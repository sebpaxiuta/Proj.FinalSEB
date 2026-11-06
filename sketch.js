/**
 */

function setup() {
  createCanvas(800, 600);
  rectMode(CENTER);
}

function draw() {
  background(22, 26, 35); 

  let densidade = int(map(mouseX, 0, width, 8, 28));
  let escalaFator = map(mouseY, 0, height, 0.3, 1.8);

  let tamanhoCelula = width / densidade;

  translate(tamanhoCelula / 2, tamanhoCelula / 2);

  for (let i = 0; i < densidade; i++) {
    for (let j = 0; j < densidade; j++) {
      
      let x = i * tamanhoCelula;
      let y = j * tamanhoCelula;

      let distanciaCentro = dist(i, j, densidade / 2, densidade / 2);
      let proporcaoDinamica = sin(frameCount * 0.03 + distanciaCentro * 0.3) * 0.5 + 0.5;

      push();
      translate(x, y);

      if (densidade > 18) {
        stroke(80, 200, 255, 180);
        noFill();
        strokeWeight(1.5);
        rect(0, 0, tamanhoCelula * 0.7 * escalaFator * proporcaoDinamica, tamanhoCelula * 0.7 * escalaFator);
      } else {
        noStroke();
        let corInterpolada = lerpColor(color(255, 100, 150), color(50, 200, 180), proporcaoDinamica);
        fill(corInterpolada);
        
        let tamForma = tamanhoCelula * 0.65 * escalaFator * proporcaoDinamica;
        ellipse(0, 0, tamForma, tamForma);
        
        fill(22, 26, 35);
        rect(0, 0, tamForma * 0.35, tamForma * 0.35);
      }

      pop();
    }
  }
}