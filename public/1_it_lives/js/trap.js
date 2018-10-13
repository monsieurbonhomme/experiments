define(['collideable-rectangle'], function(CRectangle) {
    class Trap extends CRectangle {
        constructor(config) {
            super(config.x, config.y, 0, config.width, config.height, '#85144b');
            this.timer = config.timer || 0;
            this.easing = config.easing || 'linear';
            this.moves = {
                from: [config.x, config.y],
                to: [config.moves.x, config.moves.y]
            };
            switch (this.easing) {
                case 'ease-in-out': this.move = this.moveEaseInOut.bind(this); break;
                case 'linear':
                default: this.move = this.linearMove.bind(this); break
            }
            this.iteration = config.time || 60;
            this.loop = true;
            this.speed = config.speed || 1;
        }

        onEndLoop() {
            if(this.loop) {
                this.speed = -this.speed;
            } else {
                this.timer = 0;
            }
        }

        moveEaseInOut() {
            this.x = this.moves.from[0] + (Math.cos(this.timer / (60 - this.speed)) + 1) * (this.moves.to[0] - this.moves.from[0]) / 2;
            this.y = this.moves.from[1] + (Math.sin(this.timer / (60 - this.speed)) + 1) * (this.moves.to[1] - this.moves.from[1]) / 2;
        }

        linearMove() {
            if(this.timer >= this.iteration || this.timer < 0) {
                this.onEndLoop();
            }
            this.x = this.moves.from[0] + (this.moves.to[0] - this.moves.from[0]) * (this.timer / this.iteration);
            this.y = this.moves.from[1] + (this.moves.to[1] - this.moves.from[1]) * (this.timer / this.iteration);
        }

        update() {
            super.update();
            this.timer += this.speed;
            this.move();

        }
    }
    return Trap;
});