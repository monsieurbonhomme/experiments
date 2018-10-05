define(['./collideable-circle', 'sparkle'], function(CollideableCircle, Sparkle) {
    class Hero extends CollideableCircle {
        constructor() {
            super(100, 100, 20, '#0074D9', 5);
            this.speed = .4;
            this.strength = 1;
            this.sparkles = [];
            this.timer = 0;
        }

        move(axes, trigger) {
            trigger = trigger || 0;
            this.velocity.x += axes[0] * this.speed * (1 + trigger);
            this.velocity.y += axes[1] * this.speed * (1 + trigger);
        }

        justCollidedWith(t) {
            switch (t.type) {
                case 'pickup': this.size += 1; break;
                default: break;
            }
        }

        sparkle(c) {
            this.timer++;
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
            super.update();
            this.sparkle(c);
            super.draw(c);
        }
    }
    return Hero;
});