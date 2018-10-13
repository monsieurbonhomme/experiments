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

    function _drawBackground(c) {
        c.clearRect(0, 0, game.canvas.width, game.canvas.height);
        c.fillStyle = constants.canvas.colors.background;
        c.fillRect(0, 0, game.canvas.width, game.canvas.height);
    }

    function _drawTitle(c) {
        c.font = "30px 'Abril Fatface'";
        c.fillStyle = "#999";
        c.textAlign = "center";
        c.fillText(game.currentChapter + 1 + '. ' + chapters[game.currentChapter].name, game.canvas.width/2, game.canvas.height - 30);
    }

    function _drawForeground(c) {
        c.globalAlpha = game.foreground.opacity;
        c.fillStyle = game.foreground.color;
        c.fillRect(0, 0, game.canvas.width, game.canvas.height);
        game.foreground.opacity = Math.max(0, game.foreground.opacity - 0.02);
        c.globalAlpha = 1;
    }

    function _drawForegroundText(c) {
            c.font = Math.floor(30 + 30 * game.foreground.opacity) + "px 'Abril Fatface'";
            c.fillStyle = "#999";
            c.textAlign = "center";
            c.fillText(game.currentChapter + 1 + '. ' + chapters[game.currentChapter].name, game.canvas.width / 2, game.canvas.height / 2 + 170 * (1 - game.foreground.opacity));
    }

    function gameLoop() {
        requestAnimationFrame(gameLoop);
        if(game.nextChapter) {
            game.nextChapter = false;
            beginChapter(game.currentChapter + 1);
        }

        chapters[game.currentChapter].beforeRender(game);

        _drawBackground(game.context);
        if(game.foreground.opacity === 1) {
            _drawTitle(game.context);
        }

        chapters[game.currentChapter].render(game);

        _drawForeground(game.context);
        if(game.foreground.opacity < 1) {
            _drawForegroundText(game.context);
        }
        chapters[game.currentChapter].afterRender(game);
    }
    beginChapter(0);
/*    beginChapter(1);
    beginChapter(2);
    beginChapter(3);
    beginChapter(4);
    beginChapter(5);*/
    gameLoop();
});