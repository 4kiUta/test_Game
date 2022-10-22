/** @type {HTMLCanvasElement} */

// 1) SELECT CANVAS
const canvas = document.getElementById("game"); // Get the canvas element (DOM Manipulation)
const c = canvas.getContext("2d"); // if we want a 2d context or a 3d context // basiclly a 2d api or a 3d api.



// 2)  CANVAS SET UP
canvas.width = 1024; // to fit modern screens good practice to say the width is 1024 px by 576px
canvas.height = 576;

const canvasCenterWidth = canvas.width / 2;
const canvasCenterHeight = canvas.height / 2;


// 10) WE DONT NEED THE WITH BACKGROUND ANYMORE. WE WILL SUBSTITUTE BY THE COLISION BLOCKS 
// c.fillStyle = "white"; // first what color we want to use from the object 2d from c
// c.fillRect(0, 0, canvas.width, canvas.height); // this is the method that draws

const colisionsMap = []; // create the 2d array
for (let i = 0; i < collisions2.length; i += 70) {
    colisionsMap.push(collisions2.slice(i, 70 + i)); // make the colisions into a 2d
}

// BattleZOnes
const battleZonesMap = [];
for (let i = 0; i < battleZonesData.length; i += 70) {
    battleZonesMap.push(battleZonesData.slice(i, 70 + i));
}

// 13) OFFSET IMAGE TO BE PLACED IN THE CENTER 
const offset = {
    x: -929,
    y: -680
}


// 12) MAKE THE BLOCKS create the collision block based on the colison map 
const boundaries = []
colisionsMap.forEach((row, yi) => {
    row.forEach((symbol, xi) => {
        if (symbol === 1025) { // only draw boundaries where we have them in the map
            boundaries.push(new Boundary({
                position: {
                    x: xi * Boundary.width + offset.x,
                    y: yi * Boundary.height + offset.y
                }
            }))
        }
    })
})

// BATTLE ZONES AREAS --> CREATE THE BATTLE ZONES FROM THE JASON THE SAME WAY WE DID FOR THE COLISION BLOCKS
const battleZones = []
battleZonesMap.forEach((row, yi) => {
    row.forEach((symbol, xi) => {
        if (symbol === 1025) { // only draw boundaries where we have them in the map
            battleZones.push(new Boundary({
                position: {
                    x: xi * Boundary.width + offset.x,
                    y: yi * Boundary.height + offset.y
                }
            }))
        }
    })
})


// 3) DRAW AN IMAGE
const image = new Image();
image.src = "./img/Pokemon_Style_Game_Map2.png"
// only load draw the image when the image is loaded (it can be very big JS is asycronos )


// DRAW foreground
const foregroundImage = new Image();
foregroundImage.src = "./img/foregrounds2.png";

// 4) DRAW PLAYER
// 80) DIFFERENT PLAYER POSITIONS 
const playerDownImage = new Image()
playerDownImage.src = "./img/hero1Down.png";
const playerUpImage = new Image()
playerUpImage.src = "./img/hero1Up.png"
const playerRightImage = new Image()
playerRightImage.src = "./img/hero1Right.png"
const playerLeftImage = new Image()
playerLeftImage.src = "./img/hero1Left.pang"

// 7) WE DONT NEED THIS ANYMORE BECAUSE THEY WILL BE CALLED IN THE LOOP
// image.onload = () => {
//     c.drawImage(image, -929, -630);
//     c.drawImage(
//         playerImage,
//         // cropping
//         0, // crop x
//         0, // crop y
//         playerImage.width / 4, // util when crop x
//         playerImage.height, // until when ctop y
//         // postioning
//         canvasCenterWidth - (playerImage.width / 4) / 2, // location of place in x
//         canvasCenterHeight - playerImage.height / 2, // location of the place in y
//         playerImage.width / 4, // actual width of the image
//         playerImage.height // actual heigth of the image
//     ); // we need to crop the image so the 
// }


// 7) CHANGE MAP COORDINATES 
// we cound create vearaibles that would trak the player and the map here using let 
// and change them within the animate function that that would make the code very messy
// EG. let backgroundImageX = -929
//     let playerImageX = playerImage.width / 4

// SOOOOO WHENEVER YOU FEEL YOU ARE CREATING SOME SORT OF VARIABLE WHERE SAVE
// SOMETHING LIKE THE BACKGROUND AND YOU SELECT SOME SORT OF PROPRIETY SUCH AS IMAGE
// OR A COORDINATE (X AND Y) IT MAKE SENSE TO CREATE SOME SORTE OF CLASS
// THAT WILL MAKE YOUR CODE MUCH MORE MANAGABLE IN A LOONG RUN !!


