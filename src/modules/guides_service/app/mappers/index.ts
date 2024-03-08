/* eslint-disable @typescript-eslint/naming-convention */
import { type TMappers } from '@common/mappers_wrappers/mappers';
import {
    GuideServiceAPI,
    type TGuideServicePointSaleAPI,
    type TGuideServiceAPI,
    GuideServicePointSaleAPI,
    type TGuideServiceUserAPI,
    GuideServiceUserAPI,
    type TGuideServiceUserStatusAPI,
    type TGuideServiceUserRoleAPI,
    type TGuideServiceStatusAPI,
    type TGuideServiceNoveltyAPI,
    type TGuideServiceCollectionAPI,
    type TGuideServiceTypeServiceAPI,
    type TGuideServiceLegalClientAPI,
    type TGuideServiceNaturalClientAPI,
    GuideServiceLegalClientAPI,
    type TGuideServiceClientTypeAPI,
    GuideServiceNaturalClientAPI,
} from '@guides_service/domain/dto';
import {
    GuideServiceDOM,
    type TGuideServicePointSaleDOM,
    type TGuideServiceDOM,
    GuideServicePointSaleDOM,
    type TGuideServiceUserDOM,
    GuideServiceUserDOM,
    type TGuideServiceUserRoleDOM,
    type TGuideServiceUserStatusDOM,
    type TGuideServiceStatusDOM,
    type TGuideServiceNoveltyDOM,
    type TGuideServiceCollectionDOM,
    type TGuideServiceTypeServiceDOM,
    type TGuideServiceLegalClientDOM,
    type TGuideServiceNaturalClientDOM,
    GuideServiceLegalClientDOM,
    type TGuideServiceClientTypeDOM,
    GuideServiceNaturalClientDOM,
} from '@guides_service/domain/entities';

export class GuideServiceMappers implements TMappers<TGuideServiceDOM, TGuideServiceAPI> {
    apiToDom = (item: TGuideServiceAPI): TGuideServiceDOM => {
        const {
            point_sale_origin,
            point_sale_destination,
            client_destination,
            client_origin,
        } = item;

        let status: TGuideServiceStatusDOM | undefined;

        if (item.status) {
            status = {
                id: item.status._id,
                name: item.status.name,
            };
        }

        let novelty: TGuideServiceNoveltyDOM | undefined;

        if (item.novelty) {
            novelty = {
                id: item.novelty._id,
                name: item.novelty.name,
            };
        }

        let collection: TGuideServiceCollectionDOM | undefined;

        if (item.collection) {
            collection = {
                id: item.collection._id,
                name: item.collection.name,
            };
        }

        let service: TGuideServiceTypeServiceDOM | undefined;

        if (item.service) {
            service = {
                id: item.service._id,
                name: item.service.name,
            };
        }

        return new GuideServiceDOM({
            id: item._id,
            units: item.units,
            weight: item.weight,
            price: item.price,
            createdAt: item.created_at,
            updatedAt: item.updated_at,
            status,
            novelty,
            collection,
            service,
            user: this.userApiToDom(item.user),
            clientDestination:
                client_destination && this.clientApiToDom(client_destination),
            clientOrigin: client_origin && this.clientApiToDom(client_origin),
            pointSaleOrigin:
                point_sale_origin && this.pointSaleApiToDom(point_sale_origin),
            pointSaleDestination:
                point_sale_destination && this.pointSaleApiToDom(point_sale_destination),
        });
    };

    domToApi = (item: TGuideServiceDOM): TGuideServiceAPI => {
        const { pointSaleDestination, pointSaleOrigin, clientOrigin, clientDestination } =
            item;

        let status: TGuideServiceStatusAPI | undefined;

        if (item.status) {
            status = {
                _id: item.status.id,
                name: item.status.name,
            };
        }

        let novelty: TGuideServiceNoveltyAPI | undefined;

        if (item.novelty) {
            novelty = {
                _id: item.novelty.id,
                name: item.novelty.name,
            };
        }

        let collection: TGuideServiceCollectionAPI | undefined;

        if (item.collection) {
            collection = {
                _id: item.collection.id,
                name: item.collection.name,
            };
        }

        let service: TGuideServiceTypeServiceAPI | undefined;

        if (item.service) {
            service = {
                _id: item.service.id,
                name: item.service.name,
            };
        }

        return new GuideServiceAPI({
            _id: item.id,
            units: item.units,
            weight: item.weight,
            price: item.price,
            created_at: item.createdAt,
            updated_at: item.updatedAt,
            status,
            novelty,
            collection,
            service,
            user: this.userDomToApi(item.user),
            client_destination:
                clientDestination && this.clientDomToApi(clientDestination),
            client_origin: clientOrigin && this.clientDomToApi(clientOrigin),
            point_sale_origin: pointSaleOrigin && this.pointSaleDomToApi(pointSaleOrigin),
            point_sale_destination:
                pointSaleDestination && this.pointSaleDomToApi(pointSaleDestination),
        });
    };

