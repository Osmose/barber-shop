define(function(require) {
    var dima = require('dima');

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
                var canvas = ctx.canvas;
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
});
