module.exports = function(grunt) {
    var connect = require('connect');
    var path = require('path');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        requirejs: {
            compile: {
                options: {
                    appDir: 'src',
                    dir: 'dist',
                    mainConfigFile: 'src/js/bootstrap.js',
                    name: 'bootstrap',
                    include: ['almond'],
                    wrap: true,
                    removeCombined: true,
                    paths: {
                        dima: path.resolve('bower_components/dima/src/core'),
                        keymaster: path.resolve('bower_components/keymaster/keymaster'),
                        lodash: path.resolve('bower_components/lodash/dist/lodash'),
                        almond: path.resolve('bower_components/almond/almond'),
                    }
                }
            }
        },
        preprocess: {
            build: {
                src: './src/index.html',
                dest: './dist/index.html',
                options: {
                    context: {
                        development: false
                    }
                }
            }
        },
        'gh-pages': {
            options: {
                base: 'dist'
            },
            src: ['**']
        }
    });

    grunt.registerTask('runserver', 'Start the development server.', function(port) {
        this.async();
        port = port || 8000;

        connect()
            .use(connect.static('src'))
            .use(connect.directory('src', {icons: true}))
            .use('/js/vendor', connect.static('bower_components'))
            .use('/js/vendor', connect.directory('bower_components', {icons: true}))
            .use(connect.logger())
            .listen(port)
            .on('listening', function() {
                grunt.log.writeln('Starting static web server on port ' + port + '.');
            })
            .on('error', function(err) {
                if (err.code === 'EADDRINUSE') {
                    grunt.fatal('Port ' + port + ' is already in use by another process.');
                } else {
                    grunt.fatal(err);
                }
            });
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-preprocess');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.registerTask('build', ['requirejs', 'preprocess:build']);
    grunt.registerTask('deploy', ['build', 'gh-pages']);
    grunt.registerTask('default', ['runserver']);
};
