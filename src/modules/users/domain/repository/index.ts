import type { TUserDOM, TUserFilterDOM, TUserOPT } from '../entities';

export type TUsersRepository = {
    findAll: (filter: TUserFilterDOM, options: TUserOPT) => Promise<TUserDOM[]>;
    findOne: (filter: TUserFilterDOM, options: TUserOPT) => Promise<TUserDOM>;
    findById: (
        id: string,
        pointSale?: boolean,
        role?: boolean,
        status?: boolean,
    ) => Promise<TUserDOM>;
    createOne: (user: TUserDOM) => Promise<TUserDOM>;
    updateOne: (user: TUserDOM) => Promise<TUserDOM>;
    deleteOne: (id: string) => Promise<void>;
    createMany: (users: TUserDOM[]) => Promise<number>;
};
