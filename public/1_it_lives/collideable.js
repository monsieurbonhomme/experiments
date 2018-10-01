define(['lib/constants'], function (constants) {
    class Collideable {
        constructor(x, y, size) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.color = '#85144b';
            this.collideColor = '#F012BE';
            this.notCollideColor = '#85144b';
            this.c = 0;
        }

        isColliding(t) {
            if((this.x - t.x) * (this.x - t.x) + (this.y - t.y) * (this.y - t.y) < ((this.size + t.size) / 2) * ((this.size + t.size) / 2)) {
                this.color = this.collideColor;
            } else {
                this.color = this.notCollideColor;
            }
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