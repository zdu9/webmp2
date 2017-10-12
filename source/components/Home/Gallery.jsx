

import React, { Component } from 'react'
import * as axios from 'axios';
import PropTypes from 'prop-types'

import 'semantic-ui-css/semantic.min.css';
 import { Link } from 'react-router-dom'
//
 import styles from './Gallery.scss'


// const API_KEY = "e7b459ccb253cab36bb660a78b72dd18";
const apiURL = "https://api.themoviedb.org/3/search/movie?api_key=e7b459ccb253cab36bb660a78b72dd18&language=en-US&include_adult=false&query=";
const genreURL="https://api.themoviedb.org/3/genre/movie/list?api_key=e7b459ccb253cab36bb660a78b72dd18";
const genmoviesURL= "https://api.themoviedb.org/3/discover/movie?api_key=e7b459ccb253cab36bb660a78b72dd18&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=4&with_genres= "

const VideoList = props => {
    const videoItems = props.videos.map(video => {
        if (video.poster_path!==null) {
            return (
                <VideoListItem id="oneitem"
                    video={video}
                />
            );
        }
    });

    return (
        <ul className="ui grid container">
            {videoItems}
        </ul>
    );
};
VideoList.propTypes = {
    videos:      PropTypes.array,

}
const VideoListItem = ({ video }) => {
    const imageUrl = "http://image.tmdb.org/t/p/w150/"+ video.poster_path;
    //console.log ('moviedetail', video);
    // const imgurl= https://api.themoviedb.org/3/movie/{movie_id}/images?api_key=e7b459ccb253cab36bb660a78b72dd18
    return (
        <ul  >
            <div className="four wide column" >
                <div className="ui segment" >

                    <Link to={`/detail/${ video.genre_ids[0] }/${ video.id }`} className="active">
                        <img src={imageUrl} id="oneitem"/>
                    </Link>
                </div>
                {/*<div className="ui segment">*/}
                    {/*<div >{video.title}</div>*/}
                {/*</div>*/}
            </div>
        </ul>
    );
 };
VideoListItem.propTypes = {
    video:      PropTypes.object

}
class Gallery extends Component {

    constructor(props) {
        super(props);

        this.state = {


            genres: [{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}],
            movies: [],
            selectedGenre:null,
            //genreids: [],
            selectedVideo: null


        };
       // this.videoSearch= this.videoSearch.bind(this);
         this.inivideo();
    }

    inivideo(){

        axios
            .get(
                genmoviesURL + 99
                //+ this.state.genreid
                // "&api-key=e7b459ccb253cab36bb660a78b72dd18"
                // this.state.apiKey
            )
            .then(response => {
                var results;

                results= response.data.results;
                this.setState({
                    movies: results,
                });


            });

};
    videoSearch(event,id) {
        console.log('testiddddd',id);
        axios
            .get(
                genmoviesURL + id
                //+ this.state.genreid
                // "&api-key=e7b459ccb253cab36bb660a78b72dd18"
                // this.state.apiKey
            )
            .then(response => {
                var results;

                results= response.data.results;
                this.setState({
                    movies: results,
                    //selectedVideo: results[0],
                   // selectedGenre: this.props.genreobj.name
                });
                //  console.log('selected', this.state.movies[0]);

            });
    };

    render() {

      //  this.genreSearch();

        return(
            <div className = "fade">
                <div className="ui grid" id="itembar">
                    <button onClick={(e) => this.videoSearch(e, this.state.genres[2].id)}  className="two wide column">
                        <div className="ui segment">
                            {this.state.genres[0].name}
                        </div>
                    </button>
                    <button onClick={(e) => this.videoSearch(e, this.state.genres[1].id)} className="two wide column">
                        <div className="ui segment">
                            {this.state.genres[1].name}
                        </div>
                    </button>
                    <button onClick={(e) => this.videoSearch(e, this.state.genres[0].id)} className="two wide column">
                        <div className="ui segment">
                            {this.state.genres[2].name}
                        </div>
                    </button>

                    <button onClick={(e) => this.videoSearch(e, this.state.genres[3].id)} className="two wide column">
                        <div className="ui segment">
                            {this.state.genres[3].name}
                        </div>
                    </button>

                    <button onClick={(e) => this.videoSearch(e, this.state.genres[4].id)} className="two wide column">
                        <div className="ui segment">
                            {this.state.genres[4].name}
                        </div>
                    </button>

                    <button onClick={(e) => this.videoSearch(e, this.state.genres[5].id)} className="two wide column">
                        <div className="ui segment">
                            {this.state.genres[5].name}
                        </div>
                    </button>

                    <button onClick={(e) => this.videoSearch(e, this.state.genres[6].id)} className="two wide column">
                        <div className="ui segment">
                            {this.state.genres[6].name}
                        </div>
                    </button>

                    <button onClick={(e) => this.videoSearch(e, this.state.genres[7].id)} className="two wide column">
                        <div className="ui segment">
                            {this.state.genres[7].name}
                        </div>
                    </button>

                    <button onClick={(e) => this.videoSearch(e, this.state.genres[8].id)} className="two wide column">
                        <div className="ui segment">
                            {this.state.genres[8].name}
                        </div>
                    </button>
                    <button onClick={(e) => this.videoSearch(e, this.state.genres[9].id)} className="two wide column">
                        <div className="ui segment">
                            {this.state.genres[9].name}
                        </div>
                    </button>

                    <button onClick={(e) => this.videoSearch(e, this.state.genres[11].id)} className="two wide column">
                        <div className="ui segment">
                            {this.state.genres[11].name}
                        </div>
                    </button>

                    <button onClick={(e) => this.videoSearch(e, this.state.genres[12].id)} className="two wide column">
                        <div className="ui segment">
                            {this.state.genres[12].name}
                        </div>
                    </button>

                    <button onClick={(e) => this.videoSearch(e, this.state.genres[13].id)} className="two wide column">
                        <div className="ui segment">
                            {this.state.genres[13].name}
                        </div>
                    </button>

                    <button onClick={(e) => this.videoSearch(e, this.state.genres[14].id)} className="two wide column">
                        <div className="ui segment">
                            {this.state.genres[14].name}
                        </div>
                    </button>

                    <button onClick={(e) => this.videoSearch(e, this.state.genres[15].id)} className="two wide column">
                        <div className="ui segment">
                            {this.state.genres[15].name}
                        </div>
                    </button>

                    <button onClick={(e) => this.videoSearch(e, this.state.genres[16].id)} className="two wide column">
                        <div className="ui segment">
                            {this.state.genres[16].name}
                        </div>
                    </button>

                </div>

                <p> </p>
                <p> </p>

                <VideoList

                    videos={this.state.movies}
                />
            </div>

        )

    }
}

export default Gallery
