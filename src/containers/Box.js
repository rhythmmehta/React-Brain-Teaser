
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import ItemTypes from './ItemTypes';

let isHidden= false;

const style = {
  height: '6rem',
  width: '6rem',
  backgroundColor:'grey',
  color: 'black',
  padding: '1rem',
  textAlign: 'center',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  float: 'left',
  textDecoration: 'line-through'
};

const boxSource = {
    beginDrag(props) {
        return {
            name: props.name,
            truevalue: props.truevalue
        };
    },

    endDrag(props, monitor) {
        let dropResult = monitor.getDropResult();
        if (dropResult) {
            isHidden=true;
        }
        else{
            isHidden=false;
        }
    },
};

function collect(connect, monitor){
    return{
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

export class Box extends Component {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
    };

    render() {
        const { isDragging, connectDragSource, isReset, name } = this.props;

        if(isDragging) {
            isHidden = false
        }
        let opacity=isHidden ? 0 : 1;
        opacity =  isReset? 1 : opacity
        return (
            connectDragSource(
                <div style={{ ...style,opacity}} >{name}</div>
            )
        );
    }
}

export default DragSource(ItemTypes.BOX, boxSource, collect)(Box);