// 8) USE THE SPRITE CLASS TO CREATE THE BACKGROUDN
const background = new Sprite({
    position: {
        x: offset.x, //-929,
        y: offset.y //-630
    },
    image: image, // the background image

});

const foreground = new Sprite({
    position: {
        x: offset.x, //-929,
        y: offset.y //-630
    },
    image: foregroundImage, // the background image

});

const player = new Player({
    position: {
        x: canvasCenterWidth - (192 / 3) / 2, // location of place in x
        y: canvasCenterHeight - 68 / 2
    },
    image: playerDownImage,
    frames: {
        max: 3,
        hold: 10
    },
    sprites: {
        up: playerUpImage,
        down: playerDownImage,
        right: playerRightImage,
        left: playerLeftImage
    }
})


// 9.1) ILUSION OF MOVIMENT
const keys = {
    w: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
    a: {
        pressed: false
    }
}

// TEST
// const testBoundary = new Boundary({
//     position: {
//         x: 420,
//         y: 300
//     }
// })

// 29) FUNCTION FOR COLISION 
function rectangularCollision({ rect1, rect2 }) {
    return (rect1.right() >= rect2.left() &&
        rect1.left() <= rect2.right() &&
        rect1.top() <= rect2.bottom() &&
        rect1.bottom() >= rect2.top())
}

const battle = {
    initiated: false
}



// 16) MOVABLES OBJECTS
const movables = [background, ...boundaries, foreground, ...battleZones];

