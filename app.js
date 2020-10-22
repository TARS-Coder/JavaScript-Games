"use strict";
var playerName
document.addEventListener('DOMContentLoaded', function loadGame() {

    let moves = 0
    const resultDisplay = document.querySelector('#result')
    resultDisplay.textContent = "Moves: " + moves;
    document.querySelector('#replay').style.visibility = "hidden"
    document.querySelector('.grid').innerHTML = ""

    // card option
    const cardArray = [
        {
            name: 'apple',
            img:  'img/apple.png'
        },
        {
            name: 'apple',
            img:  'img/apple.png'
        },
        {
            name: 'bananas',
            img:  'img/bananas.png'
        },
        {
            name: 'bananas',
            img:  'img/bananas.png'
        },
        {
            name: 'broccoli',
            img:  'img/broccoli.png'
        },
        {
            name: 'broccoli',
            img:  'img/broccoli.png'
        },
        {
            name: 'burger',
            img:  'img/burger.png'
        },
        {
            name: 'burger',
            img:  'img/burger.png'
        },
        {
            name: 'cake',
            img:  'img/cake.png'
        },
        {
            name: 'cake',
            img:  'img/cake.png'
        },
        {
            name: 'carrot',
            img:  'img/carrot.png'
        },
        {
            name: 'carrot',
            img:  'img/carrot.png'
        },
        {
            name: 'popcorn',
            img:  'img/popcorn.png'
        },
        {
            name: 'popcorn',
            img:  'img/popcorn.png'
        },
        {
            name: 'tomato',
            img:  'img/tomato.png'
        },
        {
            name: 'tomato',
            img:  'img/tomato.png'
        }
    ]

    cardArray.sort(() => 0.5 - Math.random())

    const grid = document.querySelector('.grid')
    var cardsChosen = []
    var cardsChosenId = []
    var cardsWon  = []

    //create Your Board
    function createBoard(){
        for(let i=0; i<cardArray.length; i++){
            var card = document.createElement("img")
            card.setAttribute('src', 'img/floor.png')
            card.setAttribute('data-id', i)
            card.addEventListener('click', flipCard)
            grid.appendChild(card)
        }
    }

    //Check for Match
    function chechforMatch(){
        var cards = document.querySelectorAll('img');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];
        if(cardsChosen[0] === cardsChosen[1]) {
            cards[optionOneId].classList.add('found');
            cards[optionTwoId].classList.add('found');
            cardsWon.push(cardsChosen[0])
        }else{
            cards[optionOneId].setAttribute('src', 'img/floor.png')
            cards[optionTwoId].setAttribute('src', 'img/floor.png')
        }
        cardsChosen = []
        cardsChosenId = []
        if(cardsWon.length === cardArray.length/2){
            resultDisplay.textContent = "Congratulations! " + playerName + " you have found all matches in " + moves + " moves";
            document.getElementById('replay').style.visibility = 'visible'
        }
    }

    //flip card
    function flipCard(){
        resultDisplay.textContent = 'Moves: ' + ++moves

        var cardId = this.getAttribute('data-id')

        //if card is reclicked
        if(cardsChosen.length == 1 && cardId == cardsChosenId[0]){
            this.setAttribute('src', 'img/floor.png')
            cardsChosen = []
            cardsChosenId = []
            return
        }

        cardsChosen.push(cardArray[cardId].name)
        cardsChosenId.push(cardId)
        this.setAttribute('src', cardArray[cardId].img); 
        this.setAttribute('title', cardArray[cardId].name); 
        if(cardsChosen.length === 2){
            setTimeout(chechforMatch, 500)
        }
    }

    createBoard();

    document.getElementById('replay').addEventListener('click', loadGame)  
    
    while(!playerName) {
        playerName = prompt("Enter Player Name", "Guest");
    }
    
})