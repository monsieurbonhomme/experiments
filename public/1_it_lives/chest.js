define(['square'], function(Square) {
    class Chest extends Square {
        constructor(x, y) {
            super(x, y, 0, 20, '#01ff70', true);
            this.items = [
                new Square(x, y, 0, 6, '#444'),
                new Square(x, y, 0, 6, '#333'),
                new Square(x, y, 0, 6, '#222'),
                new Square(x, y, 0, 6, '#555'),
                new Square(x, y, 0, 6, '#666'),
                new Square(x, y, 0, 6, '#444'),
                new Square(x, y, 0, 6, '#445555')
            ];
            this.opened = false;
        }

        bounce() {
            if(this.z === 0) {
                if(this.velocity.z === 0) {
                    this.velocity.z = 5;
                } else {
                    this.velocity.z = -this.velocity.z * .5;
                }
            }
        }

        update(c) {
            super.update(c);
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
                }
            }
            if(this.opened) {
                this.color = '#3d9970';
                this.bounce();
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