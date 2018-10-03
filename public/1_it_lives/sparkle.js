define([], function() {
    class Sparkle {
        constructor(x, y) {
            this.isDead = false;
            this.size = 3;
            this.x = x;
            this.y = y;
            this.opacity = 1;
            this.fadeSpeed = 1;
        }
        update(c) {
            this.opacity -= this.fadeSpeed / 60;
            this.draw(c);
            if(this.opacity <= 0) {
                this.isDead = true;
            }
        }
        draw(c) {
            c.fillStyle = 'rgba(0, 116, 217, ' + this.opacity + ')';
            c.fillRect(this.x, this.y, this.size, this.size);
        }
    }
    return Sparkle;
});