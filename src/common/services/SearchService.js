import * as AppSettings from '../AppSettings';

import DateHelpers from '../libs/DateHelpers';

export class SearchService {

    async findPodcasts(searchTerm) {
        const uri = encodeURI(AppSettings.CORS_URL + AppSettings.ITUNES_URL + searchTerm);
        const results = await (await fetch(uri)).json();

        const formattedResults = results.results.map((podcast) => ({
            trackId: podcast.trackId,
            name: podcast.collectionName,
            description: '',
            thumbnailUrl: podcast.artworkUrl100,
            artist: podcast.artistName,
            feedUrl: podcast.feedUrl
        }));

        return formattedResults;
    }

    async findPodcast(podcastId) {
        const uri = encodeURI(AppSettings.CORS_URL + AppSettings.ITUNES_LOOKUP_URL + podcastId);

        const search = await (await fetch(uri)).json();
        const result = search.results[0];

        return {
            trackId: result.trackId,
            name: result.collectionName,
            description: '',
            thumbnailUrl: result.artworkUrl100,
            artist: result.artistName,
            feedUrl: result.feedUrl
        };
    }

    async getPodcastDetails(podcastId) {
        const podcast = await this.findPodcast(podcastId);

        const uri = encodeURI(AppSettings.CORS_URL + podcast.feedUrl);
        const podcastFeedXml = await (await fetch(uri, {
            headers: new Headers({
                'Content-Type': 'application/rss+xml'
            })
        })).text();

        var doc = new DOMParser()
            .parseFromString(podcastFeedXml, 'application/xml');

        const channelNode = doc
            .querySelector('rss > channel');

        const imageNode = channelNode
            .getElementsByTagNameNS(AppSettings.ITUNES_XMLNAMESPACE, 'image')[0];

        const authorNode = channelNode
            .getElementsByTagNameNS(AppSettings.ITUNES_XMLNAMESPACE, 'owner')[0];

        return {
            title: doc.querySelector('rss > channel > title').textContent,
            description: doc.querySelector('rss > channel > description').textContent,
            imageUrl: imageNode.getAttribute('href'),
            author: authorNode.childElementCount === 1 ? authorNode.textContent : authorNode.getElementsByTagNameNS(AppSettings.ITUNES_XMLNAMESPACE, 'name')[0].textContent,
            episodes: this.getEpisodesFromXml(doc)
        };
    }

    getEpisodesFromXml(xmlDoc) {
        const episodeNodes = xmlDoc.querySelectorAll('rss > channel > item');

        return [...episodeNodes].map(episodeNode => {
            const title = episodeNode.querySelector('title');
            const pubDate = episodeNode.querySelector('pubDate');
            const description = episodeNode.querySelector('description');
            const audioUrl = episodeNode.querySelector('enclosure');
            const audioFormat = episodeNode.querySelector('enclosure');

            if (audioUrl && audioFormat) {
                return {
                    title: title === null ? ' ' : title.textContent,
                    pubDate: new DateHelpers().getFriendlyItunesDate(pubDate.textContent),
                    description: description === null ? ' ' : description.textContent,
                    audioUrl: audioUrl.getAttribute('url'),
                    audioFormat: audioFormat.getAttribute('type')
                };
            }

            return {};
        });
    }
}