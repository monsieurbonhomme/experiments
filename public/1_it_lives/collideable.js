define(['lib/constants', './circle'], function (constants, Circle) {
    class Collideable extends Circle{
        constructor(x, y, size) {
            super(x, y, size);
            this.color = '#85144b';
            this.mass = 1.2;
            this.velocity = {
                x: 0,
                y: 0
            };
            this.collisionChecks = [];
        }

        addCollider(t) {
            this.collisionChecks.push(t);
        }

        isColliding(t) {
            return ((this.x - t.x) * (this.x - t.x) + (this.y - t.y) * (this.y - t.y) < ((this.size + t.size) / 2) * ((this.size + t.size) / 2));
        }
        get radius() {
            return this.size / 2;
        }

        correctPosition(t) {
            let direction = {
                x: this.x < t.x ? -1 : 1,
                y: this.y < t.y ? -1 : 1,
            }
            let hyp = Math.sqrt((t.x - this.x) * (t.x - this.x) + (t.y - this.y) * (t.y - this.y));
            let missingHyp = (t.radius + this.radius) - hyp;
            let xDist = (this.x - t.x);
            let yDist = (this.x - t.x);
            let part = xDist + yDist;
            let xPart = xDist / part;
            let yPart = 1 - xPart;
            let missingTotal = Math.sqrt(missingHyp);
            let missingX = xPart * missingTotal;
            let missingY = yPart * missingTotal;
            this.x += missingX * direction.x;
            this.y += missingY * direction.y;
        }

        slipsWith(t) {
            let direction = {
                x: this.x < t.x ? -1 : 1,
                y: this.y < t.y ? -1 : 1,
            }
            let xDist = (this.x - t.x);
            let yDist = (this.x - t.x);
            let part = xDist + yDist;
            let xPart = xDist / part;
            let yPart = 1 - xPart;

            let velo = Math.abs(t.velocity.x + t.velocity.y) * Math.min((t.strength - this.mass), 0);
            this.velocity.x = xPart * velo * direction.x;
            this.velocity.y = yPart * velo * direction.y;

        }

        checkCollisions() {
            for(let i = 0; i < this.collisionChecks.length; i++) {
                if(this.isColliding(this.collisionChecks[i])) {
                    this.collisionChecks[i].correctPosition(this);
                    if(this.mass >= this.collisionChecks[i].strength) {
                    } else {
                        this.slipsWith(this.collisionChecks[i]);
                    }
                }
            }
        }

        update(c) {
            this.checkCollisions();
            this.move();
            this.draw(c);
        }

        move() {
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.velocity.x = this.velocity.x * 0.9;
            this.velocity.y = this.velocity.y * 0.9;
        }

        draw(c) {
            c.fillStyle = this.color;
            c.beginPath();
            c.arc(this.x, this.y, this.size / 2, 0, constants.completeCircle, false);
            c.fill();
        }
    }
    return Collideable;
});