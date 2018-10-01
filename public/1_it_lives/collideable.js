define(['lib/constants'], function (constants) {
    class Collideable {
        constructor(x, y, size) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.color = '#85144b';
            this.collideColor = '#F012BE';
            this.notCollideColor = '#85144b';
            this.velocity = {
                x: 0,
                y: 0
            };
            this.collisionChecks = [];
        }

        collidesWith(t) {
            this.collisionChecks.push(t);
        }

        isColliding(t) {
            if ((this.x - t.x) * (this.x - t.x) + (this.y - t.y) * (this.y - t.y) < ((this.size + t.size) / 2) * ((this.size + t.size) / 2)) {
                this.velocity = t.velocity;
                this.color = this.collideColor;
            } else {
                this.color = this.notCollideColor;
            }
        }

        checkCollisions() {
            for(let i = 0; i < this.collisionChecks.length; i++) {
                if(this.isColliding(this.collisionChecks[i])) {
                    this.velocity.x = this.collisionChecks[i].velocity.y;
                    this.velocity.y = this.collisionChecks[i].velocity.x;
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