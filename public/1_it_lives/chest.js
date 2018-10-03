define(['square'], function(Square) {
    class Chest extends Square {
        constructor(x, y) {
            super(x, y, 0, 20, '#01ff70', true);
            this.items = [
                new Square(x, y, 0, 6, '#444'),
                new Square(x, y, 0, 6, '#444')
            ]
            this.opened = false;
        }

        update(c) {
            super.update(c);
            for(let i = 0; i < this.items.length; i++) {
                this.items[i].update(c);
            }
            if(this.isColliding && !this.opened) {
                this.opened = true;
                for(let i = 0; i < this.items.length; i++) {
                    let velocityMax = 5;
                    let rand = Math.random() ;
                    let veloX = rand * velocityMax * 2 - velocityMax;
                    let veloY = (1 - rand) * velocityMax * 2 - velocityMax;
                    this.items[i].velocity = {
                        x: veloX,
                        y: veloY
                    };
                }
            }
        }
    }
    return Chest;
});