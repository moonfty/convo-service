import ConvoModel from './convo.model';

export class ConvoRepository {
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
