import axios  from 'axios';
import * as AppSettings from '../AppSettings';

export class SearchService{
    constructor(searchTerm) {
        this.searchTerm = searchTerm;
    }

    async findPodcastEpisodes(){
        console.log(`Searching for '${ this.searchTerm }'`);
        const uri = encodeURI(`${ AppSettings.ITUNES_URL } ${ this.searchTerm }`);
        const search = await axios.get(uri, 
        {
            headers: {"Access-Control-Allow-Origin": "*"}
        });
        const results = await search.data;

        const formattedResults = results.results.map((episode) => ({
            name: episode.collectionName,
            description: '',
            thumbnailUrl: episode.artworkUrl100,
            artist: episode.artistName
        }));

        return formattedResults;
    }
}