import Elysia from 'elysia';
import { cors } from '@elysiajs/cors';
import { handleError } from './handle_error';

const PORT = Bun.env.PORT || 5000;

const app = new Elysia();

const routers = async () => {
    const { routers } = await import('../routers');
    app.use(routers);
};

const middleware = () => {
    app.use(cors());
};

const initHandleError = () => {
    app.onError(handleError);
};

export const server = async () => {
    middleware();
    initHandleError();
    await routers();

    app.listen(PORT, ({ hostname, port }) => {
        console.log(`Server Elysia running in http://${hostname}:${port}`);
    });
};
