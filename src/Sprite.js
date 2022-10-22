
// 7) So lets create Classes

class Sprite {
    constructor({ position, velocity, image }) { // we can pass to the custrouctur a object this way we dont need to remember the order of the parameter, we have just one object 
        this.position = position
        this.image = image
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y);
    }
}
