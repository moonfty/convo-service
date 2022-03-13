import { Injectable, NotFoundException } from '@nestjs/common';
import * as _ from 'lodash';
import axios from 'axios'
import { lowerCase } from 'lodash';


const endpoint = "https://qzlsklfacc.medianetwork.cloud";
const urls = {
    financial: '/query_volume_all',
    collections: '/get_collections',
}

export interface ISolanaArtQueryObject {
    totalVolume: number,
    dailyVolume: number,
    weeklyVolume: number,
    totalSales: number,
    dailySales:number,
    weeklySales: number,
    prevDailySales: number,
    prevDailyVolume: number,
    prevWeeklySales: number,
    prevWeeklyVolume: number,
    floorPrice: null,
    ownerCount: number,
    collection: string,
    lastUpdated: number,
    category: string,
    image?: string 
    name?: string
}

@Injectable()
export class SolanaService {
    async getTrendingCollections(): Promise<any> {
        const response = await axios.get<Array<ISolanaArtQueryObject>>(endpoint + urls.financial)
        const all_collections = await axios.get<Array<any>>(endpoint + urls.collections)
        const all_collections_data = all_collections.data
        var collections:Array<ISolanaArtQueryObject> = response.data
        var sorted_collections:Array<ISolanaArtQueryObject> = _.orderBy( collections, 'dailySales' , 'desc');

        var count = 0
        for(var collection of sorted_collections) {
            if(count === 25) {
                break
            }
            const name = collection.collection
            const found_collection = _.find(all_collections_data, {'url': name})

            if(found_collection){
                const image = found_collection['imgpreview']
                collection.image = image
                collection.name = found_collection.name
                count+=1
            }
        }
        return sorted_collections
    }
}
