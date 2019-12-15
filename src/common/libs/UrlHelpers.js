import * as AppSettings from '../AppSettings';
const urljoin = require('url-join');

export default class UrlHelpers{

    getUrlParameter (name) {
        name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
        let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        let results = regex.exec(window.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
      };

    getCorsifiedUrl (url){
      return urljoin(AppSettings.CORS_URL, url)
    };

}