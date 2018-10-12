define(['hero', 'collideable-circle', 'trap'], function (Hero, CCircle, Trap) {
    function inspectBorderCollision(game, t, bounce) {
        if(t.x - t.radius < 0) {
            t.velocity.x = bounce ? -t.velocity.x : 0;
            t.x = t.radius;
        } else if(t.x + t.radius > game.canvas.width) {
            t.velocity.x = bounce ? -t.velocity.x : 0;
            t.x = game.canvas.width - t.radius;
        }
        if(t.y - t.radius < 0) {
            t.y = t.radius + 0;
            t.velocity.y = bounce ? -t.velocity.y : 0;
        } else if(t.y + t.radius > game.canvas.height) {
            t.velocity.y = bounce ? -t.velocity.y : 0;
            t.y = game.canvas.height - t.radius;
        }
    }
    return [{
        name: 'It moves',
        initialize: function (game) {
            game.hero = new Hero();
            game.hero.size = 50;
            game.hero.x = game.canvas.width / 2;
            game.hero.y = game.canvas.height / 2;
            game.hero.opacity = 0;
            game.gamepad.handler.onInput(function(config) {
                if(config.axes.l) {
                    if(Math.abs(config.axes.l[0]) || Math.abs(config.axes.l[1])) {
                        game.hero.opacity = Math.min(game.hero.opacity + 0.005, 1);
                    } else {
                        game.hero.opacity = Math.max(game.hero.opacity - 0.02, 0);
                    }
                }
            })
        },
        beforeRender: function(game) {
            if(game.hero.opacity === 1) {
                game.nextChapter = true;
            }
        },
        render: function(game) {
            game.hero.x = game.canvas.width / 2 + Math.random() * 6 * game.hero.opacity;
            game.hero.y = game.canvas.height / 2 + Math.random() * 6 * game.hero.opacity;
            game.hero.draw(game.context)
        },
        afterRender: function() {

        }
    },{
        name: 'It is blocked',
        initialize: function(game) {
            game.hero.size = 20;
            game.hero.opacity = 1;
            game.hero.move = game.hero.staticMove;
            game.gamepad.handler.onInput(function(config) {
                if(config.axes.l) {
                    game.hero.move(config.axes.l);
                }
            });
        },
        beforeRender: function(game) {
            if(game.hero.x > game.canvas.width || game.hero.y > game.canvas.height || game.hero.x < 0 || game.hero.y < 0) {
                game.nextChapter = true;
            }

        }, afterRender: function () {

        }, render: function (game) {
            game.hero.update(game.context)

        }
    },{
        name: 'It is smooth',
        initialize: function(game) {
            game.hero.x = game.canvas.width / 2;
            game.hero.y = game.canvas.height / 2;
            game.hero.move = game.hero.velocityMove;

            game.chapterConfig = {
                button: new CCircle(30, game.canvas.height - 30, 20, '#FFDC00', 0, 0)
            };
            game.chapterConfig.button.canCollidesWith(game.hero, function() {
                game.nextChapter = true;
            });
        },
        beforeRender: function() {

        },
        render: function(game) {
            game.chapterConfig.button.draw(game.context);
            game.hero.update(game.context);
            game.chapterConfig.button.update(game.context);
            game.chapterConfig.button.draw(game.context);
            inspectBorderCollision(game, game.hero, true);
        },
        afterRender: function() {

        }
    },{
        name: 'It collides',
        config:  {
            trapsConfig: [{
                x: 0,
                y: 0,
                moves: {
                    x: 200,
                    y: 390
                },
                height: 10,
                width: 20,
                speed: 1,
                easing: 'ease-in-out'
            }],
            traps: []
        },
        initialize: function(game) {
            game.chapterConfig.button = new CCircle(game.canvas.width - 30, 30, 20, '#FFDC00', 0, 0);
            game.chapterConfig.button.canCollidesWith(game.hero, function() {
                game.hero.color = 'red';
//                game.nextChapter = true;
            });
            for(let i = 0; i < game.chapterConfig.trapsConfig.length; i++) {
                let trapConfig = game.chapterConfig.trapsConfig[i];
                game.chapterConfig.traps.push(new Trap(trapConfig));
                console.log(game.chapterConfig.trapsConfig.length)
            }
        },
        beforeRender: function () {

        },
        render: function (game) {
            game.chapterConfig.button.draw(game.context);
            game.hero.update(game.context);
            game.chapterConfig.button.update(game.context);
            for(let i = 0; i < game.chapterConfig.traps.length; i++) {
                game.chapterConfig.traps[i].draw(game.context);
                game.chapterConfig.traps[i].update(game.context);
            }
            inspectBorderCollision(game, game.hero, true);
        },
        afterRender: function () {

        }
    }]
});