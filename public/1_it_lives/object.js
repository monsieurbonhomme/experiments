define([], function() {
    class Object {
        constructor(x, y, z, size, color) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.size = size;
            this.color = color;
        }
    }
    return Object;
});