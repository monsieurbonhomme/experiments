require.config({
    paths: {
        'lib': '/sources/js'
    }
});
require(['lib/constants', 'hero', 'gamepad', 'collideable'], function(constants, Hero, GamepadHandler, CollideAble) {
    const canvas = document.querySelector('canvas');
    const c = canvas.getContext('2d');
    let hero = new Hero();
    let g = new GamepadHandler();
    g.onInput(function(config) {
        hero.move(config.axes.l)
    });
    let collideable = new CollideAble(300, 300, 20);
    collideable.addCollider(hero);
    function gameLoop() {
        requestAnimationFrame(gameLoop);
        c.clearRect(0, 0, canvas.width, canvas.height);
        c.fillStyle = constants.canvas.colors.background;
        c.fillRect(0, 0, canvas.width, canvas.height);
        if(hero.x - hero.radius < 0) {
            hero.velocity.x = 0;
            hero.x = hero.radius;
        } else if(hero.x + hero.radius > canvas.width) {
            hero.velocity.x = 0;
            hero.x = canvas.width - hero.radius;
        }
        if(hero.y - hero.radius < 0) {
            hero.y = hero.radius;
            hero.velocity.y = 0;
        } else if(hero.y + hero.radius > canvas.height) {
            hero.velocity.y = 0;
            hero.y = canvas.height - hero.radius;
        }

        collideable.update(c);
        hero.draw(c);
    }
    gameLoop();
});