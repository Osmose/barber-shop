define(function(require) {
    var dima = require('dima');

    // Load core systems that this entity relies on.
    require('core/drawing');

    return {
        create: function(color) {
            var background = dima.createEntity();
            dima.attachComponentTo('background', background).color = color;

            return background;
        }
    };
});
