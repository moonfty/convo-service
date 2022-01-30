import { getMonthFirstLastDays } from 'src/convo/utils/date.util';
import ConvoModel, { IConvo } from './convo.model';

export class ConvoRepository {
    static async getTrends(page: number): Promise<Array<IConvo>> {
        const days = getMonthFirstLastDays();
        const data = await ConvoModel.find(
            {
                create_date: {
                    $gte: days.firstDay,
                    $lt: days.lastDay,
                },
            },
            {},
            { skip: page * 10, limit: 10, sort: { moon: 'desc' } },
        );
        return data;
    }

    static async searchRelevantResultsWithPagination(text: string, page) {
        const query_options = {
            skip: page * 10,
            limit: 10,
            sort: { score: { $meta: 'textScore' } },
        };

        const data = await ConvoModel.find(
            {
                $text: {
                    $search: text,
                },
            },
            { score: { $meta: 'textScore' } },
            query_options,
        );
        return data;
    }

    /*
    static async getHotConvoResultsWithPagination(page) {
        const query_options = {
            skip: page * 10,
            limit: 10,
            sort: { rank: { $meta: 'textScore' } },
        };

        const current_time = new Date().getTime()
        
        const data = await ConvoModel.find(
            {},
            { rank:  },
            query_options,
        );

        return data;
    }
    */
}
