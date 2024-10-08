/* eslint-disable @typescript-eslint/naming-convention */
import { type TWrappers } from '@common/mappers_wrappers/wrappers';
import {
    GuideServiceDAL,
    GuideServicePointSaleDAL,
    GuideServiceUserDAL,
    type TGuideServiceLegalClientDAL,
    type TGuideServiceDAL,
    type TGuideServicePointSaleDAL,
    type TGuideServiceUserDAL,
    type TGuideServiceUserRoleDAL,
    type TGuideServiceNaturalClientDAL,
} from '../models';
import {
    GuideServiceDOM,
    GuideServiceLegalClientDOM,
    GuideServiceNaturalClientDOM,
    GuideServicePointSaleDOM,
    GuideServiceUserDOM,
    type TGuideServiceLegalClientDOM,
    type TGuideServiceDOM,
    type TGuideServicePointSaleDOM,
    type TGuideServiceUserDOM,
    type TGuideServiceUserRoleDOM,
    type TGuideServiceNaturalClientDOM,
    type TGuideServiceCommodityDOM,
} from '@guides_service/domain/entities';

export class GuideServiceWrappers
    implements TWrappers<TGuideServiceDOM, TGuideServiceDAL>
{
    dalToDom = (item: TGuideServiceDAL): TGuideServiceDOM => {
        const { point_sale_destination, point_sale_origin } = item;

        return new GuideServiceDOM({
            id: item.id,
            number: Number(item.number),
            commodity: item.commodity as TGuideServiceCommodityDOM[],
            price: item.price,
            createdAt: item.created_at,
            updatedAt: item.updated_at,
            status: item.status,
            novelty: item.novelty,
            collection: item.collection,
            service: item.service,
            user: this.userDalToDom(item.user),
            pointSaleOrigin:
                point_sale_origin && this.pointSaleDalToDom(point_sale_origin),
            pointSaleDestination:
                point_sale_destination && this.pointSaleDalToDom(point_sale_destination),
            clientOrigin: this.clientDalToDom(
                item.client_legal_origin,
                item.client_natural_origin,
            ),
            clientDestination: this.clientDalToDom(
                item.client_legal_destination,
                item.client_natural_destination,
            ),
        });
    };

    domToDal = (item: TGuideServiceDOM): TGuideServiceDAL => {
        const { clientOrigin, clientDestination } = item;

        let clientNaturalOriginId: string | null = null;
        let clientNaturalDestinationId: string | null = null;
        let clientLegalOriginId: string | null = null;
        let clientLegalDestinationId: string | null = null;

        if (!clientOrigin?.natural) {
            clientLegalOriginId = clientOrigin?.id || null;
        } else clientNaturalOriginId = clientOrigin?.id || null;

        if (!clientDestination?.natural) {
            clientLegalDestinationId = clientDestination?.id || null;
        } else clientNaturalDestinationId = clientDestination?.id || null;

        return new GuideServiceDAL({
            id: item.id,
            number: item.number ? BigInt(item.number) : (undefined as any),
            commodity: item.commodity,
            price: item.price,
            created_at: item.createdAt,
            updated_at: item.updatedAt,
            status: undefined,
            novelty: undefined,
            collection: item.collection,
            service: undefined,
            user: undefined,
            point_sale_origin: undefined,
            point_sale_destination: undefined,
            client_legal_destination: null,
            client_legal_origin: null,
            client_natural_destination: null,
            client_natural_origin: null,
            status_id: item.status?.id || '',
            novelty_id: item.novelty?.id || '',
            service_id: item.service?.id || '',
            user_id: item.user?.id || '',
            point_sale_origin_id: item.pointSaleOrigin?.id || '',
            point_sale_destination_id: item.pointSaleDestination?.id || '',
            client_natural_origin_id: clientNaturalOriginId,
            client_natural_destination_id: clientNaturalDestinationId,
            client_legal_origin_id: clientLegalOriginId,
            client_legal_destination_id: clientLegalDestinationId,
        });
    };

    pointSaleDomToDal = (
        pointSale: TGuideServicePointSaleDOM,
    ): TGuideServicePointSaleDAL => {
        return new GuideServicePointSaleDAL(pointSale);
    };

    pointSaleDalToDom = (
        pointSale: TGuideServicePointSaleDAL,
    ): TGuideServicePointSaleDOM => {
        return new GuideServicePointSaleDOM(pointSale);
    };

    userDomToDal = (user?: TGuideServiceUserDOM): TGuideServiceUserDAL | undefined => {
        if (!user) return;

        const role: TGuideServiceUserRoleDAL = user.role;
        return new GuideServiceUserDAL({
            id: user.id,
            first_name: user.firstName,
            last_name: user.lastName,
            document_id: user.documentId,
            email: user.email,
            phone: user.phone,
            address: user.address,
            role,
        });
    };

    userDalToDom = (user?: TGuideServiceUserDAL): TGuideServiceUserDOM | undefined => {
        if (!user) return;

        const role: TGuideServiceUserRoleDOM = user.role;
        return new GuideServiceUserDOM({
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            documentId: user.document_id,
            email: user.email,
            phone: user.phone,
            address: user.address,
            role,
        });
    };

    clientDalToDom = (
        legalClient: TGuideServiceLegalClientDAL | null,
        naturalClient: TGuideServiceNaturalClientDAL | null,
    ): TGuideServiceLegalClientDOM | TGuideServiceNaturalClientDOM | undefined => {
        if (!legalClient && !naturalClient) return;

        if (legalClient) {
            return new GuideServiceLegalClientDOM({
                id: legalClient.id,
                numberMovil: legalClient.number_movil,
                address: legalClient.address,
                nit: legalClient.nit,
                businessName: legalClient.business_name,
                natural: false,
            });
        }

        if (naturalClient) {
            return new GuideServiceNaturalClientDOM({
                id: naturalClient.id,
                numberMovil: naturalClient.number_movil,
                address: naturalClient.address,
                documentId: naturalClient.document_id,
                firstName: naturalClient.first_name,
                lastName: naturalClient.last_name,
                natural: true,
            });
        }
    };
}
