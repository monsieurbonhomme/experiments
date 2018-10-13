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
            inspectBorderCollision(game, game.hero, true);
        },
        afterRender: function() {

        }
    },{
        name: 'It collides',
        config:  {
            trapsConfig: [{
                x: 100,
                y: 0,
                moves: {
                    x: 100,
                    y: 100
                },
                height: 500,
                width: 10,
                speed: 1,
                easing: 'ease-in-out'
            },{
                x: 180,
                y: -40,
                moves: {
                    x: 180,
                    y: 0
                },
                height: 400,
                width: 10,
                speed: 2,
                easing: 'ease-in-out'
            },{
                x: 190,
                y: 80,
                moves: {
                    x: 280,
                    y: 130
                },
                height: 20,
                width: 20,
                speed: 2.7,
                easing: 'ease-in-out'
            },{
                x: 280,
                y: 180,
                moves: {
                    x: 190,
                    y: 180
                },
                height: 20,
                width: 20,
                speed: 2.2,
                easing: 'ease-in-out'
            },{
                x: 290,
                y: 230,
                moves: {
                    x: 190,
                    y: 280
                },
                height: 10,
                width: 60,
                speed: 2,
                easing: 'ease-in-out'
            },{
                x: 300,
                y: 0,
                moves: {
                    x: 340,
                    y: 50
                },
                height: 400,
                width: 10,
                speed: 2.4,
                easing: 'ease-in-out'
            },{
                x: 390,
                y: 0,
                moves: {
                    x: 390,
                    y: 0
                },
                height: 350,
                width: 10,
                speed: 2.4,
                easing: 'ease-in-out'
            },{
                x: 500,
                y: -25,
                moves: {
                    x: 500,
                    y: 0
                },
                height: 300,
                width: 80,
                speed: 2.4,
                easing: 'ease-in-out'
            },{
                x: 500,
                y: 325,
                moves: {
                    x: 500,
                    y: 300
                },
                height: 100,
                width: 80,
                speed: 2.4,
                easing: 'ease-in-out'
            }],
            traps: []
        },
        initialize: function(game) {
            game.hero.x = 30;
            game.hero.y = game.canvas.height - 30;
            game.chapterConfig.heroPosition = {
                x: game.hero.x,
                y: game.hero.y
            };
            game.chapterConfig.button = new CCircle(game.canvas.width - 30, 30, 20, '#FFDC00', 0, 0);
            game.chapterConfig.button.canCollidesWith(game.hero, function() {
               game.nextChapter = true;
            });
            for(let i = 0; i < game.chapterConfig.trapsConfig.length; i++) {
                let trapConfig = game.chapterConfig.trapsConfig[i];
                game.chapterConfig.traps.push(new Trap(trapConfig));
                game.chapterConfig.traps[i].canCollidesWith(game.hero, function() {
                    game.hero.x = game.chapterConfig.heroPosition.x;
                    game.hero.y = game.chapterConfig.heroPosition.y;
                    game.chapterConfig.traps[i].color = '#FF4136';
                });
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
    }, {
        name: 'It collects',
        config: {
            trapsConfig: [{
                x: 700,
                y: 340,
                moves: {
                    x: 700,
                    y: 340
                },
                height: 10,
                width: 85
            },{
                x: 700,
                y: 340,
                moves: {
                    x: 700,
                    y: 340
                },
                height: 100,
                width: 10
            }],
            collectiblesConfig: [{
                x: 60,
                y: 120
            },{
                x: 610,
                y: 140
            },{
                x: 300,
                y: 20
            },{
                x: 260,
                y: 310
            },{
                x: 510,
                y: 180
            },],
            traps: [],
            collectibles: []
        },
        initialize: function (game) {
            game.hero.x = game.canvas.width - 30;
            game.hero.y = 30;
            game.chapterConfig.heroPosition = {
                x: game.hero.x,
                y: game.hero.y
            };
            game.chapterConfig.button = new CCircle(game.canvas.width - 70, game.canvas.height - 30, 20, '#FFDC00', 0, 0);
            game.chapterConfig.button.canCollidesWith(game.hero, function() {
                game.nextChapter = true;
            });
            for(let i = 0; i < game.chapterConfig.trapsConfig.length; i++) {
                let trapConfig = game.chapterConfig.trapsConfig[i];
                game.chapterConfig.traps.push(new Trap(trapConfig));
                game.chapterConfig.traps[i].canCollidesWith(game.hero, function() {
                    game.hero.x = game.chapterConfig.heroPosition.x;
                    game.hero.y = game.chapterConfig.heroPosition.y;
                });
            }
            for(let i = 0; i < game.chapterConfig.collectiblesConfig.length; i++) {
                let cConfig = game.chapterConfig.collectiblesConfig[i];
                game.chapterConfig.collectibles.push(new CCircle(cConfig.x, cConfig.y, 6, '#F012BE', 0, 0));
                game.chapterConfig.collectibles[i].canCollidesWith(game.hero, function() {
                    if(!game.chapterConfig.collectibles[i].collected) {
                        game.hero.size -= 1;
                        game.chapterConfig.collectibles[i].collected = true;
                    }


                });
            }
        },
        beforeRender: function (game) {

        },
        render: function (game) {
            game.chapterConfig.button.draw(game.context);
            game.hero.update(game.context);
            game.chapterConfig.button.update(game.context);
            for(let i = 0; i < game.chapterConfig.traps.length; i++) {
                game.chapterConfig.traps[i].draw(game.context);
                game.chapterConfig.traps[i].update(game.context);
            }
            for(let i = 0; i < game.chapterConfig.collectibles.length; i++) {
                if(!game.chapterConfig.collectibles[i].collected) {
                    game.chapterConfig.collectibles[i].draw(game.context);
                    game.chapterConfig.collectibles[i].update(game.context);
                }
            }
        },
        afterRender: function (game) {
            inspectBorderCollision(game, game.hero, true);
        }
    },{
        name: 'It pushes',
        config: {
            slabsConfig: [{
                x: 400,
                y: 170,
                color: '#FFFFFF'
            },{
                x: 470,
                y: 240,
                color: '#999'
            },{
                x: 330,
                y: 170,
                color: '#333'
            }],
            buttonsConfig: [{
                x: 100,
                y: 100,
                color: '#FFFFFF'
            },{
                x: 700,
                y: 300,
                color: '#999'
            },{
                x: 100,
                y: 300,
                color: '#333'
            }],
            slabs: [],
            buttons: []
        },
        initialize: function(game) {
            for(let i = 0; i < game.chapterConfig.slabsConfig.length; i++) {
                let slabConfig = game.chapterConfig.slabsConfig[i];
                let buttonConfig = game.chapterConfig.buttonsConfig[i];
                game.chapterConfig.slabs.push(new CCircle(slabConfig.x, slabConfig.y, 30, slabConfig.color, 0, 0));
                game.chapterConfig.buttons.push(new CCircle(buttonConfig.x, buttonConfig.y, 30, buttonConfig.color, 0, 0));
                game.chapterConfig.slabs[i].opacity = .7;
                game.chapterConfig.slabs[i].canCollidesWith(game.chapterConfig.buttons[i], function() {
                    if(game.chapterConfig.buttons[i].color === game.chapterConfig.slabs[i].color) {
                        game.chapterConfig.slabs[i].color = '#01FF70';
                        var total = 0;
                        for(let j = 0; j < game.chapterConfig.slabs.length; j++) {
                            if(game.chapterConfig.slabs[j].color === '#01FF70') {
                                total += 1
                            }
                        }
                        if(total === 3) {
                            game.nextChapter = true;
                        }
                    }
                });
                game.chapterConfig.buttons[i].canCollidesWith(game.hero, function() {
                    game.hero.correctPosition(game.chapterConfig.buttons[i]);
                    game.chapterConfig.buttons[i].slipsWith(game.hero);
                });
            }
        },
        beforeRender(game) {

        },
        render: function(game) {
            for(let i = 0; i < game.chapterConfig.slabs.length; i++) {
                game.chapterConfig.slabs[i].draw(game.context);
                game.chapterConfig.slabs[i].update(game.context);
                game.chapterConfig.buttons[i].draw(game.context);
                game.chapterConfig.buttons[i].update(game.context);
            }
            game.hero.update(game.context);
        },
        afterRender: function (game) {
            inspectBorderCollision(game, game.hero, true);
            for(let i = 0; i < game.chapterConfig.buttons.length; i++) {
                inspectBorderCollision(game, game.chapterConfig.buttons[i], true);
            }
        }
    }]
});