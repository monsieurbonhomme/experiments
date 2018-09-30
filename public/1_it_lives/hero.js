define(['lib/constants'], function(constants) {
    function drawArrowhead(context, from, to, radius) {
        var x_center = to.x;
        var y_center = to.y;

        var angle;
        var x;
        var y;

        context.beginPath();

        angle = Math.atan2(to.y - from.y, to.x - from.x)
        x = radius * Math.cos(angle) + x_center;
        y = radius * Math.sin(angle) + y_center;

        context.moveTo(x, y);

        angle += (1.0/3.0) * (2 * Math.PI)
        x = radius * Math.cos(angle) + x_center;
        y = radius * Math.sin(angle) + y_center;

        context.lineTo(x, y);

        angle += (1.0/3.0) * (2 * Math.PI)
        x = radius *Math.cos(angle) + x_center;
        y = radius *Math.sin(angle) + y_center;

        context.lineTo(x, y);

        context.closePath();

        context.fill();
    }
    class Hero {
        constructor() {
            this.radius = 10;
            this.color = '#0074D9';
            this.x = 100;
            this.y = 100;
            this.speed = 1.1;
            this.velocity = {
                x: 5,
                y: 0
            }
            this.force = {
                x: 0,
                y: 0
            };
            this.last = 0;
        }

        updateVelocity(tax) {
            this.velocity = {
                x: this.velocity.x * this.speed * tax,
                y: this.velocity.y * this.speed * tax
            }
        }

        move(axes) {
            this.updateVelocity(.8);

            this.force = {
                x: axes[0],
                y: axes[1]
            };

            this.velocity.x += axes[0];
            this.velocity.y += axes[1];
            if(this.velocity.x > this.last) {
                this.last = this.velocity.x;
                console.log(this.last)
            }
            //this.velocityX += this.force.x - 0.1;
            //this.velocityY += this.force.y - 0.1;

            this.x += this.velocity.x;
            this.y += this.velocity.y;
        }

        draw(c) {
            c.fillStyle = this.color;
            if(DEBUG) {
                if(this.force.x || this.force.y) {
                    drawArrowhead(c, {x: this.x, y: this.y}, {x: this.x + this.force.x * 20, y: this.y + this.force.y * 20}, 2)
                }
            }
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, constants.completeCircle, false);
            c.fill();
        }
    }
    return Hero;
});