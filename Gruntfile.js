module.exports = function(grunt) {
    var connect = require('connect');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    keepalive: true,
                    port: 8000,
                    base: '.'
                }
            }
        }
    });

    grunt.registerTask('runserver', 'Start the development server.', function(port) {
        this.async();
        port = port || 8000;

        connect()
            .use(connect.static('src'))
            .use(connect.directory('src', {icons: true}))
            .use('/js/lib', connect.static('bower_components'))
            .use('/js/lib', connect.directory('bower_components', {icons: true}))
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

    grunt.registerTask('default', ['runserver']);
};
