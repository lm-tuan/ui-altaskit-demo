import React,{  useRef,  } from 'react';
import EmojiAtlassianIcon from '@atlaskit/icon/glyph/emoji/atlassian';
import {
  GlobalItem,
  LayoutManager,
  NavigationProvider,
} from '@atlaskit/navigation-next';
import AppSwitcherIcon from '@atlaskit/icon/glyph/menu';

import GlobalNavigation from '@atlaskit/global-navigation';
import DrawerCutoms from './../DrawerCutoms';

const AppSwitcherComponent = (props) => {
  const childRef = useRef();
  return (
  <div>
     <DrawerCutoms ref={childRef} />
    <GlobalItem
    {...props}
    icon={AppSwitcherIcon}
    id="test"
    onClick={() => childRef.current.DrawerCustomClick(true)}
    
  />
  </div>
  
); } 

const SearchTooltip = () => (
  <div css={{ background: 'red' }}> Search Tooltip</div>
);


const onCreateClick = () => {
  console.log('create clicked')
}

const Global = ()  =>  { 
  return (

      <GlobalNavigation
        productIcon={EmojiAtlassianIcon}
        productHref="#"
        searchTooltip={<SearchTooltip />}
        searchLabel="Search Label"
        onProductClick={() => console.log('product clicked')}
        onCreateClick={onCreateClick}
        onSearchClick={() => console.log('search clicked')}
        onStarredClick={() => console.log('starred clicked')}
        onHelpClick={() => console.log('help clicked')}
        helpItems={() => <div />}
        onNotificationClick={() => console.log('notification clicked')}
        appSwitcherComponent={AppSwitcherComponent}
        appSwitcherTooltip="Switch to ..."
        onSettingsClick={() => console.log('settings clicked')}
        loginHref="#login"
    />  
);
  
} 

const NavigationCustom =  () => {
  return (
    <NavigationProvider>
      <LayoutManager
        globalNavigation={Global}
        productNavigation={() => null}
        containerNavigation={() => null}
      >
        <div css={{ padding: '32px 40px' }}>Page content</div>
      </LayoutManager>
    </NavigationProvider>
  );
} 

export default NavigationCustom;