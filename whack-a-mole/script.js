const square = document.querySelectorAll('.square')
const mole = document.querySelectorAll('.mole')
const timeLeft = document.querySelector('#time-left')

let playerName
let result = 0
let CurrentTime = timeLeft.textContent

function getScore(){
    return JSON.parse(localStorage.getItem('score'));
}

function updateScore(score){
    let currentScore = getScore() || [];
    currentScore.push(score)
    currentScore.sort( (a,b) => a[2] > b[2])
    currentScore.splice(10)
    localStorage.setItem('score', JSON.stringify(currentScore));
}

function randomSquare() {
    square.forEach(e => {
        e.classList.remove('mole')
    })

    let randomPosition = square[Math.floor(Math.random() * 9)]
    randomPosition.classList.add('mole')

    //Assign the id of the randomPostiion to hit Posotion for us to use later
    hitPosition = randomPosition.id
}

square.forEach(e => {
    e.addEventListener('mouseup', (i)=>{
        e.classList.remove('mole')
        if(e.id === hitPosition) result++;
        document.querySelector('.score').textContent = result
    })
})

let moleTimer = null
function moveMole() {
    moleTimer = setInterval(randomSquare, 1500)   
}

moveMole()
//randomSquare()
function countDown() {
    CurrentTime--
    timeLeft.textContent = CurrentTime

    if(CurrentTime === 0){
        clearInterval(timerId)
        clearInterval(moleTimer)
        alert('Game Over! your score is '+ result)
    }

}

let timerId = setInterval(countDown, 1000)

function createResultBoard(){
    const scores = getScore()
    let tab = document.querySelector('#score-body')
    tab.innerHTML = ""
    let tr = document.createElement('tr')
    for(let score in scores){
        let tr = document.createElement('tr')
        let td = document.createElement('td')
        td.innerHTML= Number(score)+1
        tr.appendChild(td)
        td = document.createElement('td')
        td.innerHTML= result[score][0]
        tr.appendChild(td)
        td = document.createElement('td')
        td.innerHTML= result[score][1]
        tr.appendChild(td)
        td = document.createElement('td')
        td.innerHTML= result[score][2]
        tr.appendChild(td)
        tab.appendChild(tr)
    }
    tr = document.createElement('tr')
    let td = document.createElement('td')
    td.innerHTML= '#'
    tr.appendChild(td)
    td = document.createElement('td')
    td.innerHTML= playerName
    tr.appendChild(td)
    td = document.createElement('td')
    td.innerHTML= 'Now'
    tr.appendChild(td)
    td = document.createElement('td')
    td.classList.add('score')
    td.textContent = result
    tr.appendChild(td)
    tab.appendChild(tr)

}


while(!playerName) {
    playerName = prompt("Enter Player Name", "Guest");
}

createResultBoard();
document.getElementById('replay').addEventListener('click', () =>  {
    document.querySelector('.win-mess').remove();
    document.getElementById('replay').style.display = 'none'
    document.querySelector('#scoreReset').style.display = "block"
    loadGame();
})
document.getElementById('scoreReset').addEventListener('click', () => {
    localStorage.clear()
    createResultBoard();      
}) 
