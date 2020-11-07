const square = document.querySelectorAll('.square')
const mole = document.querySelectorAll('.mole')
const timeLeft = document.querySelector('#time-left')

let playerName
let result = 0
let CurrentTime = 60
let timerId
let moleTimer = null
function getScore(){
    return JSON.parse(localStorage.getItem('score'));
}

function updateScore(score){
    let currentScore = getScore() || [];
    currentScore.push(score)
    currentScore.sort( (a,b) => a[2] < b[2])
    currentScore.splice(10)
    localStorage.setItem('score', JSON.stringify(currentScore));
}

function randomSquare() {
    square.forEach(e => {
        e.style.backgroundPosition = "center 500%"
        setTimeout(e.classList.remove('mole'),500) 
    })

    let randomPosition = square[Math.floor(Math.random() * 9)]
    randomPosition.classList.add('mole')
    randomPosition.style.backgroundPosition = " center"

    //Assign the id of the randomPostiion to hit Posotion for us to use later
    hitPosition = randomPosition.id
}

square.forEach(e => {
    e.addEventListener('mouseup', (i)=>{
        e.classList.remove('mole')
        if(e.id === hitPosition){
            result++
            document.querySelector('.score').textContent = result
            clearTimeout(moleTimer)
            moletimer()
        }
    })
})

function countDown() {
    CurrentTime--
    timeLeft.textContent = CurrentTime

    if(CurrentTime === 0){
        square[hitPosition-1].classList.remove('mole')
        hitPosition = null
        clearInterval(timerId)
        clearTimeout(moleTimer)

        var dateToday = new Date().toLocaleDateString('en-GB', {day: 'numeric', month: 'short'})
        let score = [playerName[0].toUpperCase() + playerName.slice(1), dateToday, result]
        updateScore(score)

        document.querySelector('.time-counter').style.display = "none"
        let play = document.getElementById('play')
        play.textContent = "Click Here To Replay"
        play.style.display = 'block'
        createResultBoard();
        CurrentTime = 60
        timeLeft.textContent = CurrentTime

        alert("Heyy! " + playerName + ", you hit " + result + " moles not bad.")
    }

}

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
        td.innerHTML= scores[score][0]
        tr.appendChild(td)
        td = document.createElement('td')
        td.innerHTML= scores[score][1]
        tr.appendChild(td)
        td = document.createElement('td')
        td.innerHTML= scores[score][2]
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
function moletimer(){
    randomSquare()
    moleTimer = setTimeout( moletimer, 1000)
}

document.getElementById('play').addEventListener('click', () =>  {
    result = 0
    document.getElementById('play').style.display = "none"
    document.querySelector('.time-counter').style.display = "block"
//    moleTimer = setInterval(randomSquare, 1000)
    moletimer()
    timerId = setInterval(countDown, 1000)
})
document.getElementById('scoreReset').addEventListener('click', () => {
    localStorage.clear()
    createResultBoard();      
}) 