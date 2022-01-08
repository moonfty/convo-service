import { IConvo } from '../models/convo/convo.model';

export class CreateConvoDto {
    user: string;
    text: string;
    nft_post?: string;
    link?: string;
    asset?: string;
    event_date?: number;
    color?: string;
}

export interface IConvoResponse<T> {
    convo: IConvo;
    isMoon: boolean;
}
