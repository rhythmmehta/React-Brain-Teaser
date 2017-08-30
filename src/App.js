import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Puzzle from './containers/Puzzle';
import Problem from './components/Problem';
import Solution from './components/Solution';
import Toaster from './components/Toaster';

class App extends Component {
    render(){
        let toaster;
        if ( this.props.toaster.visible ) {
            toaster = <Toaster message={ this.props.toaster.message }/>
        }
        return (
            <div className="App">
                <div className="App-header">
                    <h1> Brain Teaser</h1>
                    <h3 style={{fontStyle: 'italic'}}> Boxes of Fruit </h3>
                    <img src={require('../public/apple.png')} alt="apple"/>
                    <img src={require('../public/orange.png')} alt="orange"/>
                </div>
                <Problem/><br/>
                <Solution/><br/>
                {toaster}
                <Puzzle/>
            </div>
        );
    }
}

export default connect(
    state => ( {
        'toaster': state.toaster
    } )
)( App );
