require.config({
    paths: {
        'lib': '/sources/js'
    }
});
require(['lib/constants', 'hero', 'gamepad'], function(constants, Hero, GamepadHandler) {
    const canvas = document.querySelector('canvas');
    const c = canvas.getContext('2d');
    let hero = new Hero();
    let g = new GamepadHandler();
    g.onInput(function(config) {
        hero.move(config.axes.l)
    });
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
        hero.draw(c);
    }
    gameLoop();
});
// import {distance} from '/sources/js/utils';
// console.log(distance);
// const canvas = document.querySelector('canvas');
// const c = canvas.getContext('2d')
//
// canvas.width = innerWidth
// canvas.height = innerHeight
//
// const mouse = {
//     x: innerWidth / 2,
//     y: innerHeight / 2
// };
//
// const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']
//
// // Event Listeners
// addEventListener('mousemove', event => {
//     mouse.x = event.clientX
//     mouse.y = event.clientY
// })
//
// addEventListener('resize', () => {
//     canvas.width = innerWidth
//     canvas.height = innerHeight
//
//     init()
// });
//
// // Objects
// function Object(x, y, radius, color) {
//     this.x = x
//     this.y = y
//     this.radius = radius
//     this.color = color
// }
//
// Object.prototype.draw = function() {
//     c.beginPath()
//     c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
//     c.fillStyle = this.color
//     c.fill()
//     c.closePath()
// }
//
// Object.prototype.update = function() {
//     this.draw()
// }
//
// // Implementation
// let objects
// function init() {
//     objects = []
//
//     for (let i = 0; i < 400; i++) {
//         // objects.push();
//     }
// }
//
// // Animation Loop
// function animate() {
//     requestAnimationFrame(animate)
//     c.clearRect(0, 0, canvas.width, canvas.height);
//     c.fillStyle =
// }
//
// init()
// animate()