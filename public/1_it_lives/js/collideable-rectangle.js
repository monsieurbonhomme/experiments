define(['rectangle'], function(Rectangle){
    class CollideableRectangle extends Rectangle {
        constructor(x, y, z, width, height, color, depth) {
            super(x, y, z, width, height, color, depth);
        }
    }
    return CollideableRectangle;
});