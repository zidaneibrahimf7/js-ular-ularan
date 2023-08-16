/*? no js js needed from me */

// const myHobby = document.getElementById("myHobby")
// const hobbyInput = document.getElementById("hobbyInput")
// const from = document.getElementById("from")
// const to = document.getElementById("to")

// let hobbyList = []

// function getHobby() {
//   const hobby = hobbyInput.value
//   hobbyList.push(hobby)
//   console.log(hobbyList)
//   myHobby.innerHTML = hobbyList
//   // return hobbyInput.value 
// }

// function isValidInput(from, to) {
//   if (from) {
//     return //
//   }
//   if (to) {
//     return //
//   }
// }

// function switcher() {
//   const _from = from.value
//   const _to = to.value

//   const valid = isValidInput(_from, _to);

//   if (valid) {
//     const _temp = hobbyList[_from - 1]
//     hobbyList[_from - 1] = hobbyList[_to - 1]
//     hobbyList[_to - 1] = _temp
//     myHobby.innerHTML = hobbyList
//   } else {
//     alert('error atuh kang')
//   }

// }

const board = document.querySelector(".board")
console.log(board)

// const randomPosition = () => ~~(Math.random() * 30) + 1

// pakai ini kalo yg versi const error
function randomPosition() {
  return ~~(Math.random() * 30) + 1
}

let config = {
  speed: 100, //mili seconds
  level: 1,
  player: {
    x: randomPosition(),
    y: randomPosition(),
  },
  food: {
    x: randomPosition(),
    y: randomPosition(),
  },
  velocity: {
    x: 0,
    y: 0,
  },
  showTitle() {
    const title = document.getElementById("title__1");
    title.style.opacity = "1";
    title.style.visibility = "visible";
    title.style.zindex = "1";

    setTimeout(function () {
      title.style.opacity = "0";
      title.style.visibility = "hidden";
      title.style.zindex = "1";
    }, 3000)
  }
}

const games = {
  createFood() {
    board.innerHTML = `<div class="food" style="grid-area: ${config.food.y} / ${config.food.x}"></div>`
  },
  createPlayer() {
    board.innerHTML += `<div class="player" id="player" style="grid-area: ${config.player.y} / ${config.player.x}"></div>`
  },
  movePlayer() {
    config.player.x += config.velocity.x
    config.player.y += config.velocity.y
  },
  resetPlayerPosition() {
    if (config.player.x <= 0 || config.player.x > 30 || config.player.y <= 0 || config.player.y > 30) {
      // console.log('yah kalah..')
      alert('anda kalah')
      config.player.x = 15;
      config.player.y = 15;
    }
  },
  levelUp() {
    config.level += 1;
    console.log(config.level)
  },
  isWin() {
    if (config.player.x === config.food.x && config.player.y === config.food.y) {
      config.showTitle()
      this.levelUp()
      return true
    }
    return false
  },
  randomFoodPosition() {
    config.food.x = randomPosition()
    config.food.y = randomPosition()
  }
}

function movement(listen) {
  // console.log(listen.key)
  switch (listen.key) {
    case "ArrowUp":
      config.velocity.y = -1;
      config.velocity.x = 0;
      break;
    case "ArrowDown":
      config.velocity.y = 1;
      config.velocity.x = 0;
      break;
    case "ArrowLeft":
      config.velocity.x = -1;
      config.velocity.y = 0;
      break;
    case "ArrowRight":
      config.velocity.x = 1;
      config.velocity.y = 0;
      break;
    default:
      break;
  }
  // console.log(config.player)

}

function headMovement() {
  const playerEl = document.getElementById("player")
  if (config.velocity.x == 1) {
    playerEl.style.transform = "scaleX(-1)" // biar gambarnya nengok kanan kiri 
  }
  if (config.velocity.y == - 1) {
    playerEl.style.transform = "rotate(90deg)" // biar gambarnya kebawah
  }
  if (config.velocity.y == 1) {
    playerEl.style.transform = "rotate(-90deg)" // biar gambarnya kebawah
  }
}

function start() {
  games.createFood()
  games.createPlayer()
  games.movePlayer()
  headMovement()

  games.resetPlayerPosition()
  const win = games.isWin()
  if (win) games.randomFoodPosition()
  // if (win) alert('SELAMAT ANDA MENANG!')
  // console.table({ player_position: config.player })
}

setInterval(start, config.speed)
document.addEventListener("keydown", movement)