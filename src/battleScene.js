// --------------------------- BATTLE SCENARIO  (CHANGE THE IMAGE HERE ) --------------------- //

const battleBackgroundImage = new Image()
battleBackgroundImage.src = './img/battleback1.png';
const battleBackground = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    image: battleBackgroundImage
});

// --------------------------- BATTLE SCENARIO  (CHANGE THE IMAGE HERE ) --------------------- //



/// CREATE THE MONSTERS 
// MONSTER 1
let enemyMoster;

// MONSTER 2
let ourMonster;

let renderedSprites;

let queue = [];


function initBattle() {
    document.querySelector("#userInterface").style.display = 'block'
    document.querySelector("#dialgueBox").style.display = 'none'
    document.querySelector("#enemyHealthBar").style.width = '100%'
    document.querySelector("#playerHealthBar").style.width = '100%'
    document.querySelector("#attacksBox").replaceChildren()


    enemyMoster = new Character(monsters.Draggle)
    ourMonster = new Character(monsters.Emby)
    renderedSprites = [enemyMoster, ourMonster]
    queue = []

    ourMonster.attacks.forEach((attack) => {
        const button = document.createElement("button");
        button.innerHTML = attack.name

        document.querySelector("#attacksBox").append(button)
    })




    document.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", (e) => {

            //console.log(e.currentTarget.innerHTML) // gives us the text of the button we are clicking 

            // when we click we should call our character then slecet the attack 

            const selectedAttack = attacks[e.currentTarget.innerHTML]; // get the attack that we want 

            ourMonster.attack({
                attack: selectedAttack,
                recipient: enemyMoster,
                renderedSprites
            })

            // if enemy dies!
            if (enemyMoster.health <= 0) {
                queue.push(() => {
                    enemyMoster.faint()
                })
                queue.push(() => {
                    // fade back to black 
                    gsap.to("#overlappingDiv", {
                        opacity: 1,
                        onComplete: () => {
                            window.cancelAnimationFrame(battleAnimationId)
                            animate()
                            document.querySelector("#userInterface").style.display = 'none'

                            gsap.to("#overlappingDiv", {
                                opacity: 0
                            })
                            battle.initiated = false
                            audio.Map.play()
                        }
                    })
                })

                return // to stop 
            }
            // Enemys and you attack here !
            // RANDOM ATTACK FROM ENEMY 
            const randomAttack = enemyMoster.attacks[Math.floor(Math.random() * enemyMoster.attacks.length)]

            queue.push(() => {
                enemyMoster.attack({
                    attack: randomAttack,
                    recipient: ourMonster,
                    renderedSprites
                })

                // if WE DIE AFTER THE ATTACK OF THE ENEMY!
                if (ourMonster.health <= 0) {
                    queue.push(() => {
                        ourMonster.faint()

                        // fade back to black 
                        gsap.to("#overlappingDiv", {
                            opacity: 1,
                            onComplete: () => {
                                window.cancelAnimationFrame(battleAnimationId)
                                animate()

                                document.querySelector("#userInterface").style.display = 'none'

                                gsap.to("#overlappingDiv", {
                                    opacity: 0
                                })
                                battle.initiated = false
                                audio.Map.play()
                            }
                        })
                    })

                    return // to stop 
                }
            })
        })

        // event listener for info about attacks 
        button.addEventListener("mouseenter", (e) => { // when we over the buttons 
            const hoverAttack = attacks[e.currentTarget.innerHTML]; // get the attack that we want 
            document.querySelector("#attackType").innerHTML = hoverAttack.type
            document.querySelector("#attackType").style.color = hoverAttack.color


        })
    })
}




let battleAnimationId;
function animateBattle() {
    battleAnimationId = window.requestAnimationFrame(animateBattle)

    battleBackground.draw();
    // pass them into the render sprites 
    // enemyMoster.draw();
    // ourMonster.draw()

    // ATTACK SPRITES 
    renderedSprites.forEach(sprite => {
        sprite.draw()
    })
}


// ------------------------- TRIGGER THE DIALOGO BOX EVENTS WIT HE QUE -------------------------- //


document.querySelector("#dialgueBox").addEventListener("click", (e) => {
    if (queue.length > 0) {
        // console.log(queue)
        queue[0]()
        queue.shift()
    } else {
        e.currentTarget.style.display = "none";
    }

})



// ANIMATE ATTACKS 

// by default an event listener listens to all the paf 
// lets add to the button 


// ----------------------- OUR EVENT LISTENER FOR OUR BUTTONS (ATTACK) ------------------------//
// QUEUE ATTACKS 

// document.querySelectorAll("button").forEach((button) => {
//     button.addEventListener("click", (e) => {

//         //console.log(e.currentTarget.innerHTML) // gives us the text of the button we are clicking 

//         // when we click we should call our character then slecet the attack 

//         const selectedAttack = attacks[e.currentTarget.innerHTML]; // get the attack that we want 

//         ourMonster.attack({
//             attack: selectedAttack,
//             recipient: enemyMoster,
//             renderedSprites
//         })

//         // if enemy dies!
//         if (enemyMoster.health <= 0) {
//             queue.push(() => {
//                 enemyMoster.faint()
//             })
//             queue.push(() => {
//                 // fade back to black 
//                 gsap.to("#overlappingDiv", {
//                     opacity: 1,
//                     onComplete: () => {
//                         window.cancelAnimationFrame(battleAnimationId)
//                         animate()

//                         document.querySelector("#userInterface").style.display = 'none'

//                         gsap.to("#overlappingDiv", {
//                             opacity: 0
//                         })
//                     }
//                 })
//             })

//             return // to stop 
//         }
//         // Enemys and you attack here !
//         // RANDOM ATTACK FROM ENEMY 
//         const randomAttack = enemyMoster.attacks[Math.floor(Math.random() * enemyMoster.attacks.length)]

//         queue.push(() => {
//             enemyMoster.attack({
//                 attack: randomAttack,
//                 recipient: ourMonster,
//                 renderedSprites
//             })

//             // if WE DIE AFTER THE ATTACK OF THE ENEMY!
//             if (ourMonster.health <= 0) {
//                 queue.push(() => {
//                     ourMonster.faint()
//                 })

//                 return // to stop 
//             }
//         })
//     })

//     // event listener for info about attacks 
//     button.addEventListener("mouseenter", (e) => { // when we over the buttons 
//         const hoverAttack = attacks[e.currentTarget.innerHTML]; // get the attack that we want 
//         document.querySelector("#attackType").innerHTML = hoverAttack.type
//         document.querySelector("#attackType").style.color = hoverAttack.color


//     })
// })


// animate()
// initBattle()
// animateBattle()
