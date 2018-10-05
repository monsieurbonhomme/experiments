define(['object', 'lib/constants'], function (Object, constants) {
    class Circle extends Object {
        constructor(x, y, size, color, height) {
            super(x, y, 0, size, color, height);
            this.shape = 'circle';
            this.velocity = {
                x: 0,
                y: 0,
                z: 0
            }
        }

        get radius() {
            return this.size / 2;
        }

        getHypWith(t) {
            return Math.sqrt((t.x - this.x) * (t.x - this.x) + (t.y - this.y) * (t.y - this.y));
        }

        move() {
            super.move();
        }
        draw(c) {
            super.draw(c);
            c.fillStyle = this.color;
            c.beginPath();
            c.arc(this.x, this.y - this.z, this.size / 2, 0, constants.completeCircle, false);
            c.fill();
            c.shadowColor = 'transparent';
            c.shadowBlur = 0;
            c.shadowOffsetX = 0;
            c.shadowOffsetY = 0;
        }
    }

    return Circle;
});