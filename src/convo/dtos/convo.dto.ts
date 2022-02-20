import { IConvo } from '../models/convo/convo.model';

export class CreateConvoDto {
    text: string;
    user?: string;
    nft_post?: string;
    link?: string;
    asset?: string;
    event_date?: number;
    color?: string;
    create_date?: number
}

export interface IConvoResponse {
    convo: IConvo;
    isMoon: boolean;
}