// 6) INFINITE LOOP ANIMATION -->>  MAIN MAIN MAIN FUNCTION !!!!
function animate() {
    // Save the animation ID into a variable 
    const animationId = window.requestAnimationFrame(animate) // a function that we want to loop over and over again, calling recursivly 

    background.draw(); // using the object function draw; instead of ---> c.drawImage(image, -929, -630);
    // 14) DRAW THE BOUNDARIES ON THE SCREEN
    boundaries.forEach(boundary => {
        boundary.draw();
    })

    // 49) DRAW BATTLE ZONES 
    battleZones.forEach(zone => {
        zone.draw()
    })



    // 15) TEST COLISION 
    // testBoundary.draw()

    // 20) DRAW PLAYER FROM ClASS
    player.draw()

    //DRAW THE FOREGROUND 
    foreground.draw()

    // c.drawImage(
    //     playerImage,
    //     // cropping
    //     0, // crop x
    //     0, // crop y
    //     playerImage.width / 4, // util when crop x
    //     playerImage.height, // until when ctop y
    //     // postioning
    //     canvasCenterWidth - (playerImage.width / 4) / 2, // location of place in x
    //     canvasCenterHeight - playerImage.height / 2, // location of the place in y
    //     playerImage.width / 4, // actual width of the image
    //     playerImage.height // actual heigth of the image
    // ); // we need to crop the image so the

    // 9.2) ILUSION OF MOVIMENT
    let moving = true;
    player.animate = false;

    // console.log(animationId)
    if (battle.initiated) return // if the battle is one we can no long run what is bellow




    // 99) CHECK COLISION WITH GRASS --> FOR FIGTH
    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {

        // for loop to check all the tiles that are battleground 
        for (let i = 0; i < battleZones.length; i++) {
            const battleZone = battleZones[i]


    
            // 100) FIND THE AREA OF THE INTERSECTION 
            const overlappingArea = (Math.min(player.right(), battleZone.right()) -
                Math.max(player.left(), battleZone.left())) *
                (Math.min(player.bottom(), battleZone.bottom()) -
                    Math.max(player.top(), battleZone.top()));


        
            // 18) ----------------  COLISION WITH OBJECT ------------ TRIGGERS THE BATTLE SCENARIO 
            if (rectangularCollision({
                rect1: player,
                rect2: battleZone
            }) && overlappingArea > (player.width * player.height) / 2 // force the player to be more than half inside the fighting area
                && Math.random() < 0.01  // only 1% of the time it activates a battle 
            ) {


                // CLOSE SCENARIO close loop
                window.cancelAnimationFrame(animationId); // stop the animation
                
                
                // 99) GSAP ANIMATE LIBRARY
                
                
                console.log("BATTLE START HERE!!! ");
                audio.Map.stop() // stop the background music
                audio.initBattle.play() // start the music for battle start 
                audio.battle.play() // keep the music for the battle rooling !!

                battle.initiated = true
                gsap.to('#overlappingDiv', {
                    opacity: 1,
                    repeat: 3,
                    yoyo: true,
                    duration: 0.4,
                    onComplete() {
                        gsap.to('#overlappingDiv', {
                            opacity: 1,
                            duration: 0.4,
                            onComplete() {
                                // ACTIVATE NEW ANIMATION LOOP 
                                initBattle()
                                animateBattle()
                                gsap.to('#overlappingDiv', {
                                    opacity: 0,
                                    duration: 0.4
                                })
                            }
                        })


                    }

                })
                break; // as soon as we coolide we breake the loop
            }

        }
    }

    // // 9.2) ILUSION OF MOVIMENT
    // let moving = true;
    // player.animate = false;

    if (keys.w.pressed && lastKey == "w") {
        // PREDICTION COLISION WITH THE FUCTURE WITH COPPY
        player.animate = true;
        player.image = player.sprites.up; // image of the player facing up
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            // 18) COLISION WITH OBJECT 
            if (rectangularCollision({
                rect1: player,
                rect2: {
                    ...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 3
                    }
                } // creates a clone of the orginal without overwritting 
            })) {

                console.log("colliding");
                moving = false;
                break; // as soon as we coolide we breake the loop
            }

        }

        if (moving) {
            movables.forEach(movable => {
                movable.position.y += 3;
            })
        }
    }
    else if (keys.s.pressed && lastKey == "s") {
        player.animate = true;
        player.image = player.sprites.down; // image of the player facing down
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            // 18) COLISION WITH OBJECT 
            if (rectangularCollision({
                rect1: player,
                rect2: {
                    ...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y - 3
                    }
                } // creates a clone of the orginal without overwritting 
            })) {
                console.log("colliding");
                moving = false;
                break; // as soon as we coolide we breake the loop
            }

        }
        if (moving) {
            movables.forEach(movable => {
                movable.position.y -= 3;
            })

        }
    }
    else if (keys.d.pressed && lastKey == "d") {
        player.animate = true;
        player.image = player.sprites.right; // image of the player facing right
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            // 18) COLISION WITH OBJECT 
            if (rectangularCollision({
                rect1: player,
                rect2: {
                    ...boundary, position: {
                        x: boundary.position.x - 3,
                        y: boundary.position.y
                    }
                } // creates a clone of the orginal without overwritting 
            })) {
                console.log("colliding");
                moving = false;
                break; // as soon as we coolide we breake the loop
            }

        }
        if (moving) {
            movables.forEach(movable => {
                movable.position.x -= 3;
            })

        }
    }
    else if (keys.a.pressed && lastKey == "a") {
        player.animate = true;
        player.image = player.sprites.left;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            // 18) COLISION WITH OBJECT 
            if (rectangularCollision({
                rect1: player,
                rect2: {
                    ...boundary, position: {
                        x: boundary.position.x + 3,
                        y: boundary.position.y
                    }
                } // creates a clone of the orginal without overwritting 
            })) {
                console.log("colliding");
                moving = false;
                break; // as soon as we coolide we breake the loop
            }

        }
        if (moving) {
            movables.forEach(movable => {
                movable.position.x += 3;
            })

        }
    }
};


// 9.3) ILUSION OF MOVIMENT
// FOR LISTENIG TO THE LAST KEY PRESSED 
let lastKey = '';
// 5) EVENT LISTENER TO TRIGGER FUNCTIONS 
window.addEventListener("keydown", (event) => {

    switch (event.key) {
        case "w":
        case "W":
            keys.w.pressed = true;
            lastKey = 'w';
            break;
        case "s":
        case "S":
            keys.s.pressed = true;
            lastKey = 's';
            break;
        case "d":
        case "D":
            keys.d.pressed = true;
            lastKey = 'd';
            break;
        case "a":
        case "A":
            keys.a.pressed = true;
            lastKey = 'a';
            break;
    }

});

window.addEventListener("keyup", (event) => {

    switch (event.key) {
        case "w":
        case "W":
            keys.w.pressed = false
            break;
        case "s":
        case "S":
            keys.s.pressed = false
            break;
        case "d":
        case "D":
            keys.d.pressed = false
            break;
        case "a":
        case "A":
            keys.a.pressed = false
            break;
    }
});



// ---------------- EVENT FOR THE SOUND START IN THE BEGINING OF THE GAME ------------------ //
let clicked = false;
addEventListener("click", () => {
    if (!clicked) {
        audio.Map.play()
        clicked = true
    }
})

// RUN THE FUNCTION ANIMATE!! WHERE EVERYTHING IS DRAWN
// animate()
initBattle()
animateBattle()


