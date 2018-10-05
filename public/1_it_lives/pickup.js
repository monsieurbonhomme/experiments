define(['square'], function(Square) {
    class Pickup extends Square {
        constructor(x, y, z) {
            super(x, y, z, 6, '#333');
            this.type = 'pickup';
        }

        onCollision(t) {
            this.isDead = true;
            t.justCollidedWith(this);
        }
    }
    return Pickup;
});