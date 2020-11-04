"use strict";
var playerName

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

document.addEventListener('DOMContentLoaded', function loadGame() {

    let moves = 0
    document.querySelector('.grid').innerHTML = ""

    // card option
    const cardArray = [
        { name: 'apple', img:  'img/apple.png'},
        { name: 'apple', img:  'img/apple.png'},
        { name: 'bananas', img:  'img/bananas.png'},
        { name: 'bananas', img:  'img/bananas.png'},
        { name: 'broccoli', img:  'img/broccoli.png' },
        { name: 'broccoli', img:  'img/broccoli.png' },
        { name: 'burger', img:  'img/burger.png' },
        { name: 'burger', img:  'img/burger.png' },
        { name: 'cake', img:  'img/cake.png' },
        { name: 'cake', img:  'img/cake.png' },
        { name: 'carrot', img:  'img/carrot.png' },
        { name: 'carrot', img:  'img/carrot.png' },
        { name: 'popcorn', img:  'img/popcorn.png' },
        { name: 'popcorn', img:  'img/popcorn.png' },
        { name: 'tomato', img:  'img/tomato.png' },
        { name: 'tomato', img:  'img/tomato.png' }
    ]

    cardArray.sort(() => 0.5 - Math.random())

    const grid = document.querySelector('.grid')
    var cardsChosen = []
    var cardsChosenId = []
    var cardsWon  = []

    //create Your Board
    function createBoard(){
        for(let i=0; i<cardArray.length; i++){
            var div = document.createElement('div');
            div.classList.add('card')
            div.setAttribute('data-id', i)

            var cardFront = document.createElement("img")
            cardFront.setAttribute('src', 'img/floor.png')
            cardFront.classList.add('card_face', 'card_Front')
            div.appendChild(cardFront)

            var cardBack = document.createElement("img")
            cardBack.setAttribute('src', cardArray[i].img)
            cardBack.classList.add('card_face', 'card_Back')

            div.appendChild(cardBack)
            grid.appendChild(div)
            div.addEventListener('click', flipCard)
        }
    }

    //Check for Match
    function chechforMatch(){
        var cards = document.querySelectorAll('.card');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];
        if(cardsChosen[0] === cardsChosen[1]) {
            cards[optionOneId].classList.add('found');
            cards[optionTwoId].classList.add('found');
            cardsWon.push(cardsChosen[0])
        }else{
            cards[optionOneId].classList.toggle('is-flipped')
            cards[optionTwoId].classList.toggle('is-flipped')
        }
        cardsChosen = []
        cardsChosenId = []
        if(cardsWon.length === cardArray.length/2){
            var dateToday = new Date().toLocaleDateString('en-GB', {day: 'numeric', month: 'short'})
            let score = [playerName[0].toUpperCase() + playerName.slice(1), dateToday, moves]
            updateScore(score)
                
            document.querySelector('#scoreReset').style.display = "none"

            let win = document.createElement('p')
            win.classList.add('win-mess')
            win.innerHTML = "Congratulations!\n " + playerName + " you have found all matches in " + moves + " moves"
            let replay = document.getElementById('replay');
            document.querySelector('.scoreBoard').insertBefore(win, replay)
            replay.style.display = 'block'
        }
    }

    //flip card
    function flipCard(){
        this.classList.toggle('is-flipped');
        document.querySelector('.moves').textContent = ++moves

        var cardId = this.getAttribute('data-id')

        //if card is reclicked
        if(cardsChosen.length == 1 && cardId == cardsChosenId[0]){
            document.querySelector('.moves').textContent = --moves
            cardsChosen = []
            cardsChosenId = []
            return
        }

        cardsChosen.push(cardArray[cardId].name)
        cardsChosenId.push(cardId)
        if(cardsChosen.length === 2){
            setTimeout(chechforMatch, 500)
        }   
    }

    createBoard();

    function createResultBoard(){
        const result = getScore()
        let tab = document.querySelector('#score-body')
        tab.innerHTML = ""
        let tr = document.createElement('tr')
        for(let score in result){
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
        td.classList.add('moves')
        td.innerHTML= moves
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
    
})