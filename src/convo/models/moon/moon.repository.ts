import { ICommentResponse } from 'src/convo/dtos/comment.dto';
import { IConvoResponse } from 'src/convo/dtos/convo.dto';
import { CreateMoonDto } from 'src/convo/dtos/moon.dto';
import { IComment } from '../comment.model';
import { IConvo } from '../convo/convo.model';
import MoonModel, { IMoon } from './moon.model';

export class MoonRepository {
    static async create(data: CreateMoonDto): Promise<IMoon> {
        const obj = new MoonModel(data);
        return await obj.save();
    }

    static async getCommentIsMoon(
        data: Array<IComment>,
        user: string,
    ): Promise<Array<ICommentResponse>> {
        let commentResponseList: Array<ICommentResponse> = [];
        for (var comment of data) {
            const moondetail = await MoonModel.findOne({
                user: user,
                comment: comment.id,
            });
            var commentResponse: ICommentResponse = {
                comment: undefined,
                isMoon: false,
            };

            if (moondetail) {
                commentResponse['isMoon'] = true;
            } else {
                commentResponse['isMoon'] = false;
            }
            commentResponse.comment = comment;
            commentResponseList.push(commentResponse);
        }
        return commentResponseList;
    }

    static async getConvoIsMoon(
        data: Array<IConvo>,
        user: string,
    ): Promise<Array<IConvoResponse>> {
        let convoResponselist: Array<IConvoResponse> = [];
        for (var convo of data) {
            const moondetail = await MoonModel.findOne({
                user: user,
                convo: convo.id,
            });
            var convoResponse: IConvoResponse = {
                convo: undefined,
                isMoon: false,
            };

            if (moondetail) {
                convoResponse['isMoon'] = true;
            } else {
                convoResponse['isMoon'] = false;
            }
            convoResponse.convo = convo;
            convoResponselist.push(convoResponse);
        }
        return convoResponselist;
        return;
    }
}
