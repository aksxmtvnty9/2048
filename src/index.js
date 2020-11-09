const displayGrid = document.querySelector('#grid')
const currentScore = document.querySelector('#current-score')
const bestScore = document.querySelector('#best-score')
const newGame = document.querySelector('#new-game')
const moves = document.querySelector('#moves')
const row = 4
let squares = []
const className = 'color-'
let numberOfMoves = 0

// init the game
const initGame = () => {
  currentScore.innerHTML = 0
  bestScore.innerHTML = 0
  createSquares()
}

// create the squares
const createSquares = () => {
  for (let i = 0; i < row * row; i++) {
    let square = document.createElement('div')
    square.innerHTML = 0
    square.classList.add('square')
    displayGrid.appendChild(square)
    squares.push(square)
  }
  fillSquare()
  fillSquare()
}

// fill random squares
const fillSquare = () => {
  const randomNumber = Math.floor(Math.random() * squares.length)
  if (squares[randomNumber].innerHTML == 0) {
    squares[randomNumber].innerHTML = 2
    checkGameOver()
    return
  } else {
    fillSquare()
  }
}

// Check game over
const checkGameOver = () => {
  let zeros = 0
  for (let i = 0; i < row * row; i++) {
    if (squares[i].innerHTML == 0) {
      zeros++
    }
  }
  if (zeros === 0) {
    alert('GAME OVER')
    // setTimeout(() => {
    createAgain()
    // }, 3000)
  }
}

// creates new game after win or lose
const createAgain = () => {
  squares = []
  displayGrid.innerHTML = ''
  bestScore.innerHTML = currentScore.innerHTML || 0
  currentScore.innerHTML = 0
  numberOfMoves = 0
  moves.innerHTML = ' '
  createSquares()
}

//start new game
newGame.addEventListener('click', () => {
  alert('Do you want to start again ?')
  createAgain()
})

// Traverse right
const traverseRight = () => {
  for (let i = 0; i < row * row; i++) {
    if (i % 4 === 0) {
      let totOne = squares[i].innerHTML
      let totTwo = squares[i + 1].innerHTML
      let totThree = squares[i + 2].innerHTML
      let totFour = squares[i + 3].innerHTML
      const currentRow = [
        parseInt(totOne),
        parseInt(totTwo),
        parseInt(totThree),
        parseInt(totFour),
      ]
      const numberList = currentRow.filter((number) => number)
      const emptyList = Array.from(Array(row - numberList.length), () => 0)
      let newRow = emptyList.concat(numberList)
      squares[i].innerHTML = newRow[0]
      squares[i + 1].innerHTML = newRow[1]
      squares[i + 2].innerHTML = newRow[2]
      squares[i + 3].innerHTML = newRow[3]
    }
  }
}

// Traverse left
const traverseLeft = () => {
  for (let i = 0; i < row * row; i++) {
    if (i % 4 === 0) {
      let totOne = squares[i].innerHTML
      let totTwo = squares[i + 1].innerHTML
      let totThree = squares[i + 2].innerHTML
      let totFour = squares[i + 3].innerHTML
      const currentRow = [
        parseInt(totOne),
        parseInt(totTwo),
        parseInt(totThree),
        parseInt(totFour),
      ]
      const numberList = currentRow.filter((number) => number)
      const emptyList = Array.from(Array(row - numberList.length), () => 0)
      let newRow = numberList.concat(emptyList)
      squares[i].innerHTML = newRow[0]
      squares[i + 1].innerHTML = newRow[1]
      squares[i + 2].innerHTML = newRow[2]
      squares[i + 3].innerHTML = newRow[3]
    }
  }
}

// Traverse down
const traverseDown = () => {
  for (let i = 0; i < row; i++) {
    let totOne = squares[i].innerHTML
    let totTwo = squares[i + row].innerHTML
    let totThree = squares[i + row * 2].innerHTML
    let totFour = squares[i + row * 3].innerHTML
    const currentCol = [
      parseInt(totOne),
      parseInt(totTwo),
      parseInt(totThree),
      parseInt(totFour),
    ]
    const numberList = currentCol.filter((number) => number)
    const emptyList = Array.from(Array(row - numberList.length), () => 0)
    let newRow = emptyList.concat(numberList)
    squares[i].innerHTML = newRow[0]
    squares[i + row].innerHTML = newRow[1]
    squares[i + row * 2].innerHTML = newRow[2]
    squares[i + row * 3].innerHTML = newRow[3]
  }
}

