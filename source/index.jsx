import React from 'react';
import {render} from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import {
    HashRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'
// Include your new Components here
// import Home from './components/Home/Home.jsx';
import Home from './components/Home/Home.jsx';
import Detail from './components/Home/Detail.jsx';
import Gallery from './components/Home/Gallery.jsx';
// Include any new stylesheets here
// Note that components' stylesheets should NOT be included here.
// They should be 'require'd in their component class file.


// const ModalGallery = () => (
// //     <Router>
// //         <Route component={ModalSwitch} />
// //     </Router>
// // )


// const Home = () => (
//     <div>
//         <h1>Welcome to the Tornadoes Website!</h1>
//     </div>
// )

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/gallery/' component={Gallery}/>
            <Route path="/detail/:genreid/:movieid" component ={Detail} />
        </Switch>
    </main>
)

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
    <header>
        <nav>
            <ul>
              <li>  <Link to='/'>
                    <h3>List</h3>
                </Link>
              </li>
              <li>
                <Link to='/gallery'>
                   <h3>Gallery</h3>
                </Link>
              </li>
            </ul>
            <p> </p>
        </nav>
    </header>
)

const App = () => (
    <div>
        <Header />
        <Main />


    </div>
)
render(
    // Define your router and replace <Home /> with it!
    ( <Router>
            <App />
    </Router>
    ), document.getElementById('app')
);
