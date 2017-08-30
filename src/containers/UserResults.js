import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import Header from '../components/Header';


import * as resultActions from '../store/Results/actions';

export class UserResults extends Component {
    static propTypes = {
        resultActions: PropTypes.object.isRequired,
        results: PropTypes.object.isRequired
    };
    componentWillMount(){
        this.props.resultActions.getUsersResults();
    }
    render() {
        let res = this.props.results.result;
        let details;
        if(res){
             details = res.map((item,index)=>{
            return (<div key={index} className="Display-Results">
            <b>Email:</b>{item.email}
            <b>Result:</b>{item.result}
       </div>) });
   }
        return(
            <div id="container--Results">
                <Header/>
                <Link to='/'><button className="buttons">Back to Puzzle</button></Link>
            <h2>Check out other users results!</h2>
            {details}
            </div>
        )
    }

}

export default connect(
    state => ({
        results: state.results
    }),
    dispatch => ({
        resultActions: bindActionCreators(resultActions, dispatch),
    })
)(UserResults);


// <p><b>Apples:</b>{item.apples}</p>
// <p><b>Oranges:</b>{item.oranges}</p>
// <p><b>Mixed:</b>{item.mixed}</p>
