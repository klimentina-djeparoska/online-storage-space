const express = require('express');
const compression = require('compression');
const next = require('next');
const { join } = require('path');
const { parse } = require('url');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const createServer = () => {
    const server = express();

    server.use(compression());
    server.use('/_next', express.static(join(__dirname, '.next')));
    server.use((req, res, next) => {
        if (req.headers.host.match(/^www/) !== null) {
            res.redirect('https://' + req.headers.host.replace(/^www\./, '') + req.url);
        } else {
            next();
        }
    });


    server.get('*', (req, res) => {
        return handle(req, res);
    });

    return server
};

const server = createServer();

if (!process.env.LAMBDA) {
    app.prepare()
        .then(() => {
            server.listen(port, (err) => {
                if (err) throw err;
                // eslint-disable-next-line
                console.log(`> Ready on http://localhost:${port}`)
            })
        });
}

module.exports = server;
