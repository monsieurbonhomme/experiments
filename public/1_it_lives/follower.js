define(['./circle', 'lib/constants'], function(Circle, constants) {
    class Follower extends Circle {
        constructor(target, length) {
            super(50, 50, 10);
            this.target = target;
            this.color = 'orange';
            this.minLength = length;
            this.tension = .1;
            this.speed = 1.5;
        }

        update(c) {
            let direction = {
                x: this.x > this.target.x ? -1 : 1,
                y: this.y > this.target.y ? -1 : 1,
            };
            let hyp = Math.max(this.getHypWith(this.target) - this.minLength, 0);
            let difX = Math.abs(this.target.x - this.x);
            let difY = Math.abs(this.target.y - this.y);
            let part = difX + difY;
            let partX = difX / part;
            let partY = difY / part;

             this.velocity.x = hyp * partX * this.tension * direction.x * this.speed;
             this.velocity.y = hyp * partY * this.tension * direction.y * this.speed;

            this.x += this.velocity.x;
            this.y += this.velocity.y;

            this.draw(c);
        }

        draw(c) {
            c.fillStyle = 'rgb(' + (this.minLength + 100) + ',' + (this.minLength + 100) + ',' + (this.minLength + 100) + ')';
            c.beginPath();
            c.arc(this.x, this.y, this.size / 2, 0, constants.completeCircle, false);
            c.fill();
        }
    }
    return Follower;
});