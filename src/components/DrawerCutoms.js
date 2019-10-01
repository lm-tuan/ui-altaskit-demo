import { jsx } from '@emotion/core';
import React ,{ Component, SyntheticEvent,forwardRef,useState, useRef, useImperativeHandle   } from 'react';
import Drawer from '@atlaskit/drawer';


 const DrawerCutoms =forwardRef( (props,ref) => {
  
  const [isDrawerOpen, setisDrawerOpen] = useState(false);

  const openDrawer = () => setisDrawerOpen(true);
  useImperativeHandle(ref, () => ({

    DrawerCustomClick(prams) {
      setisDrawerOpen(prams)
    }

  }));

  const onClose = (...args) => {
    console.log('onClose', args);
    setisDrawerOpen(false)
  };

  const onCloseComplete = (...args) =>
    console.log('onCloseComplete', args);

    return (
      <div css={{ padding: '2rem' }}>
        <Drawer
          onClose={onClose}
          onCloseComplete={onCloseComplete}
          isOpen={isDrawerOpen}
          width="wide"
        >
          <code>Drawer contents</code>
        </Drawer>
      </div>
    );
  })

export default DrawerCutoms;