import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Oranges from './Oranges';
import Apples from './Apples';
import Mixed from './Mixed';
import Box from './Box';
import {init as firebaseInit} from '../firebaseConfig'

import * as toasterActions from '../store/Toaster/actions';
import * as dataActions from '../store/Database/actions';

class Puzzle extends React.Component{
    static propTypes = {
    toasterActions: PropTypes.object.isRequired,
    dataActions: PropTypes.object.isRequired
    };
    constructor(props){
        super(props);
        firebaseInit();
        this.state = {
            name:null,
            trueValue: null,
            isClicked: false,
            applesans:null,
            orangesans: null,
            mixedans: null,
            email: null,
            results:null,
            random: null,
            isReset: false,
            errors: {
                email: null,
                applesans: null,
                orangesans: null,
                mixedans: null
            }
        }
        this.handleEmail=this.handleEmail.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset= this.handleReset.bind(this);
        this.updateReset = this.updateReset.bind(this);
    }

    handleEmail(evt) {
        let value = evt.target.value;
        this.setState({
            email: value
        });
    }

    validate() {
        let { errors, email, applesans, orangesans, mixedans } = this.state;
        errors.email = email ? null :'* Email is required';
        errors.applesans = applesans ? null :'* Nothing dragged into Apples PlaceHolder';
        errors.orangesans = orangesans ? null :'* Nothing dragged into Oranges PlaceHolder';
        errors.mixedans = mixedans ? null :'* Nothing dragged into Mixed PlaceHolder';
        this.setState({
            'errors': errors
        });
    }
    allNull(obj) {
        for (let i in obj) {
            if (obj[i]) return false;
        }
        return true;
    }
    handleChange(answername, answervalue) {
        this.setState({
            [answername]: answervalue
        })
    }

    handleClick(evt, name, value){
        if(!this.state.isClicked) {
            this.setState({
                name: name,
                trueValue: value,
                isClicked: true,
                random: Math.round(Math.random())
            })
        }
        else {
            this.props.toasterActions.show('You can only select one box');
        }
    }

    handleSubmit(){
        let errors=this.state.errors;
        this.validate()
        if(this.allNull(errors)){
            console.log(this.state.applesans,this.state.orangesans,this.state.mixedans);

            if(this.state.applesans==="Apples" && this.state.orangesans==="Oranges" && this.state.mixedans==="Mixed")
            {
                this.props.toasterActions.show('You  are right!');
                this.setState({results:'Right'})
                this.props.dataActions.storeResults(this.state.email,this.state.applesans,this.state.orangesans,this.state.mixedans,'Right');
            }
            else
            {
                this.props.toasterActions.show('You  are wrong!');
                this.setState({results:'Wrong'})
                this.props.dataActions.storeResults(this.state.email,this.state.applesans,this.state.orangesans,this.state.mixedans,'Wrong');
            }

        }
        else{
            this.props.toasterActions.show('Unable to submit. Check for required fields.');
        }
    }

    handleReset(){
        this.setState({
            isReset: true
        })
    }

    updateReset() {
        this.setState({
            isReset: false
        })
    }

    render(){
        let clicked=this.state.isClicked;
        let errors=this.state.errors;
        return <div>
            <div id="step1" className="view">
              <b>
                <i>STEP 1: </i>
              </b> Save your answer using your email address.<br />
              <br />
              <label htmlFor="email">Email Address: </label>
              <br />
              <br />
              <input type="email" name="email" onChange={this.handleEmail} />
              {errors.email ? <div className="errors">
                    {errors.email}
                  </div> : null}
            </div>
            <br />

            <DragDropContextProvider backend={HTML5Backend}>
              <div>
                <div id="step2" className="view">
                  <b>
                    <i>STEP 2: </i>
                  </b>
                  Select a box to reveal a fruit by clicking on one of the boxes below. Note, you only get one choice.<br />
                  <br />
                  <div className="FruitBoxes" style={{ overflow: 'hidden', clear: 'both' }}>
                    <div onClick={evt => this.handleClick(evt, 'Apples', 'Oranges')}>
                      <Box name="Apples" truevalue="Oranges" isReset={this.state.isReset} />
                    </div>
                    <div onClick={evt => this.handleClick(evt, 'Oranges', 'Mixed')}>
                      <Box name="Oranges" truevalue="Mixed" isReset={this.state.isReset} />
                    </div>
                    <div onClick={evt => this.handleClick(evt, 'Mixed', 'Apples')}>
                      <Box name="Mixed" truevalue="Apples" isReset={this.state.isReset} />
                    </div>
                  </div>
                  {clicked ? <div>
                        {this.state.trueValue === 'Mixed' && <div>
                            {this.state.random === 1 ? <div className="Output">
                                  {' '}YOU SELECTED THE BOX LABELLED <br />"{this.state.name}".
                                  <br />
                                  <br />FRUIT REVEALED:<br /> <br /> "Orange"<img src={require('../orange.png')} alt=""/>
                                </div> : <div className="Output">
                                  {' '}YOU SELECTED THE BOX LABELLED <br />"{this.state.name}".
                                  <br />
                                  <br />FRUIT REVEALED:<br /> <br /> "Apple"<img src={require('../apple.png')} alt=""/>
                                </div>}
                          </div>}
                        {this.state.trueValue === 'Oranges' && <div className="Output">
                            {' '}YOU SELECTED THE BOX LABELLED <br />"{this.state.name}".
                            <br />
                            <br />FRUIT REVEALED:<br /> <br />"{this.state.trueValue}"<img src={require('../orange.png')} alt=""/>
                          </div>}
                        {this.state.trueValue === 'Apples' && <div className="Output">
                            {' '}YOU SELECTED THE BOX LABELLED <br />"{this.state.name}".
                            <br />
                            <br />FRUIT REVEALED:<br /> <br />"{this.state.trueValue}"<img src={require('../public/apple.png')} alt=""/>
                          </div>}
                      </div> : null}
                </div>
                <br />

                <div id="step3" className="view">
                  <b>
                    <i>STEP 3: </i>
                  </b>
                  Now drag the above fruit boxes to the dotted square below with the correct label. Once complete, hit the submit answer button below to get
                  <div className="PlaceHolders" style={{ overflow: 'hidden', clear: 'both' }}>
                    <div className="DropTargets">
                      <Apples handleChange={this.handleChange} isReset={this.state.isReset} updateReset={this.updateReset} />
                      <Oranges handleChange={this.handleChange} isReset={this.state.isReset} updateReset={this.updateReset} />
                      <Mixed handleChange={this.handleChange} isReset={this.state.isReset} updateReset={this.updateReset} />
                    </div>

                    <div className="DropLabels">
                      <div>Apples</div>
                      <div>Oranges</div>
                      <div>Mixed</div>
                    </div>
                    {errors.applesans ? <div className="errors">
                          {errors.applesans}
                        </div> : null}
                    {errors.orangesans ? <div className="errors">
                          {errors.orangesans}
                        </div> : null}
                    {errors.mixedans ? <div className="errors">
                          {errors.mixedans}
                        </div> : null}
                  </div><br/>
              Think you made the wrong drop? Reset the boxes and drag again!
                  <button onClick={this.handleReset}>RESET</button>
                </div>
                <br />
              </div>
            </DragDropContextProvider>
            <button id="SubmitButton" name="submit" onClick={this.handleSubmit}>
              SUBMIT ANSWER
            </button>
          </div>;
    }
}

export default connect(
    state=>({

    }),
    dispatch => ({
        toasterActions: bindActionCreators(toasterActions, dispatch),
        dataActions:  bindActionCreators(dataActions, dispatch)
    })
)(Puzzle);