// Traverse up
const traverseUp = () => {
  for (let i = 0; i < row; i++) {
    const totOne = squares[i].innerHTML
    const totTwo = squares[i + row].innerHTML
    const totThree = squares[i + row * 2].innerHTML
    const totFour = squares[i + row * 3].innerHTML
    const currentCol = [
      parseInt(totOne),
      parseInt(totTwo),
      parseInt(totThree),
      parseInt(totFour),
    ]
    const numberList = currentCol.filter((number) => number)
    const emptyList = Array.from(Array(row - numberList.length), () => 0)
    const newRow = numberList.concat(emptyList)
    squares[i].innerHTML = newRow[0]
    squares[i + row].innerHTML = newRow[1]
    squares[i + row * 2].innerHTML = newRow[2]
    squares[i + row * 3].innerHTML = newRow[3]
  }
}

// Combine the values if nearby values are same
const combineRow = () => {
  for (let i = 0; i < row * row - 1; i++) {
    if (squares[i].innerHTML === squares[i + 1].innerHTML) {
      const newValue =
        parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML)
      squares[i].innerHTML = newValue
      squares[i + 1].innerHTML = 0
    }
  }
  checkForWin()
}

const combineCol = () => {
  for (let i = 0; i < row * row - row; i++) {
    if (squares[i].innerHTML === squares[i + row].innerHTML) {
      const newValue =
        parseInt(squares[i].innerHTML) + parseInt(squares[i + row].innerHTML)
      squares[i].innerHTML = newValue
      squares[i + row].innerHTML = 0
    }
  }
  checkForWin()
}

const checkForWin = () => {
  for (let i = 0; i < row * row - 1; i++) {
    if (squares[i].innerHTML === 2048) {
      alert('YOU WIN !!')
      //   setTimeout(() => {
      createAgain()
      //   }, 3000)
    }
  }
}

// Controls the game based on key press
const gameContoller = (event) => {
  if (event.keyCode === 37) {
    controlLeft()
  }
  if (event.keyCode === 38) {
    controlUp()
  }
  if (event.keyCode === 39) {
    controlRight()
  }
  if (event.keyCode === 40) {
    controlDown()
  }
  if (
    event.keyCode === 37 ||
    event.keyCode === 38 ||
    event.keyCode === 39 ||
    event.keyCode === 40
  ) {
    checkColorChange()
    increaseNumberofMoves()
    addPoints()
  }
}

// check and change the color of the squares
const checkColorChange = () => {
  for (let i = 0; i < row * row; i++) {
    if (squares[i].innerHTML > 2) {
      squares[i].className = ''
      let classNames = ['square', `${className}${squares[i].innerHTML}`]
      squares[i].classList.add(...classNames)
    } else {
      squares[i].className = ''
      squares[i].classList.add('square')
    }
  }
}

// increase number of moves
const increaseNumberofMoves = () => {
  numberOfMoves++
  moves.innerHTML = `Total moves: ${numberOfMoves}`
}

// add points
const addPoints = () => {
  currentScore.innerHTML = parseInt(currentScore.innerHTML) + 5
}

// Add listner for key press
document.addEventListener('keyup', gameContoller)

// Contol the right arrow
const controlRight = () => {
  traverseRight()
  combineRow()
  traverseRight()
  fillSquare()
}

// Control the left arrow
const controlLeft = () => {
  traverseLeft()
  combineRow()
  traverseLeft()
  fillSquare()
}

// Contol the right arrow
const controlUp = () => {
  traverseUp()
  combineCol()
  traverseUp()
  fillSquare()
}

// Control the left arrow
const controlDown = () => {
  traverseDown()
  combineCol()
  traverseDown()
  fillSquare()
}

initGame()
