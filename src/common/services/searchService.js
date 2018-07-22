import axios  from 'axios';
import * as AppSettings from '../appSettings';

export default class SearchService{
    searchTerm  = '';

    constructor(searchTerm) {
        this.searchTerm = searchTerm;
    }

    async findPodcastEpisodes(){
        const search = await axios.get(`${ AppSettings.ITUNES_URL } ${ this.searchTerm }`);
        const results = await search.data;

        const test = results.results.map((episode) => ({
            name: episode.collectionName,
            description: '',
            thumbnailUrl: episode.artworkUrl100,
            artist: episode.artistName
        }));

        return test;
    }
}