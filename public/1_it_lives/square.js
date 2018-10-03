define(['object'], function(Object) {
    class Square extends Object{
        constructor(x, y, z, size, color) {
            super(x, y, z, size, color);
        }
        draw(c) {
            c.fillStyle = this.color;
            c.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        }
    }
    return Square;
});