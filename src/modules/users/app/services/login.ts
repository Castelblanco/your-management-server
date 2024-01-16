import { type TUserDOM, type TUserLoginDOM, UserLoginDOM } from '@users/domain/entities';
import type { TUsersRepository } from '@users/domain/repository';

type Dependecies = {
    repository: TUsersRepository;
    singToken: (payload: string | object | Buffer, expiresIn: string) => string;
};

export const buildLogin = ({
    repository,
    singToken,
}: Dependecies): ((user: TUserDOM) => Promise<TUserLoginDOM>) => {
    const service = async (user: TUserDOM): Promise<TUserLoginDOM> => {
        const userFind = await repository.findOne(
            {
                email: user.email,
            },
            true,
            true,
        );

        const token = singToken(userFind, '1h');

        return new UserLoginDOM({
            ...userFind,
            token,
            role: userFind.role || '',
            pointSale: userFind.pointSale,
        });
    };

    return service;
};
