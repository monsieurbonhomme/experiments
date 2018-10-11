require.config({
    baseUrl: './js',
    paths: {
        'lib': '../../sources/js'
    }
});
require(['chapters', 'lib/constants', 'gamepad'], function(chapters, constants, GamepadHandler) {
    let game = {
        canvas: document.querySelector('canvas'),
        gamepad: {
            handler: new GamepadHandler()
        }
    };

    game.canvas.width = 800;
    game.canvas.height = 400;
    game.context = game.canvas.getContext('2d');

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
    function beginChapter(index) {
        game.currentChapter = index;
        chapters[index].initialize(game);
    }
    function gameLoop() {
        requestAnimationFrame(gameLoop);
        chapters[game.currentChapter].beforeRender(game);
        game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
        game.context.fillStyle = constants.canvas.colors.background;
        game.context.fillRect(0, 0, game.canvas.width, game.canvas.height);
        chapters[game.currentChapter].render(game);
        chapters[game.currentChapter].afterRender(game);
    }
    beginChapter(0);
    gameLoop();
});