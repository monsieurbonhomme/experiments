define([], function () {
    class Circle {
        constructor(x, y, size) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.velocity = {
                x: 0,
                y: 0
            }
        }

        get radius() {
            return this.size / 2;
        }

        getHypWith(t) {
            return Math.sqrt((t.x - this.x) * (t.x - this.x) + (t.y - this.y) * (t.y - this.y))
        }

        correctPosition(t) {
            let direction = {
                x: this.x < t.x ? -1 : 1,
                y: this.y < t.y ? -1 : 1,
            };
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
    }

    return Circle;
})