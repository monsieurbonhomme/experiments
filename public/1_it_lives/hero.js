define(['./collideable-circle', 'sparkle', 'bullet'], function(CollideableCircle, Sparkle, Bullet) {
    class Hero extends CollideableCircle {
        constructor() {
            super(100, 100, 20, '#0074D9', 5);
            this.speed = .4;
            this.strength = 1;
            this.sparkles = [];
            this.timer = 0;
            this.shootDirection = {
                x: 1,
                y: 0
            }
            this.shootTimer = 0;
            this.shootRate = 10;
            this.bullets = [];
        }

        move(axes, triggers, shooting) {
            triggers.r = triggers.r || 0;
            this.isShooting = shooting;
            this.velocity.x += axes.l[0] * this.speed * (1 + triggers.r);
            this.velocity.y += axes.l[1] * this.speed * (1 + triggers.r);
            if(Math.abs(axes.r[0]) + Math.abs(axes.r[1]) > 0.8) {
                this.shootDirection.x = axes.r[0];
                this.shootDirection.y = axes.r[1];
            }
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

        shoot() {
            if(this.shootTimer % this.shootRate === 0) {
                this.bullets.push(new Bullet(this.x, this.y, this.shootDirection, 1));
            }
        }

        update(c) {
            this.shootTimer++;
            if(this.isShooting){
                this.shoot();
            }
            for(let i = this.bullets.length; i--;) {
                let bullet = this.bullets[i];
                if(bullet.isDead) {
                    this.bullets.splice(i, 1)
                } else {
                    bullet.update();
                    bullet.draw(c)
                }
            }
            super.update();
            this.sparkle(c);
            super.draw(c);
        }
    }
    return Hero;
});