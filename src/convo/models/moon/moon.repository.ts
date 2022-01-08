import { ICommentResponse } from 'src/convo/dtos/comment.dto';
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
    ): Promise<Array<ICommentResponse>> {
        let commentResponseList: Array<ICommentResponse> = [];
        for (var comment of data) {
            const moondetail = await MoonModel.findOne({
                user: comment.user,
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
        console.log(commentResponseList);
        return commentResponseList;
    }

    static async getConvoIsMoon(
        data: Array<IConvo>,
    ): Promise<Array<ICommentResponse>> {
        return;
    }
}
