require.config({
    paths: {
        'lib': '../sources/js'
    }
});
require(['lib/constants', 'hero', 'gamepad', 'collideable', 'follower', 'chest'], function(constants, Hero, GamepadHandler, CollideAble, Follower, Chest) {
    const canvas = document.querySelector('canvas');
    const c = canvas.getContext('2d');
    let hero = new Hero();
    let g = new GamepadHandler();
    g.onInput(function(config) {
        hero.move(config.axes.l);
    });
    /*let collideable = new CollideAble(300, 300, 20);
    let collideable2 = new CollideAble(200, 300, 20);
    let collideable3 = new CollideAble(100, 300, 20);
    collideable.addCollider(hero);
    collideable2.addCollider(hero);
    collideable3.addCollider(hero);*/
    let followers = [];
    let chests = [];
    canvas.width = 800;
    canvas.height = 400;
    for (let i = 0; i < 12; i++) {
        chests.push(new Chest(Math.random() * canvas.width, Math.random() * (canvas.height - 68) + 68));
        chests[i].canCollidesWith(hero)
//followers.push(new Follower(hero, (i+1) * 20))
    }
    function checkGameScreenCollision(t, bounce) {
        if(t.x - t.radius < 0) {
            t.velocity.x = bounce ? -t.velocity.x : 0;
            t.x = t.radius;
        } else if(t.x + t.radius > canvas.width) {
            t.velocity.x = bounce ? -t.velocity.x : 0;
            t.x = canvas.width - t.radius;
        }
        if(t.y - t.radius < 68) {
            t.y = t.radius + 68;
            t.velocity.y = bounce ? -t.velocity.y : 0;
        } else if(t.y + t.radius > canvas.height) {
            t.velocity.y = bounce ? -t.velocity.y : 0;
            t.y = canvas.height - t.radius;
        }
    }
    function gameLoop() {
        requestAnimationFrame(gameLoop);
        c.clearRect(0, 0, canvas.width, canvas.height);
        c.shadowBlur = 0;
        c.shadowOffsetX = 0;
        c.shadowOffsetY = 0;
        c.fillStyle = constants.canvas.colors.background;
        c.fillRect(0, 0, canvas.width, canvas.height);
        c.fillStyle = 'rgba(255, 255, 255, 0.4)';
        c.fillRect(0, 0, canvas.width, 68);

        checkGameScreenCollision(hero);
        /*checkGameScreenCollision(collideable, true);
        checkGameScreenCollision(collideable2, true);
        checkGameScreenCollision(collideable3, true);

        collideable.update(c);
        collideable2.update(c);
        collideable3.update(c);*/
        for (let i = 0; i < followers.length; i++) {
            followers[i].update(c)
        }
        for (let i = 0; i < chests.length; i++) {
            chests[i].update(c);
            checkGameScreenCollision(chests[i], true)
            for(var j = 0; j < chests[i].items.length; j++) {
                checkGameScreenCollision(chests[i].items[j], true);
            }
        }
        hero.update(c);
    }
    gameLoop();
});