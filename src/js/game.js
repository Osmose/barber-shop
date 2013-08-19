define(function(require) {
    var dima = require('dima');
    var key = require('keymaster');

    var requestFrame = (function() {
        return window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function(callback) {
                setTimeout(callback, 30);
            };
    })();

    var canvas = document.getElementById('game');
    var ctx = canvas.getContext('2d');
    canvas.width = 160 * 3;
    canvas.height = 144 * 3;
    ctx.scale(3, 3);
    ctx.mozImageSmoothingEnabled = false;

    // Load entites we'll be needing.
    var background = require('entities/background');
    var player = require('entities/player');

    dima.game(canvas, function() {
        dima.addSystem('handleArrowMovement');
        dima.addSystem('applyVelocity');
        dima.addSystem('drawBackground');
        dima.addSystem('drawBox');
        dima.addSystem('debugDrawCollisionMap');

        player.create(20, 20);
        background.create('#FFFF88');

        var map = dima.createEntity();
        dima.attachComponentTo('collisionMap', map).initialize([
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 1, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]);

        function update() {
            dima.update();
            requestFrame(update);
        }
        update();
    });
});
