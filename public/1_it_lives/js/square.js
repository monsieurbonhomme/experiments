define(['object'], function(Object) {
    class Square extends Object{
        constructor(x, y, z, size, color, height) {
            super(x, y, z, size, color, height);
            this.shape = 'square';
            this.collisions = [];
            this.radius = this.size / 2;
            this.velocity = {
                x: 0,
                y: 0,
                z: 0
            }
        }

        checkCollisionWithSquare(t) {
            return (this.x < t.x + t.size && this.x + this.size > t.x) || (this.y < t.y + t.size && this.y + this.size > t.y)
        }

        checkCollisionWithCircle(t) {
            let deltaX = t.x - Math.max(this.x - this.size / 2, Math.min(t.x, this.x + this.size / 2));
            let deltaY = t.y - Math.max(this.y - this.size / 2, Math.min(t.y, this.y + this.size / 2));
            return (deltaX * deltaX + deltaY * deltaY) < (t.radius * t.radius) && Math.abs(this.z - t.z) < 2;
        }

        canCollidesWith(t) {
            let collisioner = {target: t};
            switch (t.shape) {
                case 'square': collisioner.check = this.checkCollisionWithSquare; break;
                case 'circle': collisioner.check = this.checkCollisionWithCircle; break;
            }
            this.collisions.push(collisioner)
        }

        update() {
            for(let i = 0 ; i < this.collisions.length; i++) {
                let t = this.collisions[i].target;
                if(this.isColliding = this.collisions[i].check.bind(this)(t)) {
                    this.onCollision(t);
                }
            }
            super.move();
        }

        onCollision(t) {
            this.velocity.x = t.velocity.x * 2;
            this.velocity.y = t.velocity.y * 2;
        }

        draw(c) {
            super.draw(c)
            c.fillStyle = this.color;
            c.fillRect(this.x - this.size / 2, this.y - this.size / 2 - this.z, this.size, this.size);
            c.shadowColor = 'transparent';
            c.shadowBlur = 0;
            c.shadowOffsetX = 0;
            c.shadowOffsetY = 0;
        }
    }
    return Square;
});