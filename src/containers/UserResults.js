import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import Header from '../components/Header';


import * as resultActions from '../store/Results/actions';

export class UserResults extends Component {
    static propTypes = {
        resultActions: PropTypes.object.isRequired
    };

    render() {
        let res = this.props.search.result;
        let details;
        if(res){
             details = res.map((item,index)=>{
            return (<div key={index} className="Display-Results">
            <p><b>Email:</b>{item.email}</p>
       <p><b>Result:</b>{item.result}</p>
       </div>) });
   }
        return(
            <div id="container--Results">
                <Header/>
                <Link to='/'>Back to Puzzle</Link>
                { res.length> 0 ? (<div className="res"><h2>Check out other users results!</h2></div>) : <div className="res">No other results found.</div>}
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
