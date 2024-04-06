import Elysia from 'elysia';
import { UsersControllers } from '../controllers';
import { UsersServices } from '@users/app/services';
import { UsersPrismaRepository } from '../storages/prisma/implementations';
import {
    createId,
    singToken,
    getDateFormat,
    encryptPassword,
    verifyPassword,
} from '../tools';

const repository = new UsersPrismaRepository();

const controllers = new UsersControllers(
    new UsersServices({
        repository,
        createId,
        getDateFormat,
        singToken,
        encryptPassword: {
            encrypt: encryptPassword,
            verify: verifyPassword,
        },
    }),
);

export const usersRouter = new Elysia();

usersRouter.group('users', (app) => {
    app.get('get-all', controllers.findAll);
    app.get('get-one/:id', controllers.findOne);
    app.post('create-one', controllers.createOne);
    app.post('login', controllers.login);
    app.post('create-many', controllers.createMany);
    app.put('update-one/:id', controllers.updateOne);
    app.delete('delete-one/:id', controllers.deleteOne);

    return app;
});
