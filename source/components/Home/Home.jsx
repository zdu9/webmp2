

import React, { Component } from 'react'
import * as axios from 'axios';
import PropTypes from 'prop-types'
import 'semantic-ui-css/semantic.min.css';
// import { Button } from 'semantic-ui-react'
// import { Link } from 'react-router-dom'
//
 import styles from './Home.scss'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'
// const API_KEY = "e7b459ccb253cab36bb660a78b72dd18";
const apiURL = "https://api.themoviedb.org/3/search/movie?api_key=e7b459ccb253cab36bb660a78b72dd18&query=";



const VideoList = props => {
    const videoItems = props.videos.map(video => {
        if (video.poster_path!==null) {
            return (
                <VideoListItem
                    video={video}
                />
            );
        }
    });

    return (
        <ul className="ui items">
            {videoItems}
        </ul>
    );
};
VideoList.propTypes = {
    videos:      PropTypes.array

}


const VideoListItem = props => {
    const imageUrl = "http://image.tmdb.org/t/p/w150/"+ props.video.poster_path;

    return (
        <ul  className="ui items" id ="itemshow">
            <div className="item">
                <div className="image">

                        <Link to={`/detail/${ props.video.genre_ids[0] }/${ props.video.id }`} className="active">
                        <img src={imageUrl} />
                        </Link>
                </div>
                <div className="middle aligned content">
                    <a className="header">Title :{props.video.title}</a>
                    <br/>
                    <a className="header">Rate :{props.video.vote_average}</a>
                    <br/>
                    <a className="header">Popularity : {props.video.popularity}</a>
                    <br/>
                    <a className="header">ReleaseDate : {props.video.release_date}</a>
                </div>

            </div>
        </ul>
    );
};
VideoListItem.propTypes = {
    video:      PropTypes.object

}
class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null,
            term: "",
            rate: "1",
            asc:"1"

        };
        // this.sortOnAsc= this.sortOnAsc.bind(this);
        // this.sortOnDes = this.sortOnDes.bind(this);

        this.sortVideosAsc = this.sortVideosAsc.bind(this);
        this.sortVideosDes = this.sortVideosDes.bind(this);

        this.sortType = this.sortType.bind(this);


        this.videoSearch("and");
    }



    sortVideosAsc () {
        console.log ("clicked ASC");

        this.state.asc="1";
        console.log ("ascshouldbeone", this.state.asc);
      if (this.state.rate ==="1")   // sort on rate
      {
              this.setState(prevState =>{
                  this.state.videos.sort((a,b) => (a.vote_average - b.vote_average))
              });
          console.log ('ascrate');


      }
      else
      {
              this.setState(prevState => {
                  this.state.videos.sort((a, b) => (a.popularity - b.popularity))
              });
          console.log ('ascpop');

      }

    }
    sortVideosDes () {
        console.log ('clickedDes');
        this.state.asc="0";
        console.log ("asc should be 0", this.state.asc);
        if (this.state.rate ==="1")   // sort on rate
        {

                this.setState(prevState =>{
                    this.state.videos.sort((a,b) => (b.vote_average - a.vote_average))

                });
            console.log ('desrate');


        }
        else
        {

                this.setState(prevState => {
                    this.state.videos.sort((a, b) => (b.popularity - a.popularity))
                });
            console.log ('despop');

        }

    }

    sortType (event){
        let type= event.target.value;
        //let order= this.state.asc;

        this.setState({rate: event.target.value});



        if (this.state.asc==="1" && type==="1")  //ascrate
        {
            this.setState(prevState =>{
                this.state.videos.sort((a,b) => (a.vote_average - b.vote_average))
            });
            console.log ('ascrate');
        }
        if (this.state.asc==="1" && type==="0") //ascdate
        {
            console.log ('ascpop');
            this.setState(prevState => {
                this.state.videos.sort((a, b) => (a.popularity - b.popularity))
            });

        }
        if (this.state.asc==="0" && type==="1") //desrate
        {
            this.setState(prevState =>{
                this.state.videos.sort((a,b) => (b.vote_average - a.vote_average))

            });
            console.log('desrate');
        }
        if (this.state.asc==="0" && type ==="0") //desdate
        {
            this.setState(prevState => {
                this.state.videos.sort((a, b) => (b.popularity - a.popularity))
            });
            console.log ('despop');
        }
    }

    sortonSearch(){
        var asc= this.state.asc;
        var rate= this.state.rate;
        if (asc==="1" && rate==="1")  //ascrate
        {
            this.setState(prevState =>{
                this.state.videos.sort((a,b) => (a.vote_average - b.vote_average))
            });
            console.log ('ascrate');
        }
        if (asc==="1" && rate==="0") //ascdate
        {
            console.log ('ascpop');
            this.setState(prevState => {
                this.state.videos.sort((a, b) => (a.popularity - b.popularity))
            });

        }
        if (asc==="0" && rate==="1") //desrate
        {
            this.setState(prevState =>{
                this.state.videos.sort((a,b) => (b.vote_average - a.vote_average))

            });
            console.log('desrate');
        }
        if (asc==="0" && rate ==="0") //desdate
        {
            this.setState(prevState => {
                this.state.videos.sort((a, b) => (b.popularity - a.popularity))
            });
            console.log ('despop');
        }
    }
    videoSearch(term) {
        axios
            .get(
                apiURL +
                term
                // "&api-key=e7b459ccb253cab36bb660a78b72dd18"
                // this.state.apiKey
            )
            .then(response => {
               var results;

                results= response.data.results;
                  this.setState({
                      videos: results,
                  });
                 this.sortonSearch();
                //console.log('state', this.state.selectedVideo);
            });
    };

    onInputChange(term) {
        this.setState({ term });
        //this.props.onSearchTermChange(term);
        this.videoSearch(term);
    }
    render() {

        return(
            <div  className="Home">
                <div>
                    <div className="title">
                        <h1>TMDB MOVIE SEARCH</h1>
                        <p> </p>
                    </div>
                    <div className="ui input focus">
                        <input type="text" placeholder="Search..."
                               value={this.state.term}
                               onChange={event => this.onInputChange(event.target.value)}
                        />

                    </div>
                    <select onChange= {this.sortType} className="ui dropdown">
                        <option value= "">SortBy</option>
                        <option  value= "1">Rate</option>
                        <option  value= "0">Popularity</option>
                    </select>

                    <div className="ui form">
                        <div className="inline fields">
                            <div className="field">
                                <div className="ui radio checkbox">
                                    <input onClick={this.sortVideosAsc} type="radio" name="frequency"  />
                                    <label >Ascending</label>
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui radio checkbox">
                                    <input onClick={this.sortVideosDes} type="radio" name="frequency" />
                                    <label >Descending</label>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                <VideoList

                    videos={this.state.videos}
                />
            </div>
        )
    }
}
export default Home




