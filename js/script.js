const mario = document.querySelector("#mario");
const pipe = document.querySelector("#pipe");
const block = document.querySelector("#block");
const spinyshell1 = document.querySelector("#spinyshell1");
const spinyshell2 = document.querySelector("#spinyshell2");
const spinyshell = document.querySelectorAll(".spinyshell");
const score = document.querySelector("#score");
const divGameOver = document.querySelector(".game-over");
const backgound = document.querySelector(".game-board");
var scores = 0;

function jump() {
  const key = event.keyCode;

  if (key === 32) {
    mario.classList.add("jump");
    setTimeout(() => mario.classList.remove("jump"), 500);
  }

  if (key === 40) {
    mario.src = "./img/mario-crouched.png";
    mario.style.width = "75px";
    mario.style.marginLeft = "50px";
    mario.setAttribute("action", "crouched");
  }
}

function squat() {
  const key = event.keyCode;

  if (key === 40) {
    mario.src = "./img/mario.gif";
    mario.style.width = "150px";
    mario.style.marginLeft = "50px";
    mario.setAttribute("action", "rise");
  }
}

function restart() {
  document.location.reload(true);
}

const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft;
  const blockPosition = block.offsetLeft;
  const spinyshellPosition1 = spinyshell1.offsetLeft;
  const spinyshellPosition2 = spinyshell2.offsetLeft;

  const marioPosition = +window
    .getComputedStyle(mario)
    .bottom.replace("px", "");

  if (scores == 200) {
    block.style.display = "block";
  }

  if (scores == 800) {
    backgound.style.background = "#214554";
    setTimeout(
      () => (backgound.style.background = "linear-gradient(#214554, #737b7e)"),
      200
    );
  }

  if (scores == 900) {
    pipe.style.display = "none";
    block.style.right = "100%";
    block.style.display = "none";

    spinyshell.forEach((ele) => {
      ele.style.display = "block";
    });
  }

  if (scores == 1400) {
    block.style.display = "block";
    block.style.right = "-550px";
    block.style.animationDelay = "2s";
  }

  collisionConditions(
    pipePosition,
    marioPosition,
    blockPosition,
    spinyshellPosition1,
    spinyshellPosition2
  );
}, 10);

function collisionConditions(
  pipePosition,
  marioPosition,
  blockPosition,
  spinyshellPosition1,
  spinyshellPosition2
) {
  const marioAttribute = mario.getAttribute("action");

  if (
    blockPosition <= 100 &&
    blockPosition > 0 &&
    marioAttribute != "crouched"
  ) {
    gameOver(
      pipePosition,
      marioPosition,
      blockPosition,
      spinyshellPosition1,
      spinyshellPosition2
    );
  }

  if (
    pipePosition <= 120 &&
    pipePosition > 0 &&
    marioAttribute === "rise" &&
    marioPosition < 90
  ) {
    gameOver(
      pipePosition,
      marioPosition,
      blockPosition,
      spinyshellPosition1,
      spinyshellPosition2
    );
  }

  if (
    spinyshellPosition1 <= 100 &&
    spinyshellPosition1 > 0 &&
    marioPosition < 90
  ) {
    gameOver(
      pipePosition,
      marioPosition,
      blockPosition,
      spinyshellPosition1,
      spinyshellPosition2
    );
  }

  if (
    spinyshellPosition2 <= 100 &&
    spinyshellPosition2 > 0 &&
    marioPosition < 90
  ) {
    gameOver(
      pipePosition,
      marioPosition,
      blockPosition,
      spinyshellPosition1,
      spinyshellPosition2
    );
  }
}

function gameOver(
  pipePosition,
  marioPosition,
  blockPosition,
  spinyshellPosition1,
  spinyshellPosition2
) {
  pipe.style.animation = "none";
  pipe.style.left = `${pipePosition}px`;

  block.style.animation = "none";
  block.style.left = `${blockPosition}px`;

  spinyshell1.style.animation = "none";
  spinyshell1.style.left = `${spinyshellPosition1}px`;

  spinyshell2.style.animation = "none";
  spinyshell2.style.left = `${spinyshellPosition2}px`;

  mario.style.animation = "none";
  mario.style.bottom = `${marioPosition}px`;
  mario.src = "./img/game-over.png";
  mario.style.width = "75px";
  mario.style.marginLeft = "50px";

  clearInterval(loop);
  clearInterval(pointScore);

  divGameOver.style.display = "block";
  document.removeEventListener("keydown", jump);
  document.removeEventListener("keyup", squat);
}

const pointScore = setInterval(() => {
  scores++;
  score.innerText = `Pontuação: ${scores}`;
}, 100);

document.addEventListener("keydown", jump);
document.addEventListener("keyup", squat);
