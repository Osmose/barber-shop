require.config({
    baseUrl: 'js',
    paths: {
        dima: 'vendor/dima/src/core',
        keymaster: 'vendor/keymaster/keymaster',
        lodash: 'vendor/lodash/dist/lodash'
    },
    shim: {
        dima: {
            exports: 'dima'
        },
        keymaster: {
            exports: 'key'
        }
    }
});

require(['game'], function(game) {
    game.load();
});
