define(function(require) {
    var dima = require('dima');
    var key = require('keymaster');

    dima.component('position', function() {
        return function() {
            this.x = 0;
            this.y = 0;
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
});
