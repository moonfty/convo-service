import { Injectable, NotFoundException } from '@nestjs/common';
import * as _ from 'lodash';
import axios from 'axios'


const endpoint = "https://graphql.icy.tools/graphql";
const headers = {
	"content-type": "application/json",
    "x-api-key":"8f87de4a491349ffa6741b1affbcd91a"
};
const graphqlQuery = {
    "operationName": "TrendingContracts",
    "query": `query TrendingContracts {
        contracts(orderBy: SALES, orderDirection: DESC) {
          edges {
            node {
              address
              ... on ERC721Contract {
                name
                symbol
                stats {
                  totalSales
                  average
                  ceiling
                  floor
                  volume
                }
                unsafeOpenseaImageUrl
                unsafeOpenseaSlug
              }
            }
          }
        }
      }`,
    "variables": {}
};  

@Injectable()
export class IcyToolService {
    async getTrendingCollections(): Promise<any> {
        const response = await axios.post(endpoint, graphqlQuery, {headers: headers})
        const collections = response.data['data'].contracts
        return collections
    }
}
