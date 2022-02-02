import { CreateCommentDto } from 'src/convo/dtos/comment.dto';
import { CreateConvoDto } from 'src/convo/dtos/convo.dto';
import { CreateMoonDto } from 'src/convo/dtos/moon.dto';
import { IComment } from 'src/convo/models/comment.model';
import { IConvo } from 'src/convo/models/convo/convo.model';
import { IMoon } from 'src/convo/models/moon/moon.model';
import * as mongoose from 'mongoose';
import CommentModel from '../../models/comment.model';
import ConvoModel from '../../models/convo/convo.model';
const { ObjectId } = require('mongodb');

export const user1 = '507f191e810c19729deuser1';
export const user2 = '507f191e810c19729deuser2';
export const user3 = '507f191e810c19729deuser3';

export const convoList: Array<CreateConvoDto> = [
    {
        user: user1,
        text: 'New Convo test',
    },
    {
        user: user2,
        text: 'New Convo test',
    },
];

export const commentList: Array<any> = [
    {
        user: user2,
        text: 'Nice Comment test',
    },
    {
        user: user1,
        text: 'Nice Comment test',
    },
];

class MoonTestBase implements IMoon {
    user: string;
    convo?: mongoose.Types.ObjectId;
    comment?: mongoose.Types.ObjectId;
    create_date: number;

    constructor() {
        this.user = user3;
        this.create_date = new Date().getTime();
    }
}

export const createSeedData = async () => {
    //Create convos from convolist
    const convos = await ConvoModel.insertMany(convoList);

    //Create comments from commentlist for first Convo
    var last_comment: IComment = {
        id: new ObjectId(),
        convo: new ObjectId(),
        child_count: 0 ,
        user: '',
        text: '',
        moon: 0,
        create_date: 0,
        last_activity_date: 0,
        delete_date: 0,
    };
    for (var comment of commentList) {
        comment.convo = convos[0].id;
        const comment_ = new CommentModel(comment);
        const saved = await comment_.save();
        last_comment = saved;
    }

    var moonList: Array<IMoon> = [];
    //Create moon for convo
    var convo_moon = new MoonTestBase();
    convo_moon.convo = convos[0].id;
    moonList.push(convo_moon);

    //Create moon for comment
    var convo_moon = new MoonTestBase();
    convo_moon.comment = last_comment.id;
    moonList.push(convo_moon);

    return convos[0].id;
};
