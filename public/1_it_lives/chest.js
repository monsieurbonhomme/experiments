define(['square'], function(Square) {
    class Chest extends Square {
        constructor(x, y) {
            super(x, y, 0, 20, '#01ff70', 5);
            this.items = [];
            this.opened = false;
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
                this.items = [
                    new Square(this.x, this.y, 0, 6, '#444'),
                    new Square(this.x, this.y, 0, 6, '#333')
                ]
                for(let i = 0; i < this.items.length; i++) {
                    let velocityMax = 8;
                    let veloX =  Math.random() * velocityMax * 2 - velocityMax;
                    let veloY =  Math.random() * velocityMax * 2 - velocityMax;
                    this.items[i].velocity = {
                        x: veloX,
                        y: veloY,
                        z: 5
                    };
                }
                this.bounce()
            }
            if(this.opened) {
                this.color = '#3d9970';
             //   this.bounce();
            }
            for(let i = 0; i < this.items.length; i++) {
                this.items[i].update();
                this.items[i].draw(c);
            }
            super.draw(c);
        }
    }
    return Chest;
});