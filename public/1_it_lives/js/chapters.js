define(['hero'], function (Hero) {
    return [{
        name: 'It lives',
        initialize: function (game) {
            game.hero = new Hero();
        },
        beforeRender: function() {

        },
        render: function(game) {
            game.hero.update(game.context)
        },
        afterRender: function() {

        }
    }]
});