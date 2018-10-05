define(['square'], function(Square) {
    class Sparkle extends Square {
        constructor(x, y) {
            super(x, y, 0, 3, 'rgb(0, 116, 217)', 0);
            this.isDead = false;
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
            c.globalAlpha = Math.max(0, this.opacity);
            super.draw(c);
            c.globalAlpha = 1;
        }
    }
    return Sparkle;
});