import React from 'react';


export default class Header extends React.Component {
    render() {
        return (
            <div className="App-header">
                <h1> Brain Teaser</h1>
                <h3 style={{fontStyle: 'italic'}}> Boxes of Fruit </h3>
                <img src={require('../apple.png')} alt="apple"/>
                <img src={require('../orange.png')} alt="orange"/>
            </div>
        )
    }
}
