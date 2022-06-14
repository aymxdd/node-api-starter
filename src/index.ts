import 'dotenv/config'
import express, { Express, RequestHandler } from 'express';
import { userRouter, exampleRouter } from './routes';
import { Auth, getCacheStatus } from './services';
import cors from 'cors';
import requestIp from 'request-ip';

class Main {
    port: string;
    auth: Auth;
    server: Express;

    constructor() {
        this.port = process.env.APP_PORT || '4000';
        this.auth = new Auth();
        this.server = express();

        this.init();
    }

    async init() {
        // You can add aditionnal init cycles (ex: database connection) here
        this.initServer();
    }

    initServer() {
        // Middlewares
        this.server.use(cors());
        this.server.use(requestIp.mw());
        this.server.use(express.json() as RequestHandler);
        this.server.use((req, res, next) => {
            res.locals.auth = this.auth;
            next();
        });

        // Routes
        this.server.use('/users', userRouter);
        this.server.use('/example', exampleRouter);

        // Fallback route
        this.server.use('/', async (req, res) => {
            const url = req.originalUrl || req.url
            if (url !== '/') {
                res.send({ error: `Invalid endpoint: ${url}` })
                return
            }

            res.send({ status: 'ok', cache: getCacheStatus() });
        })

        this.server.listen(this.port, () => {
            console.log(`Server is listening on port ${this.port}`);
        });
    }
}

new Main();