define(['square', 'pickup'], function(Square, Pickup) {
    class Chest extends Square {
        constructor(x, y) {
            super(x, y, 0, 20, '#01ff70', 5);
            this.items = [];
            this.opened = false;
            this.items = [
                new Pickup(this.x, this.y, 0, 6, '#444'),
                new Pickup(this.x, this.y, 0, 6, '#333')
            ]
        }

        bounce() {
            if(this.z === 0) {
                this.velocity.z = 5;
            }
        }

        update(c) {
            super.update();
            if(this.isColliding && !this.opened) {
                this.opened = true;
                for(let i = 0; i < this.items.length; i++) {
                    let velocityMax = 8;
                    let veloX =  Math.random() * velocityMax * 2 - velocityMax;
                    let veloY =  Math.random() * velocityMax * 2 - velocityMax;
                    this.items[i].velocity = {
                        x: veloX,
                        y: veloY,
                        z: 5
                    };
                    this.items[i].collisions = this.collisions;
                }
                this.bounce()
            }
            if(this.opened) {
                this.color = '#3d9970';
                for(let i = this.items.length - 1; i >= 0; i--) {
                    if(this.items[i].isDead) {
                        this.items.splice(i, 1);
                    } else {
                        this.items[i].update();
                        this.items[i].draw(c);
                    }
                }
             //   this.bounce();
            }

            super.draw(c);
        }
    }
    return Chest;
});