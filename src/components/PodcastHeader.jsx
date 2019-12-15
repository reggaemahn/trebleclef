import * as React from 'react';

import loading from '../loading.gif';

const PodcastHeader = (props) => {
    return (
        <div>
            <div className={`columns podcast-header ${props.showLoader ? 'is-hidden' : ''}`}>
                <div className="column is-one-quarter" >
                    <img className="podcast-image" src={props.imageUrl} alt="thumbnail" width="250" height="250" />
                </div>
                <div className="column">
                    <h2 className="is-size-2">{props.title}</h2>
                    
                    <p>{props.description}</p>
                    <br />
                    
                    <button className={"button is-primary " + `${props.showDownloadProgress ? 'is-hidden' : ''}` } onClick={() => props.downloadAllEpisodes()}>Download</button>
                    <p className={`${props.showDownloadProgress ? '' : 'is-hidden'}`}>
                        <progress className={"progress " + props.progressBarState} value={props.downloadPercentage} max={props.downloadMax}>{props.downloadPercentage}%</progress>
                    </p>
                </div>
            </div>
            <div className={`podcast-loader ${props.showLoader ? '' : 'is-hidden'}`}>
                <img src={loading} alt="loading" width="25%" />
            </div>
        </div>
    );
}

export default PodcastHeader;