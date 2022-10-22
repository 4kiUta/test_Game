// Create the player Sprite 

class Player {
    constructor({ position, velocity, image, frames = { max: 1, hold: 10 }, sprites, animate }) { // we can pass to the custrouctur a object this way we dont need to remember the order of the parameter, we have just one object 
        this.position = position;
        this.image = image;
        this.frames = { ...frames, val: 0, elapsed: 0 };
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max;
            this.height = this.image.height;
            // console.log(this.width)
            // console.log(this.height)
        }
        this.animate = animate;
        this.sprites = sprites;

        // added by me !
        this.left = this.left;
        this.right = this.right;
        this.top = this.top;
        this.bottom = this.bottom;
    }

    draw() {
        c.drawImage(
            this.image,
            // cropping
            this.frames.val * this.width,//0, // crop x -->> change to move it 48ps to the side
            0, // crop y
            this.image.width / this.frames.max, // util when crop x
            this.image.height, // until we should crop y
            this.position.x, // location of place in x
            this.position.y, // location of the place in y
            this.image.width / this.frames.max, // actual width of the image
            this.image.height // actual heigth of the image
        )

        // CHANGE ACROSS ALL THE FRAMES
        if (!this.animate) {
            return // if this.moving is flase we return nothing and the code bellow doesnet run
        }

        if (this.frames.max > 1) {
            this.frames.elapsed++
        }

        if (this.frames.elapsed % 10 === 0) {
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

// canvasCenterWidth - (this.image.width / 4) / 2, // location of place in x
// canvasCenterHeight - this.image.height / 2, // location of the place in y
