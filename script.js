import Ball from "./Ball.js";
import Paddle from "./Paddle.js";
import VELOCITY_INCREASE from "./Ball.js"

const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const compPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScoreElem = document.getElementById("player-score")
const compScoreElem = document.getElementById("computer-score")

let lastTime

function update(time){
    if(lastTime != null){
        const delta = time - lastTime
          ball.update(delta, [playerPaddle.rect(), compPaddle.rect()])
       compPaddle.update(delta, ball.y)
       const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))
       document.documentElement.style.setProperty("--hue", hue + delta * 0.01)

       if(isLose()) handleLose()
    }
   
   lastTime = time
   window.requestAnimationFrame(update)
}

function handleLose(){
  const rect = ball.rect()
  if(rect.right >= window.innerWidth){
   playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
  }else{
    compScoreElem.textContent = parseInt(compScoreElem.textContent) + 1
  }
  
  ball.reset()
  compPaddle.reset()
}

function isLose(){
  const rect = ball.rect()
  return rect.right >= window.innerWidth|| rect.left <= 0
}

document.addEventListener("mousemove", e => {
  playerPaddle.position = (e.y / window.innerHeight) * 100
})

window.requestAnimationFrame(update)

function easyMode(){
  VELOCITY_INCREASE = 0.000001
}
function hardMode(){
  VELOCITY_INCREASE = 0.00001
}