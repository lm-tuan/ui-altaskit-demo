import { jsx } from '@emotion/core';
import React ,{ Component, SyntheticEvent } from 'react';
import Button from '@atlaskit/button';
import Drawer from '@atlaskit/drawer';

 class DrawerCutoms extends Component {
    constructor(props){
        super(props);
        this.state = {
            isDrawerOpen: false,
          };  
    }
 
  openDrawer = () =>
    this.setState({
      isDrawerOpen: this.props.isDrawerOpen
    });

  onClose = (...args) => {
    console.log('onClose', args);
    this.setState({
      isDrawerOpen: false,
    });
  };

  onCloseComplete = (...args) =>
    console.log('onCloseComplete', args);

  render() {
      console.log(this.props.isDrawerOpen);
    return (
      <div css={{ padding: '2rem' }}>
        <Drawer
          onClose={this.onClose}
          onCloseComplete={this.onCloseComplete}
          isOpen={this.state.isDrawerOpen}
          width="wide"
        >
          <code>Drawer contents</code>
        </Drawer>
      </div>
    );
  }
}

export default DrawerCutoms;