import { TUserDOM, TUserFilterDOM, TUserOPT } from '@users/domain/entities';
import { TDateFormat, buildFindAll } from './find_all';
import { TUsersRepository } from '@users/domain/repository';
import { buildFindOne } from './find_one';
import { buildCreateOne } from './create_one';
import { buildUpdateOne } from './update_one';
import { buildDeleteOne } from './delete_one';
import { buildCreateMany } from './create_many';

export class UsersServices {
    findAll: (filter: TUserFilterDOM, options: TUserOPT) => Promise<TUserDOM[]>;
    findOne: (
        id: string,
        pointSale?: boolean,
        role?: boolean,
    ) => Promise<TUserDOM>;
    createOne: (user: TUserDOM) => Promise<TUserDOM>;
    updateOne: (user: TUserDOM) => Promise<TUserDOM>;
    deleteOne: (id: string) => Promise<void>;
    createMany: (users: TUserDOM[]) => Promise<number>;

    constructor(
        repository: TUsersRepository,
        createId: () => string,
        getDateFormat: (date: string | number, format?: TDateFormat) => string,
    ) {
        this.findAll = buildFindAll({ repository, getDateFormat });
        this.findOne = buildFindOne({ repository });
        this.createOne = buildCreateOne({ repository, createId });
        this.updateOne = buildUpdateOne({ repository });
        this.deleteOne = buildDeleteOne({ repository });
        this.createMany = buildCreateMany({ repository, createId });
    }
}
