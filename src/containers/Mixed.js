import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';


const style = {
  height: '6rem',
  width: '6rem',
  color: 'black',
  border: '1px dashed gray',
  padding: '1rem',
  lineHeight: 'normal',
  float: 'left',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
};
let item={};

const boxTarget = {
  drop(props, monitor) {
      item = monitor.getItem();
      console.log('Item details:', item)
      return{
          name: 'Mixed'
      }
  }
};

function collect(connect, monitor){
    return{
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    };
}

export class Mixed extends Component {
    static propTypes = {
        connectDropTarget: PropTypes.func.isRequired,
        isOver: PropTypes.bool.isRequired,
        canDrop: PropTypes.bool.isRequired
    };

    componentDidUpdate() {
        if(item.name) {
            this.props.handleChange("mixedans", item.truevalue)
        }
        if (this.props.isOver) {
          this.props.updateReset();
        }
    }

    render() {
        const { canDrop, isOver,connectDropTarget, isReset } = this.props;
        const isActive = canDrop && isOver;

        item.name = isReset ? '' : item.name;

        let backgroundColor = 'white';
        if (isActive) {
            backgroundColor = 'darkgreen';
        } else if (canDrop) {
            backgroundColor = 'darkkhaki';
        }

        return connectDropTarget(
            <div style={{ ...style, backgroundColor}}>
                { item.name &&
                    <div style={{textAlign: 'center'}}>{item.name}</div>
                }
            </div>
        );
    }
}

export default DropTarget(ItemTypes.BOX, boxTarget, collect)(Mixed);
