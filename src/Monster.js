class Monster {
    constructor({
        position,
        velocity,
        image,
        frames = { max: 1, hold: 10 },
        sprites,
        animate,
        rotation = 0

    }) { // we can pass to the custrouctur a object this way we dont need to remember the order of the parameter, we have just one object 

        this.position = position;
        this.image = new Image();
        this.frames = { ...frames, val: 0, elapsed: 0 };
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max;
            this.height = this.image.height;
            // console.log(this.width)
            // console.log(this.height)
        }
        this.image.src = image.src

        this.animate = animate;
        this.sprites = sprites;
        this.opacity = 1;
        this.rotation = rotation;

        // added by me !
        this.left = this.left;
        this.right = this.right;
        this.top = this.top;
        this.bottom = this.bottom;


        // Health of the enemy (STATUS )
    }

    draw() {
        c.save() // --- global propriety
        c.translate(
            this.position.x + this.width / 2,
            this.position.y + this.height / 2) // where it starts
        c.rotate(this.rotation) // how much we want to rotate 
        c.translate(
            - this.position.x - this.width / 2,
            - this.position.y - this.height / 2) // where it starts
        c.globalAlpha = this.opacity

        c.drawImage(
            this.image,
            // cropping
            this.frames.val * this.width,      //0, // crop x -->> change to move it 48px to the side
            0, // crop y
            this.image.width / this.frames.max, // util when crop x
            this.image.height, // until we should crop y
            this.position.x, // location of place in x
            this.position.y, // location of the place in y
            this.image.width / this.frames.max, // actual width of the image
            this.image.height // actual heigth of the image
        )
        c.restore()

        // CHANGE ACROSS ALL THE FRAMES
        if (!this.animate) {
            return // if this.moving is flase we return nothing and the code bellow doesnet run
        }

        if (this.frames.max > 1) {
            this.frames.elapsed++
        }

        if (this.frames.elapsed % this.frames.hold === 0) {
            if (this.frames.val < this.frames.max - 1) {
                this.frames.val++
            } else {
                this.frames.val = 0
            }
        }
    }

    left() {
        return this.position.x
    }


    right() {
        return this.position.x + this.width;
    }

    top() {
        return this.position.y;
    }

    bottom() {
        return this.position.y + this.height;
    }



}


class Character extends Monster {
    constructor({
        position,
        velocity,
        image,
        frames = { max: 1, hold: 10 },
        sprites,
        animate,
        rotation = 0,
        isEnemy = false,
        name,
        attacks
    }) {
        super({
            position,
            velocity,
            image,
            frames,
            sprites,
            animate,
            rotation
        })
        this.health = 100
        this.isEnemy = isEnemy;
        this.name = name;
        this.attacks = attacks;
    }


    faint() {
        // show the dialogo box ## CHANGING DIALOGO BOX 
        document.querySelector("#dialgueBox").innerHTML = this.name + " fainted!"
        gsap.to(this.position, {
            y: this.position.y + 20
        })
        gsap.to(this, {
            opacity: 0
        })

        // play victory sound
        audio.victory.play()
        audio.battle.stop()
    }  

    attack({ attack, recipient, renderedSprites }) {

        // show the dialogo box ## CHANGING DIALOGO BOX 
        document.querySelector("#dialgueBox").style.display = "block";
        document.querySelector("#dialgueBox").innerHTML = this.name + " used " + attack.name;


        let healthBar = "#enemyHealthBar";
        if (this.isEnemy) {
            healthBar = "#playerHealthBar"
        }

        // ROTATION CASE ITS ENEMY OR PLAYER 
        let rotation = 1
        if (this.isEnemy) {
            rotation = -2.2
        }

        // update the health 
        recipient.health -= attack.damage;


        switch (attack.name) {
            case "Tackle":


                const timeLine = gsap.timeline()

                let movementDistance = 20;
                if (this.isEnemy) {
                    movementDistance = - 20;
                }

                timeLine.to(this.position, {
                    x: this.position.x - movementDistance // current positon - 20 px in the x axis 
                }).to(this.position, {
                    x: this.position.x + movementDistance * 2,
                    duration: 0.1,
                    onComplete: () => { // make it an arrow function to use this.heatlt 
                        // WHERE ENEMY GOTS HIT 
                        audio.tackleHit.play()
                        gsap.to(healthBar, {
                            width: recipient.health + '%'
                        })

                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08
                        })

                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.1 // to where, how long will it take
                        })
                    }
                }).to(this.position, {
                    x: this.position.x
                })
                break;



            // ANOTHER ATTACK 
            case "Fireball":
                audio.initFireBall.play()
                const firaballImage = new Image();
                firaballImage.src = "./img/fireball.png"
                const fireball = new Monster({ // change no a new object class
                    position: {
                        x: this.position.x,
                        y: this.position.y
                    },
                    image: firaballImage,
                    frames: {
                        max: 4,
                        hold: 10
                    },
                    animate: true,
                    rotation: rotation

                })

                renderedSprites.splice(1, 0, fireball) // put the fireball 
                //make fireball move to the enemy 
                gsap.to(fireball.position, {
                    x: recipient.position.x,
                    y: recipient.position.y,
                    onComplete: () => {
                        // ENEMY GOT IT 
                        audio.firebalHit.play()
                        gsap.to(healthBar, {
                            width: recipient.health + '%'
                        })
                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.01
                        })
                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.1 // to where, how long will it take
                        })
                        renderedSprites.splice(1, 1) // removes from the array that is been animated the last element that was passed inside of it (the fireball)
                    }
                })

                break;
        }

    }
}