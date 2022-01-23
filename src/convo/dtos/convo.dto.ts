import { IConvo } from '../models/convo/convo.model';

export class CreateConvoDto {
    text: string;
    user?: string;
    nft_post?: string;
    link?: string;
    asset?: string;
    event_date?: number;
    color?: string;
}

export interface IConvoResponse {
    convo: IConvo;
    isMoon: boolean;
}
