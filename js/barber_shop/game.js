define(function(require) {
    var dima = require('dima');

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

    dima.component('position', function() {
        return function() {
            this.x = 0;
            this.y = 0;
        };
    });

    dima.component('drawableBox', function() {
        return function() {
            this.width = 1;
            this.height = 1;
            this.color = '#000000';
        };
    });

    dima.system('drawBox', function() {
        return {
            requires: ['position', 'drawableBox'],
            process: function(collection) {
                var ctx = dima.getContext();
                for (var k = 0; k < collection.length; k += 2) {
                    var pos = collection[k];
                    var box = collection[k + 1];
                    ctx.save();
                    ctx.fillStyle = box.color;
                    ctx.fillRect(pos.x, pos.y, box.width, box.height);
                    ctx.restore();
                }
            }
        };
    });

    dima.component('background', function() {
        return function() {
            this.color = '#FFFFFF';
        };
    });

    dima.system('drawBackground', function() {
        return {
            requires: ['background'],
            process: function(collection) {
                var ctx = dima.getContext();
                for (var k = 0; k < collection.length; k++) {
                    var background = collection[k];
                    ctx.save();
                    ctx.fillStyle = background.color;
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.restore();
                }
            }
        };
    });

    dima.game(canvas, function() {
        dima.addSystem('drawBackground');
        dima.addSystem('drawBox');

        var player = dima.createEntity();
        var playerPos = dima.attachComponentTo('position', player);
        playerPos.x = 20;
        playerPos.y = 20;
        var playerBox = dima.attachComponentTo('drawableBox', player);
        playerBox.width = 8;
        playerBox.height = 8;

        var background = dima.createEntity();
        dima.attachComponentTo('background', background).color = '#FFFF88';

        function update() {
            dima.update();
            requestFrame(update);
        }
        update();
    });
});
