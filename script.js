const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const img = new Image();
img.src = "https://i.ibb.co/Q9yv5Jk/flappy-bird-set.png";
const birdImage = new Image();
birdImage.src = "hamsterFusee.png";

// general settings
let gamePlaying = false;
const gravity = .5;
const speed = 6.2;
const size = [51, 36];
const jump = -11.5;
const cTenth = (canvas.width / 10);

let index = 0,
    bestScore = 0, 
    flight, 
    flyHeight, 
    currentScore, 
    pipe;

// pipe settings
const pipeWidth = 78;
const pipeGap = 270;
const pipeLoc = () => (Math.random() * ((canvas.height - (pipeGap + pipeWidth)) - pipeWidth)) + pipeWidth;

const setup = () => {
  currentScore = 0;
  flight = jump;

  // set initial flyHeight (middle of screen - size of the bird)
  flyHeight = (canvas.height / 2) - (size[1] / 2);

  // setup first 3 pipes
  pipes = Array(3).fill().map((a, i) => [canvas.width + (i * (pipeGap + pipeWidth)), pipeLoc()]);
}

const render = () => {
  // make the pipe and bird moving 
  index++;

  // ctx.clearRect(0, 0, canvas.width, canvas.height);

  // background first part 
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height, -((index * (speed / 2)) % canvas.width) + canvas.width, 0, canvas.width, canvas.height);
  // background second part
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height, -(index * (speed / 2)) % canvas.width, 0, canvas.width, canvas.height);
  
  // pipe display
  if (gamePlaying){
    pipes.map(pipe => {
      // pipe moving
      pipe[0] -= speed;

      // top pipe
      ctx.drawImage(img, 432, 588 - pipe[1], pipeWidth, pipe[1], pipe[0], 0, pipeWidth, pipe[1]);
      // bottom pipe
      ctx.drawImage(img, 432 + pipeWidth, 108, pipeWidth, canvas.height - pipe[1] + pipeGap, pipe[0], pipe[1] + pipeGap, pipeWidth, canvas.height - pipe[1] + pipeGap);

      // give 1 point & create new pipe
      if(pipe[0] <= -pipeWidth){
        currentScore++;
        // check if it's the best score
        bestScore = Math.max(bestScore, currentScore);
        
        // remove & create new pipe
        pipes = [...pipes.slice(1), [pipes[pipes.length-1][0] + pipeGap + pipeWidth, pipeLoc()]];
        console.log(pipes);
      }
    
      // if hit the pipe, end
      if ([
        pipe[0] <= cTenth + size[0], 
        pipe[0] + pipeWidth >= cTenth, 
        pipe[1] > flyHeight || pipe[1] + pipeGap < flyHeight + size[1]
      ].every(elem => elem)) {
        gamePlaying = false;
        setup();
      }
    })
  }
  // draw bird
  if (gamePlaying) {
    ctx.drawImage(birdImage, cTenth, flyHeight, size[0], size[1]);;
    flight += gravity;
    flyHeight = Math.min(flyHeight + flight, canvas.height - size[1]);
  } else {
    ctx.drawImage(birdImage, (canvas.width / 2) - (size[0] / 2), flyHeight, size[0], size[1]);
    flyHeight = (canvas.height / 2) - (size[1] / 2);
      // text accueil
    ctx.fillText(`Best score : ${bestScore}`, 65, 245);
    ctx.fillText('Click to play', 90, 535);
    ctx.font = "bold 30px courier";
  }

  document.getElementById('bestScore').innerHTML = `Best : ${bestScore}`;
  document.getElementById('currentScore').innerHTML = `Current : ${currentScore}`;

  // tell the browser to perform anim
  window.requestAnimationFrame(render);
}

// launch setup
setup();
img.onload = render;

// start game
document.addEventListener('click', () => gamePlaying = true);
window.onclick = () => flight = jump;

function resizeCanvas() {
  const canvas = document.getElementById('canvas');
  const ratio = 431 / 768; // Ratio largeur/hauteur du jeu
  canvas.width = window.innerWidth; // Adapter à la largeur de l'écran
  canvas.height = window.innerWidth / ratio; // Calculer la hauteur pour respecter le ratio

  // Si l'écran est trop haut, ajustez en fonction de la hauteur
  if (canvas.height > window.innerHeight) {
    canvas.height = window.innerHeight;
    canvas.width = canvas.height * ratio;
  }

  // Redessinez ou repositionnez les éléments ici si nécessaire
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Appeler au chargement initial

function toggleFullScreen() {
  const canvas = document.getElementById('canvas');
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}
function resizeCanvas() {
  const canvas = document.getElementById('canvas');
  const ratio = 431 / 768; // Ratio largeur/hauteur du jeu
  canvas.width = window.innerWidth; // Adapter à la largeur de l'écran
  canvas.height = window.innerWidth / ratio; // Calculer la hauteur pour respecter le ratio

  // Si l'écran est trop haut, ajustez en fonction de la hauteur
  if (canvas.height > window.innerHeight) {
    canvas.height = window.innerHeight;
    canvas.width = canvas.height * ratio;
  }

  // Redessinez ou repositionnez les éléments ici si nécessaire
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Appeler au chargement initial
