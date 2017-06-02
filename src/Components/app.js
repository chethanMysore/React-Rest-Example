//React Dependencies
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//Components
import { DeviceList } from './DeviceList';
import { AddDevice } from './AddDevice';
import { Ads } from './Ads';
import { Filter } from './Filter';

//Reducers
import Reducer from '../Reducers';

//React-router for routing support
import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory'

//Main component - app root component
export class App extends Component {
    constructor(props) {
        super(props);
    }

    //Render method of App component
    render() {
        const navStyle = {
            backgroundColor: '#125ea5'
        }
        const searchStyle = {
            top: '10px'
        }
        const svgStyle = {
            
            stroke: '#125ea5',
            strokeWidth: '2',
            opacity: '0.5',
            
        }
        const svgOutline = {
            position: 'relative',
            left: '-30px'
        }

        return (
            <div>
                <nav className="navbar navbar-inverse bg-faded" style={navStyle}>
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>

                            </button>
                            <a className="navbar-brand" href="home">Device App</a>
                        </div>
                        <div className="collapse navbar-collapse" id="myNavbar">
                            <ul className="nav navbar-nav">
                                <li className="nav-item"><a className="nav-link" href="#devices">Devices</a></li>
                                <li className="nav-item"><a className="nav-link" href="#add">Add Device</a></li>

                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li className="nav-item" style={searchStyle}><input className="form-control mr-sm-2" type="search" placeholder="Search" /></li>
                                <li className="nav-item" style={searchStyle}><button className="btn btn-success my-2 my-sm-0" type="submit">Search</button></li>
                            </ul>
                        </div>

                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3">
                            <Filter />
                        </div>
                        <div className="col-sm-1">
                            <svg width="22" height="500" style={svgOutline}>
                                <rect x="0" y="20" width="1" height="500" style={svgStyle} />
                                Sorry, your browser does not support inline SVG.
                            </svg>
                        </div>
                        <div className="col-sm-7" id="view">
                            <Router history={hashHistory}>
                                <Route path="/devices" component={DeviceList} />

                                <Route path="/add" component={AddDevice} />
                            </Router>
                        </div>
                        <div className="col-sm-1">
                            <Ads />
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <svg width="1200" height="22" style={svgOutline}>
                                <rect x="0" y="20" width="1200" height="1" style={svgStyle} />
                                Sorry, your browser does not support inline SVG.
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

//Render method that collects the state info and renders the React virtual DOM
const render = () => {
    let deviceStore = Reducer.store.getState();
    let imageStore = Reducer.imageStore.getState();
    let filterStore = Reducer.filter.getState();

    ReactDOM.render(
        <App devStore={deviceStore} imgStore={imageStore} filter={filterStore} />,
        document.getElementById('root')
    );
}
//Subscriptions to stores
Reducer.store.subscribe(render);
Reducer.imageStore.subscribe(render);
Reducer.filter.subscribe(render);

//Invokes the above render method
render();