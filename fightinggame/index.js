const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)
//Game Border

const gravity = 0.7

class Sprite {

    constructor({ position, velocity, color = 'red', offset }) {
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackbox = {
            position: {
                x: this.position.x,
                y: this.position.y
            } ,
            offset: offset,
            width: 100 ,
            height: 50
            

        }
        this.color = color
        this.IsAttacking
        this.health = 100
    }

    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        //Attack box
        if(this.isAttacking){
            c.fillStyle = 'green'
            c.fillRect(this.attackbox.position.x, this.attackbox.position.y, this.attackbox.width, this.attackbox.height)
        }

    }

    update() {
        this.draw()
        this.attackbox.position.x = this.position.x - this.attackbox.offset.x 
        this.attackbox.position.y = this.position.y

        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else this.velocity.y += gravity
    }
    //Don't fall through the ground

    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }

}

const player = new Sprite({
    position: {
    x:0,
    y:0
    },
    velocity: {
        x:0,
        y:0
    },
    offset: {
        x:0,
        y:0
    }
})
//Player

const enemy = new Sprite({
    position: {
        x:400,
        y:150
    },
    velocity: {
        x:0,
        y:0
    },
    color: 'blue',
    offset: {
        x: 50,
        y: 0
    }
})
//Enemy



const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w:  {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}
//Key Presses

function rectangularCollision ({ rectangle1, rectangle2 }) {
    return (
        rectangle1.attackbox.position.x + rectangle1.attackbox.width >= rectangle2.position.x
        && rectangle1.attackbox.position.x <= rectangle2.position.x + rectangle2.width
        //Horizontal
        && rectangle1.attackbox.position.y + rectangle1.attackbox.height >= rectangle2.position.y 
        && rectangle1.attackbox.position.y <= rectangle2.position.y + rectangle2.height
        //Vertical
    )
}
function determineWinner({ player, enemy, timerId }) {
    console.log('Is this even called?')
    clearTimeout(timerId)

    document.querySelector("#displayText").style.display = 'flex'
    if (player.health === enemy.heatlh) {
        document.querySelector("#displayText").innerHTML = 'Tie'
        console.log('Tie')
    }  else if (player.health > enemy.heatlh) {
        document.querySelector("#displayText").innerHTML = 'Player 1 Wins'
        console.log('Player 1 Wins')
    }   else if (enemy.health > player.heatlh) {
        document.querySelector("#displayText").innerHTML = 'Player 2 Wins'
        console.log('Player 2 Wins')
    }
}
let timer = 100
let timerId 
function decreaseTimer() {
    if (timer >0){
        timerId = setTimeout(decreaseTimer, 1000);
        timer -= 1;
        document.querySelector("#timer").innerHTML = timer

    }
    

    if (timer===0){

        document.querySelector("#displayText").style.display = 'flex'
        determineWinner({player, enemy})
    }


}
//Timer code and win conditionals
decreaseTimer()
function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()
    //console.log('working')


    player.velocity.x = 0
    enemy.velocity.x = 0
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
    }
    //Player Movement

    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5
    }
    //Enemy Movement



    //Hitbox collisions

    if (
        rectangularCollision({
            rectangle1: player,
            rectangle2: enemy
        })
        && player.isAttacking
        ) {
        player.isAttacking = false
        enemy.health -= 20
        document.querySelector('#enemyHealth').style.width = enemy.health + '%'
        console.log('oof')
    }
    if (
        rectangularCollision({
            rectangle1: enemy,
            rectangle2: player
        })
        && enemy.isAttacking
        ) {
        enemy.isAttacking = false
        player.health -=20
        document.querySelector('#playerHealth').style.width = player.health + '%'
        console.log('ouch')
    }


    //end game based off of health
    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({player, enemy, timerId })

    }
}
animate()
//KEYDOWN
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'w':
            player.velocity.y = -20
            break
        case ' ':
            player.attack()
            break
        //Player Keypresses
        case 'ArrowRight':
                keys.ArrowRight.pressed = true
                enemy.lastKey = 'ArrowRight'
                break
        case 'ArrowLeft':
                keys.ArrowLeft.pressed = true
                enemy.lastKey = 'ArrowLeft'
                break
        case 'ArrowUp':
                enemy.velocity.y = -20
                break
        case '0':
                enemy.isAttacking = true
                break
        //Enemy Keypresses
    }

    //console.log(event.key)

})

//KEYUP
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
                keys.a.pressed = false
                break
    }
    //console.log(event.key)
    //Player Keys

    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
                keys.ArrowLeft.pressed = false
                break
    }
    //Enemy Keys
    //console.log(event.key)

})

