define(['lib/constants', './circle'], function (constants, Circle) {
    class CollideableCircle extends Circle{
        constructor(x, y, size, color, height, mass) {
            super(x, y, size, color, height);
            this.mass = mass || .1;
            this.collisionChecks = [];
        }

        addCollider(t) {
            this.collisionChecks.push(t);
        }

        isColliding(t) {
            return ((this.x - t.x) * (this.x - t.x) + (this.y - t.y) * (this.y - t.y) < ((this.size + t.size) / 2) * ((this.size + t.size) / 2)) && (this.z < t.z + t.height && this.z + this.height > t.z) ;
        }

        correctPosition(t) {
            let direction = {
                x: this.x < t.x ? -1 : 1,
                y: this.y < t.y ? -1 : 1,
            };
            let missingHyp = (t.radius + this.radius) - this.getHypWith(t);
            let xDist = (this.x - t.x);
            let yDist = (this.x - t.x);
            let part = xDist + yDist;
            let xPart = xDist / part;
            let yPart = yDist / part;
            let missingTotal = missingHyp;
            let missingX = xPart * missingTotal;
            let missingY = yPart * missingTotal;
            this.x += missingX * direction.x;
            this.y += missingY * direction.y;
        }

        slipsWith(t) {
            let direction = {
                x: this.x < t.x ? -1 : 1,
                y: this.y < t.y ? -1 : 1,
            };
            let xDist = (this.x - t.x);
            let yDist = (this.x  - t.x);
            let velo = Math.abs(t.velocity.x + t.velocity.y);
            let strengthDif = Math.max((t.strength - this.mass), 0);
            this.velocity.x = xDist / yDist * velo * direction.x * strengthDif;
            this.velocity.y = yDist / xDist * velo * direction.y * strengthDif;

        }

        checkCollisions() {
            for(let i = 0; i < this.collisionChecks.length; i++) {
                if(this.isColliding(this.collisionChecks[i])) {
                    this.collisionChecks[i].correctPosition(this);
                    if(this.mass < this.collisionChecks[i].strength) {
                        this.slipsWith(this.collisionChecks[i]);
                    }
                }
            }
        }

        update(c) {
            this.checkCollisions();
            super.move();
        }
        draw(c) {
            super.draw(c)
        }
    }
    return CollideableCircle;
});