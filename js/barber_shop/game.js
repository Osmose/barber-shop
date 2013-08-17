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

    dima.component('velocity', function() {
        return function() {
            this.x = 0;
            this.y = 0;
        };
    });

    dima.system('applyVelocity', function() {
        return {
            requires: ['velocity', 'position'],
            process: function(collection) {
                for (var k = 0; k < collection.length; k += 2) {
                    var velocity = collection[k];
                    var pos = collection[k + 1];
                    pos.x += velocity.x;
                    pos.y += velocity.y;
                }
            }
        };
    });

    dima.component('arrowMovement', function() {
        return function() {
            this.speed = 1;
        };
    });

    dima.system('handleArrowMovement', function() {
        return {
            requires: ['arrowMovement', 'velocity'],
            process: function(collection) {
                for (var k = 0; k < collection.length; k += 2) {
                    var movement = collection[k];
                    var velocity = collection[k + 1];
                    velocity.x = 0;
                    velocity.y = 0;

                    if (key.isPressed('up')) {
                        velocity.y -= movement.speed;
                    }
                    if (key.isPressed('down')) {
                        velocity.y += movement.speed;
                    }
                    if (key.isPressed('left')) {
                        velocity.x -= movement.speed;
                    }
                    if (key.isPressed('right')) {
                        velocity.x += movement.speed;
                    }
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
        dima.addSystem('handleArrowMovement');
        dima.addSystem('applyVelocity');
        dima.addSystem('drawBackground');
        dima.addSystem('drawBox');

        var player = dima.createEntity();
        var playerPos = dima.attachComponentTo('position', player);
        playerPos.x = 20;
        playerPos.y = 20;
        var playerBox = dima.attachComponentTo('drawableBox', player);
        playerBox.width = 8;
        playerBox.height = 8;
        dima.attachComponentTo('velocity', player);
        var playerMovement = dima.attachComponentTo('arrowMovement', player);
        playerMovement.speed = 2;

        var background = dima.createEntity();
        dima.attachComponentTo('background', background).color = '#FFFF88';

        function update() {
            dima.update();
            requestFrame(update);
        }
        update();
    });
});
