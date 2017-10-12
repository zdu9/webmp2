

import React, { Component } from 'react'
import * as axios from 'axios';
import PropTypes from 'prop-types'
// import { Button } from 'semantic-ui-react'
// import { Link } from 'react-router-dom'
import styles from './Detail.scss'


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'


const api = "https://api.themoviedb.org/3/movie/";
const URL = "?api_key=e7b459ccb253cab36bb660a78b72dd18&language=en-US";
const genmoviesURL= "https://api.themoviedb.org/3/discover/movie?api_key=e7b459ccb253cab36bb660a78b72dd18&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=4&with_genres= "

class Detail extends Component {

    constructor(props) {
        super(props);

        this.state = {

            videoid: this.props.match.params.movieid,
            genreid: this.props.match.params.genreid,

            movies:[],

            // idxprev: 9,
            // idxnext: 11,

            relaidx: this.props.match.params.movieid,

            poster_path: "1234",
            description:"notinitialized",
            title: "notinitialized",
            vote_average:0,
            release_date:"notinitialized",

        };

        this.getmovies(this.state.genreid);
        //console.log("gotmovies[]thistime");
        this.videoSearch(this.state.videoid);
       // console.log("movielist[]", this.state.poster_path);

        this.onPrev = this.onPrev.bind(this);
        this.onNext = this.onNext.bind(this);
    }

    videoSearch(videoid) {
        axios
            .get(
                api + videoid +URL
                //"https://api.themoviedb.org/3/movie/118340?api_key=e7b459ccb253cab36bb660a78b72dd18&language=en-US"
            )
            .then(response => {
                var result;
                var status;
                result= response.data;
                status= response.status;
                console.log ('status', response);
                if (status===404){
                    console.log ('notfound');
                }
                this.setState({

                    poster_path: result.poster_path,
                    description: result.overview,
                    title: result.title,
                    vote_average: result.vote_average,
                    release_date: result.release_date
                });
//console.log('state', result);
            })

            .catch( response => {

                this.setState({

                    poster_path: "1234",
                    description: "Not Found",
                    title: "Cannot find this movie",
                    vote_average: 0,
                    release_date: "Not Found"
                });

            });
    };

    getmovies(genreid) {
        //console.log('testiddddd',genreid);
        axios
            .get(
                genmoviesURL + genreid
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


            })


    };

    onPrev (){
        //console.log ('curidxthisonPrev', this.state.relaidx);


        //let prevobj= this.state.movies[idx-1];
        console.log('beforePrev',this.state.relaidx);
       this.state.relaidx--;

        console.log('afterPrev', this.state.relaidx);
        this.videoSearch(this.state.relaidx);
        //console.log ('curidxnextonPrev', this.state.relaidx);
    }

    onNext (){
        // let curidx;
        // if (this.state.movies !== null){
        //     curidx= this.getIndex();
        //     this.setState({
        //         relaidx: curidx
        //     });
        // }
        ///console.log ('curidxthisonNext', curidx);
        console.log('beforenext',this.state.relaidx);

       // let nextobj= this.state.movies[idx+1];

        this.state.relaidx ++;
        console.log('afternext', this.state.relaidx);
        this.videoSearch(this.state.relaidx);
        //console.log ('curidxnextonNExt', this.state.relaidx);

    }
    // getIndex(){
    //            //console.log ('movieslist', this.state.movies);
    //             for(let  i = 0; i < this.state.movies.length; i++) {
    //                 console.log ('tranverseid', this.state.movies[i].id);
    //                 console.log('curvideoid', this.state.videoid);
    //                 if(this.state.movies[i].id ==this.state.videoid) {
    //                     console.log ('matchedid', i);
    //                     return i;
    //                 }
    //             }
    //
    //
    //
    //     // this.setState({
    //     //     relaidx: curidx
    //     // });
    //    // console.log('rela', this.state.relaidx);
    // }



    render() {
       // this.getIndex();
       /// console.log('hitheeeeee', this.state.movies);

        return(
            <div className="detail">

              <div className="ui buttons">
                <button onClick={this.onPrev} className="ui button">Prev</button>
                <button onClick={this.onNext} className="ui button">Next</button>
              </div>
              <div >
                <ShowDetail poster={this.state.poster_path}
                            description={this.state.description}
                            title={this.state.title}
                            date={this.state.release_date}
                            rate={this.state.vote_average}
                />
              </div>
            </div>
        )
    }
}


const ShowDetail= props => {

    let  imageUrl = "http://image.tmdb.org/t/p/w150/"+ props.poster;

        // const imgurl= https://api.themoviedb.org/3/movie/{movie_id}/images?api_key=e7b459ccb253cab36bb660a78b72dd18

   // console.log('pathwhat', imageUrl);

    return (
        <div className="fade">

            <div className="ui centered card">
                <div className="image">
                    <img src={imageUrl}/>
                </div>
                <div className="content">
                    <a className="header">{props.title}</a>
                    <a className="header">Rate:{props.rate}</a>
                    <a className="header">{props.date}</a>
                    <p>{props.description} </p>
                </div>
            </div>
        </div>



    );



};
ShowDetail.propTypes = {
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description : PropTypes.string,
    poster : PropTypes.string
}
export default Detail;

