import type {
    TGuideServiceFilterDOM,
    TGuideServiceRelations,
    TGuideServiceDOM,
    TGuideServiceNoveltyDOM,
    TGuideServiceTypeServiceDOM,
} from '@guides_service/domain/entities';
import { type TGuideServiceRepository } from '@guides_service/domain/repository';
import { buildFindAll } from './find_all';
import { buildFindOne } from './find_one';
import { buildCreateOne } from './create_one';
import { buildCreateMany } from './create_many';
import { buildUpdateOne } from './update_one';
import { buildDeleteOne } from './delete_one';
import { buildFindNovelties } from './find_novelties';
import { buildFindServicesType } from './find_services_type';
import { buildCount } from './count';
import { buildRouterReport } from './router_report';

export type TGuideServiceExporter = {
    router: (
        guides: TGuideServiceDOM[],
        typeServices: TGuideServiceTypeServiceDOM[],
    ) => Promise<Buffer>;
};

export type TDependencies = {
    repository: TGuideServiceRepository;
    createId: () => string;
    exporter: TGuideServiceExporter;
};

export class GuideServiceServices {
    findAll: (
        filter: TGuideServiceFilterDOM,
        options: TGuideServiceRelations,
    ) => Promise<TGuideServiceDOM[]>;

    findOne: (id: string, relations: TGuideServiceRelations) => Promise<TGuideServiceDOM>;
    count: (filter: TGuideServiceFilterDOM) => Promise<number>;
    findNovelties: () => Promise<TGuideServiceNoveltyDOM[]>;
    findServicesType: () => Promise<TGuideServiceTypeServiceDOM[]>;
    createOne: (guide: TGuideServiceDOM) => Promise<TGuideServiceDOM>;
    createMany: (guides: TGuideServiceDOM[]) => Promise<number>;
    updateOne: (guide: TGuideServiceDOM) => Promise<TGuideServiceDOM>;
    deleteOne: (id: string) => Promise<void>;
    reportRouter: (filters: TGuideServiceFilterDOM) => Promise<Buffer>;

    constructor(dependencies: TDependencies) {
        this.findAll = buildFindAll(dependencies);
        this.findOne = buildFindOne(dependencies);
        this.count = buildCount(dependencies);
        this.findNovelties = buildFindNovelties(dependencies);
        this.findServicesType = buildFindServicesType(dependencies);
        this.createOne = buildCreateOne(dependencies);
        this.createMany = buildCreateMany(dependencies);
        this.updateOne = buildUpdateOne(dependencies);
        this.deleteOne = buildDeleteOne(dependencies);
        this.reportRouter = buildRouterReport(dependencies);
    }
}
