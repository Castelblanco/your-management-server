import { type TWrappers } from '@common/mappers_wrappers/wrappers';
import type { TUserFilterDOM, TUserDOM } from '@users/domain/entities';
import type { TUsersRepository } from '@users/domain/repository';
import type { TUserDAL } from '../models';
import { UsersWrappers } from '../wrappers';
import { StorageError } from '@common/response/errors/storage_error';
import { ErrorResourceNotFound } from '@common/response/errors/resource_not_found';
import { PrismaRequestError, prisma, PrismaError } from '@db/prisma/connect';

export class UsersPrismaRepository implements TUsersRepository {
    db: typeof prisma.users;
    wrappers: TWrappers<TUserDOM, TUserDAL>;

    constructor() {
        this.db = prisma.users;
        this.wrappers = new UsersWrappers();
    }

    findAll = async (filter: TUserFilterDOM): Promise<TUserDOM[]> => {
        try {
            const users = await this.db.findMany({
                where: {
                    first_name: {
                        contains: filter.firstName,
                        mode: 'insensitive',
                    },
                    last_name: {
                        contains: filter.lastName,
                        mode: 'insensitive',
                    },
                    document_id: {
                        contains: filter.documentId,
                        mode: 'insensitive',
                    },
                    email: {
                        contains: filter.email,
                        mode: 'insensitive',
                    },
                    address: {
                        contains: filter.address,
                        mode: 'insensitive',
                    },
                    status_id: filter.statusId,
                    point_sale_id: filter.pointSaleId,
                    role_id: filter.roleId,
                    created_at: {
                        gte: filter.startTime,
                        lte: filter.endTime,
                    },
                },
                take: filter?.limit,
                skip: filter?.offset,
                include: {
                    point_sale: filter?.pointSale,
                    role: filter?.role,
                    status: filter?.status,
                },
            });

            return users.map(this.wrappers.dalToDom);
        } catch (e) {
            if (e instanceof PrismaRequestError)
                throw new StorageError(new PrismaError(e));

            throw new StorageError(e);
        }
    };

    findOne = async (filter: TUserFilterDOM): Promise<TUserDOM> => {
        try {
            const user = await this.db.findFirst({
                where: {
                    first_name: {
                        equals: filter.firstName,
                    },
                    last_name: {
                        equals: filter.lastName,
                    },
                    document_id: {
                        equals: filter.documentId,
                    },
                    email: {
                        equals: filter.email,
                    },
                    address: {
                        equals: filter.address,
                    },
                    status_id: filter.statusId,
                    point_sale_id: filter.pointSaleId,
                    role_id: filter.roleId,
                    created_at: {
                        gte: filter.startTime,
                        lte: filter.endTime,
                    },
                },
                include: {
                    point_sale: filter?.pointSale,
                    role: filter?.role,
                    status: filter?.status,
                },
            });

            if (!user) throw new ErrorResourceNotFound(`this user not exits`);

            return this.wrappers.dalToDom(user);
        } catch (e) {
            console.log(e);
            if (e instanceof PrismaRequestError)
                throw new StorageError(new PrismaError(e));

            throw new StorageError(e);
        }
    };

    findById = async (
        id: string,
        pointSale?: boolean,
        role?: boolean,
        status?: boolean,
    ): Promise<TUserDOM> => {
        try {
            const user = await this.db.findFirst({
                where: {
                    id,
                },
                include: {
                    point_sale: pointSale,
                    role,
                    status,
                },
            });

            if (!user)
                throw new ErrorResourceNotFound(`this user with id ${id}, not exits`);

            return this.wrappers.dalToDom(user);
        } catch (e) {
            if (e instanceof PrismaRequestError)
                throw new StorageError(new PrismaError(e));

            throw new StorageError(e);
        }
    };

    count = async (filter: TUserFilterDOM): Promise<number> => {
        try {
            return await this.db.count({
                where: {
                    first_name: {
                        equals: filter.firstName,
                    },
                    last_name: {
                        equals: filter.lastName,
                    },
                    document_id: {
                        equals: filter.documentId,
                    },
                    email: {
                        equals: filter.email,
                    },
                    address: {
                        equals: filter.address,
                    },
                    status_id: filter.statusId,
                    point_sale_id: filter.pointSaleId,
                    role_id: filter.roleId,
                    created_at: {
                        gte: filter.startTime,
                        lte: filter.endTime,
                    },
                },
            });
        } catch (e) {
            if (e instanceof PrismaRequestError)
                throw new StorageError(new PrismaError(e));

            throw new StorageError(e);
        }
    };

    createOne = async (user: TUserDOM): Promise<TUserDOM> => {
        try {
            const newUser = await this.db.create({
                data: {
                    ...this.wrappers.domToDal(user),
                    role: undefined,
                    point_sale: undefined,
                    status: undefined,
                },
                include: {
                    point_sale: true,
                    role: true,
                },
            });

            return this.wrappers.dalToDom(newUser);
        } catch (e) {
            if (e instanceof PrismaRequestError)
                throw new StorageError(new PrismaError(e));

            throw new StorageError(e);
        }
    };

    updateOne = async (user: TUserDOM): Promise<TUserDOM> => {
        try {
            const updateUser = await this.db.update({
                where: {
                    id: user.id,
                },
                data: {
                    ...this.wrappers.domToDal(user),
                    role: undefined,
                    point_sale: undefined,
                    status: undefined,
                },
                include: {
                    point_sale: true,
                    role: true,
                },
            });

            return this.wrappers.dalToDom(updateUser);
        } catch (e) {
            if (e instanceof PrismaRequestError)
                throw new StorageError(new PrismaError(e));

            throw new StorageError(e);
        }
    };

    deleteOne = async (id: string): Promise<void> => {
        try {
            await this.db.delete({
                where: {
                    id,
                },
            });
        } catch (e) {
            if (e instanceof PrismaRequestError)
                throw new StorageError(new PrismaError(e));

            throw new StorageError(e);
        }
    };

    createMany = async (users: TUserDOM[]): Promise<number> => {
        try {
            const { count } = await this.db.createMany({
                data: users.map((user) => ({
                    ...this.wrappers.domToDal(user),
                    role: undefined,
                    point_sale: undefined,
                })),
            });

            return count;
        } catch (e) {
            if (e instanceof PrismaRequestError)
                throw new StorageError(new PrismaError(e));

            throw new StorageError(e);
        }
    };
}
