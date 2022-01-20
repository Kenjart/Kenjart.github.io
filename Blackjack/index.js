
let firstCard = getRandom()
let secondCard = getRandom()
let sum = firstCard + secondCard
let hasBlackJack = false
let isAlive = false
let message = ""
let cards = [firstCard, secondCard]
let player = {
    name: "You",
    chips: 145
}

let messageEl = document.getElementById("message-el")
console.log(messageEl)
let sumEl = document.querySelector("#sum-el")
console.log(sumEl)
let cardsEl = document.getElementById("cards-el")


let playerEl = document.getElementById(player-el)
console.log(playerEl)
playerEl.textContent = player.name + ": $" + player.chips

function getRandom() {
    let randomNumber = Math.floor( Math.random() * 13) + 1
    if (randomNumber === 1) {
        return 11
    }else if (randomNumber >= 11) {
        return 10
    }
    return randomNumber
}

function startGame() {
    isAlive = true
    let firstCard = getRandom()
    let secondCard = getRandom()
    cards = [firstCard, secondCard]
    renderGame()
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (x = 0; x < cards.length; x++) {
        cardsEl.textContent += cards[x] + " "
    }
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        hasBlackJack = true
        message = "You won!"
    } else{
        isAlive = false
        message = "You lost."
    }
    messageEl.textContent = message
}

function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        console.log("A new card has been drawn")
        let newCard = getRandom()
        sum += newCard
        cards.push(newCard)
        renderGame()
    }

}
//Cash out
console.log(hasBlackJack)
