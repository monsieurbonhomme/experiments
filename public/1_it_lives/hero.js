define(['./circle', 'sparkle'], function(Circle, Sparkle) {
    class Hero extends Circle{
        constructor() {
            super(100, 100, 20, '#0074D9');
            this.speed = .9;
            this.strength = 1;
            this.velocity = {
                x: 5,
                y: 0
            };
            this.force = {
                x: 0,
                y: 0
            };
            this.last = 0;
            this.sparkles = [];
            this.timer = 0;
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

            this.x += this.velocity.x;
            this.y += this.velocity.y;
        }

        sparkle(c) {
            if(this.timer % 1 === 0) {
                this.sparkles.push(new Sparkle(this.x + Math.random() * this.radius - this.radius/2, this.y + Math.random() * this.radius - this.radius/2));
            }
            for(let i = this.sparkles.length - 1; i >= 0; i--) {
                let s = this.sparkles[i];
                s.update(c);
                if(s.isDead) {
                    this.sparkles.splice(i, 1);
                }
            }
        }

        update(c) {
            this.timer++;
            this.sparkle(c);
            this.draw(c);
        }
    }
    return Hero;
});