const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");

function jump() {
  if (dino.classList != "jump") {
    dino.classList.add("jump");

    setTimeout(function () {
      dino.classList.remove("jump");
    }, 500);
  }
}

let isAlive = setInterval(function () {

  let dinoY = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));


  let cactusX = parseInt(
    window.getComputedStyle(cactus).getPropertyValue("left")
  );

 
  if (cactusX < 50 && cactusX > 0 && dinoY >= 140) {

    alert("Game Over!");
  }
}, 10);


document.addEventListener("keydown", function (event) {
  jump();
});
