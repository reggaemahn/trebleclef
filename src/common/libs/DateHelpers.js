export default class DateHelpers{
    getFriendlyItunesDate(itunesDateStr){
        if(!itunesDateStr || itunesDateStr.length < 16){
            return '';
        }

        return itunesDateStr.substr(0, 16);
    }
}