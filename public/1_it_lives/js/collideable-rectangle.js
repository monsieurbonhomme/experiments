define(['lib/utils', 'rectangle'], function(utils, Rectangle){
    class CollideableRectangle extends Rectangle {
        constructor(x, y, z, width, height, color, depth) {
            super(x, y, z, width, height, color, depth);
            this.collisionChecks = [];
            this.shape = 'rectangle'
        }

        isCircleColliding(t) {
            // Find the closest point to the circle within the rectangle
            // Assumes axis alignment! ie rect must not be rotated
            let closestX = utils.clamp(t.x, this.x, this.x + this.width);
            let closestY = utils.clamp(t.y, this.y, this.y + this.height);

            // Calculate the distance between the t's center and this closest point
            let distanceX = t.x - closestX;
            let distanceY = t.y - closestY;

            // If the distance is less than the t's radius, an intersection occurs
            let distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);
            return distanceSquared < (t.radius * t.radius);
        }

        isSquareColliding(t) {
            return t.x < this.x + this.width &&
                t.x + t.width > this.x &&
                t.y < this.y + this.height &&
                t.height + t.y > this.y;
        }

        checkCollisions() {
            for(let i = 0; i < this.collisionChecks.length; i++) {
                let t = this.collisionChecks[i].target;
                if(this.collisionChecks[i].check.bind(this)(t)) {
                    this.collisionChecks[i].cb(this);
                }
            }
        }

        canCollidesWith(t, cb) {
            let check;
            switch (t.shape) {
                case 'rectangle':
                case 'square': check = this.isSquareColliding; break;
                case 'circle': check = this.isCircleColliding; break;
            }
            this.collisionChecks.push({target: t, cb: cb, check: check});
        }

        update() {
            this.checkCollisions();
        }
    }
    return CollideableRectangle;
});