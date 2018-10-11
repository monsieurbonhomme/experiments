define([], function() {
    class Object {
        constructor(x, y, z, size, color, height) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.size = size;
            this.opacity = 1;
            this.height = height || this.size;
            this.color = color;
        }

        isOutOfScreen() {
            return this.x < 0 || this.x > 2000 || this.y < 0 || this.y > 2000;
        }

        move() {
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            if(!this.fly) {
                this.z = Math.max(0, this.z + this.velocity.z);
            }

            this.velocity.x = this.velocity.x * .9;
            this.velocity.y = this.velocity.y * .9;
            if(this.z > 0) {
                this.velocity.z -= .5;
            }
        }
        draw(c) {
            c.shadowColor = 'rgba(100, 100, 100, ' + Math.max(0, (50 - this.z) / 50) + ')';
            c.shadowBlur = this.z + 2;
            c.shadowOffsetX = 0;
            c.shadowOffsetY = this.z + 2;
        }
    }
    return Object;
});