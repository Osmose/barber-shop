define(function(require) {
    var dima = require('dima');

    // Load core systems that this entity relies on.
    require('core/movement');
    require('core/drawing');

    return {
        create: function(x, y) {
            var player = dima.createEntity();

            var position = dima.attachComponentTo('position', player);
            position.x = x || 20;
            position.y = y || 20;

            var drawableBox = dima.attachComponentTo('drawableBox', player);
            drawableBox.width = 8;
            drawableBox.height = 8;

            var velocity = dima.attachComponentTo('velocity', player);

            var arrowMovement = dima.attachComponentTo('arrowMovement', player);
            arrowMovement.speed = 2;

            return player;
        }
    };
});
