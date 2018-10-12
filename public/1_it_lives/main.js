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
        },
        foreground: {
            color: "#ffffff",
            opacity: 1
        }
    };

    game.canvas.width = 800;
    game.canvas.height = 400;
    game.context = game.canvas.getContext('2d');

    function beginChapter(index) {
        game.currentChapter = index;
        game.foreground.opacity = 1;
        game.chapterConfig = chapters[index].config || {};
        chapters[index].initialize(game);
    }
    function gameLoop() {
        requestAnimationFrame(gameLoop);
        if(game.nextChapter) {
            game.nextChapter = false;
            console.log(game.currentChapter + 1);
            beginChapter(game.currentChapter + 1);
        }
        chapters[game.currentChapter].beforeRender(game);
        game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
        game.context.fillStyle = constants.canvas.colors.background;
        game.context.fillRect(0, 0, game.canvas.width, game.canvas.height);
        game.context.font = "30px 'Abril Fatface'";
        game.context.fillStyle = "#999";
        game.context.textAlign = "center";
        game.context.fillText(game.currentChapter + 1 + '. ' + chapters[game.currentChapter].name, game.canvas.width/2, game.canvas.height - 30);
        chapters[game.currentChapter].render(game);
        chapters[game.currentChapter].afterRender(game);
        game.context.globalAlpha = game.foreground.opacity;
        game.context.fillStyle = game.foreground.color;
        game.context.fillRect(0, 0, game.canvas.width, game.canvas.height);
        game.foreground.opacity = Math.max(0, game.foreground.opacity - 0.02);
        game.context.globalAlpha = 1;
    }
    beginChapter(0);
    beginChapter(1);
    beginChapter(2);
    // beginChapter(3);
    gameLoop();
});