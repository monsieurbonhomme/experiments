define(['object'], function (Object) {
    class Rectangle extends Object {
        constructor(x, y, z, width, height, color, depth) {
            super(x, y, z, width, height, color, depth);
        }

        draw(c) {
            super.draw(c);
            c.fillStyle = this.color;
            c.fillRect(this.x, this.y, this.width, this.height);
            c.shadowColor = 'transparent';
            c.shadowBlur = 0;
            c.shadowOffsetX = 0;
            c.shadowOffsetY = 0;
            c.globalAlpha = 1;
        }
    }
    return Rectangle;
});