    pointSaleDomToApi = (
        pointSale: TGuideServicePointSaleDOM,
    ): TGuideServicePointSaleAPI => {
        return new GuideServicePointSaleAPI({
            _id: pointSale.id,
            name: pointSale.name,
            address: pointSale.address,
            latitude: pointSale.latitude,
            longitude: pointSale.longitude,
            budget: pointSale.budget,
        });
    };

    pointSaleApiToDom = (
        pointSale: TGuideServicePointSaleAPI,
    ): TGuideServicePointSaleDOM => {
        return new GuideServicePointSaleDOM({
            id: pointSale._id,
            name: pointSale.name,
            address: pointSale.address,
            latitude: pointSale.latitude,
            longitude: pointSale.longitude,
            budget: pointSale.budget,
        });
    };

    userDomToApi = (user?: TGuideServiceUserDOM): TGuideServiceUserAPI | undefined => {
        if (!user) return;

        const status: TGuideServiceUserStatusAPI = {
            _id: user.status.id,
            name: user.status.name,
        };

        const role: TGuideServiceUserRoleAPI = {
            _id: user.role.id,
            name: user.role.name,
        };

        return new GuideServiceUserAPI({
            _id: user.id,
            first_name: user.firstName,
            last_name: user.lastName,
            document_id: user.documentId,
            email: user.email,
            phone: user.phone,
            address: user.address,
            status,
            role,
        });
    };

    userApiToDom = (user?: TGuideServiceUserAPI): TGuideServiceUserDOM | undefined => {
        if (!user) return;

        const status: TGuideServiceUserStatusDOM = {
            id: user.status._id,
            name: user.status.name,
        };

        const role: TGuideServiceUserRoleDOM = {
            id: user.role._id,
            name: user.role.name,
        };

        return new GuideServiceUserDOM({
            id: user._id,
            firstName: user.first_name,
            lastName: user.last_name,
            documentId: user.document_id,
            email: user.email,
            phone: user.phone,
            address: user.address,
            status,
            role,
        });
    };

    clientApiToDom = (
        client: TGuideServiceLegalClientAPI | TGuideServiceNaturalClientAPI,
    ): TGuideServiceLegalClientDOM | TGuideServiceNaturalClientDOM => {
        const type: TGuideServiceClientTypeDOM = {
            id: client.type._id,
            name: client.type.name,
        };

        if (client instanceof GuideServiceLegalClientAPI) {
            return new GuideServiceLegalClientDOM({
                id: client._id,
                numberMovil: client.number_movil,
                address: client.address,
                nit: client.nit,
                businessName: client.business_name,
                type,
            });
        }

        const defaultClient = client as TGuideServiceNaturalClientAPI;

        return new GuideServiceNaturalClientDOM({
            id: defaultClient._id,
            numberMovil: defaultClient.number_movil,
            address: defaultClient.address,
            documentId: defaultClient.document_id,
            firstName: defaultClient.first_name,
            lastName: defaultClient.last_name,
            type,
        });
    };

    clientDomToApi = (
        client: TGuideServiceLegalClientDOM | TGuideServiceNaturalClientDOM,
    ): TGuideServiceLegalClientAPI | TGuideServiceNaturalClientAPI => {
        const type: TGuideServiceClientTypeAPI = {
            _id: client.type.id,
            name: client.type.name,
        };

        if (client instanceof GuideServiceLegalClientDOM) {
            return new GuideServiceLegalClientAPI({
                _id: client.id,
                number_movil: client.numberMovil,
                address: client.address,
                nit: client.nit,
                business_name: client.businessName,
                type,
            });
        }

        const defaultClient = client as TGuideServiceNaturalClientDOM;

        return new GuideServiceNaturalClientAPI({
            _id: defaultClient.id,
            number_movil: defaultClient.numberMovil,
            address: defaultClient.address,
            document_id: defaultClient.documentId,
            first_name: defaultClient.firstName,
            last_name: defaultClient.lastName,
            type,
        });
    };
}