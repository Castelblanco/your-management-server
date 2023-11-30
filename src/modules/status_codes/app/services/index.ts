import { type TStatusCodeDOM } from '@status_codes/domain/entities';
import { type TStatusCodeRepository } from '@status_codes/domain/repository';
import { buildFindAll } from './find_all';
import { buildCreateOne } from './create_one';
import { buildFindOne } from './find_one';
import { buildUpdateOne } from './update_one';
import { buildDeleteOne } from './delete_one';
import { buildCreateMany } from './create_many';

export class StatusCodeServices {
    findAll: () => Promise<TStatusCodeDOM[]>;
    findOne: (id: string) => Promise<TStatusCodeDOM>;
    createOne: (status: TStatusCodeDOM) => Promise<TStatusCodeDOM>;
    updateOne: (status: TStatusCodeDOM) => Promise<TStatusCodeDOM>;
    deleteOne: (id: string) => Promise<void>;
    createMany: (status: TStatusCodeDOM[]) => Promise<number>;

    constructor(repository: TStatusCodeRepository, createId: () => string) {
        this.findAll = buildFindAll({ repository });
        this.findOne = buildFindOne({ repository });
        this.createOne = buildCreateOne({ repository, createId });
        this.updateOne = buildUpdateOne({ repository });
        this.deleteOne = buildDeleteOne({ repository });
        this.createMany = buildCreateMany({ createId, repository });
    }
}
