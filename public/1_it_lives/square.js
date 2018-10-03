define(['object'], function(Object) {
    class Square extends Object{
        constructor(x, y, z, size, color) {
            super(x, y, z, size, color);
            this.shape = 'square';
            this.collisions = [];
            this.velocity = {
                x: 0,
                y: 0
            }
        }

        checkCollisionWithSquare(t) {
            return (this.x < t.x + t.size && this.x + this.size > t.x) || (this.y < t.y + t.size && this.y + this.size > t.y)
        }

        checkCollisionWithCircle(t) {
            let deltaX = t.x - Math.max(this.x - this.size / 2, Math.min(t.x, this.x + this.size / 2));
            let deltaY = t.y - Math.max(this.y - this.size / 2, Math.min(t.y, this.y + this.size / 2));
            return (deltaX * deltaX + deltaY * deltaY) < (t.radius * t.radius);
        }

        canCollidesWith(t) {
            let collisioner = {target: t};
            console.log(t.shape);
            switch (t.shape) {
                case 'square': collisioner.check = this.checkCollisionWithSquare; break;
                case 'circle': collisioner.check = this.checkCollisionWithCircle; break;
            }
            this.collisions.push(collisioner)
        }

        update(c) {
            this.draw(c);
            for(let i = 0 ; i < this.collisions.length; i++) {
                if(this.isColliding = this.collisions[i].check.bind(this)(this.collisions[i].target)) {
                    this.velocity = this.collisions[i].target.velocity;
                }

            }
            this.x += this.velocity.x;
            this.y += this.velocity.y;

            this.velocity.x = this.velocity.x * .9;
            this.velocity.y = this.velocity.y * .9;
        }

        draw(c) {
            c.fillStyle = this.color;
            c.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        }
    }
    return Square;
});