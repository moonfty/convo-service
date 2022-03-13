import { EventTypes, ITargetContent } from "../models/event/event.model";

export class CreateEventDto {
    receiver: string;
    performer: string
    event_type: EventTypes
    target_content: ITargetContent
    create_date: number
}   

export class CreateGMEventDto {
    receiver: string;
    performer: string
    create_date: number
}