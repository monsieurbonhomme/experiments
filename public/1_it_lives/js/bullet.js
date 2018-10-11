define(['collideable-circle'], function(CollideableCircle) {
    class Bullet extends CollideableCircle {
        constructor(x, y, direction, lifetime) {
            super(x, y, 3, '#FF4136', 5);
            this.direction = Object.assign({}, direction);
            this.speed = 3;
            this.timer = 0;
            this.z = 10;
            this.fly = true;
            this.lifetime = lifetime;
        }

        update() {
            this.timer++;
            super.checkCollisions();
            this.velocity.x = this.direction.x * this.speed;
            this.velocity.y = this.direction.y * this.speed;
            super.move();
            if(this.timer >= this.lifetime * 60) {
                let difZ = this.z;
                this.z -= 6/this.z;
                if(difZ <= .01) {
                    this.isDead = true;
                }
            }
            if(this.isOutOfScreen()) {
                this.isDead = true;
            }
        }
    }
    return Bullet;
});