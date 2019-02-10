const StaticServer = require('static-server');

const server = new StaticServer({
    rootPath: '.',
    port: 8899,
    host: '127.0.0.1',
    cors: '*',
    followSymlink: true,
    templates: {
        index: 'index.html',
        notFound: '404.html'
    }
});

server.start(function () {
    console.log('Server listening to', server.port);
});
