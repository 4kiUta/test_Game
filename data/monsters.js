
/// CREATE THE MONSTERS 

// ---------------------       MONSTER IMAGES       ---------------------   
// // MONSTER 1
// const monsteOneImage = new Image()
// monsteOneImage.src = './img/draggleSprite.png';


// // MONSTER 2
// const monsteTWOImage = new Image()
// monsteTWOImage.src = './img/embySprite.png';

// ---------------------       MONSTER IMAGES       ---------------------   


const monsters = {
    Draggle: {
        position: {
            x: 800,
            y: 100
        },
        image: {
            src : './img/idle sheet-Sheet.png'
        },
        frames: {
            max: 18,
            hold: 30
        },
        animate: true,
        isEnemy: true,
        name: "BAD GUY",
        attacks: [attacks.Tackle, attacks.Fireball] // attacks for this character ...
    },

    Emby: {
        position: {
            x: 280,
            y: 350
        },
        image: {
            src : './img/embySprite.png'
        },
        frames: {
            max: 4,
            hold: 30
        },
        animate: true,
        isEnemy: false,
        name: "Good Guy",
        attacks: [attacks.Tackle, attacks.Fireball]

    }
}