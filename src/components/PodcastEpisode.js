import * as React from 'react';

import Downloader from 'js-file-downloader';
import UrlHelpers from "../common/libs/UrlHelpers";

class PodcastEpisode extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            uniqueId: this.props.data.uniqueId,
            title: this.props.data.title,
            description: this.props.data.description,
            audioUrl: this.props.data.audioUrl,
            pubDate: this.props.pubDate,
            downloadPercentage: 0,
            showDownloadProgress: false,
            progressBarClassName: 'is-link'
        }

        this.downloadEpisode = this.downloadEpisode.bind(this);
    }

    updateProgressBar = (percent) => {
        this.setState({ downloadPercentage: percent });
    }

    setProgressBarState = (newProgressBarState) => {
        this.setState({ progressBarClassName: newProgressBarState });
    }

    downloadEpisode = async () => {
        this.setState({ 
            showDownloadProgress: true, 
            downloadPercentage: 0,
            progressBarClassName: 'is-link'
        });
        const updateProgressBar = this.updateProgressBar;
        const setProgressBarState = this.setProgressBarState;

        new Downloader({ 
            url: new UrlHelpers().getCorsifiedUrl(this.state.audioUrl),
            filename: `${this.state.title}.mp3`,
            process: function(event){
                if (!event.lengthComputable) return; 
                updateProgressBar(Math.floor(event.loaded / event.total * 100));
            }
          })
          .then(function () {
            setProgressBarState('is-success');
          })
          .catch(function (error) {
            setProgressBarState('is-danger');
          });

    }

    render(){
        return(
            <div className="box">
                <p className="is-size-5">
                    <b>{this.state.title}</b>

                    <span className="icon pointer is-pulled-right is-size-5" onClick={() => this.downloadEpisode(this.state.uniqueId)}>
                        <i className="fas fa-download"></i>
                    </span>    
                </p>
                <p className={`${this.state.showDownloadProgress ? '' : 'is-hidden'}`}>
                    <progress className={"progress " + this.state.progressBarClassName} value={this.state.downloadPercentage} max="100">{this.state.downloadPercentage}%</progress>
                </p>
                <p>{this.state.pubDate}</p>
                <div className="podcast-episode-description" dangerouslySetInnerHTML={{ __html: this.state.description }}></div>
                <div>
                <audio controls className="audio-control" preload="none">
                    <source src={this.state.audioUrl} type='audio/mpeg' />
                </audio>
                </div>
            </div>
        );
    }
}


export default PodcastEpisode;
