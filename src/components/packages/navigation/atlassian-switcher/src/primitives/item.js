import * as React from 'react';
import Item from '@atlaskit/item';
import { FadeIn } from './fade-in';

export default class SwitcherItem extends React.Component{
  render() {
    const { icon, description, ...rest } = this.props;
    return (
      <FadeIn>
        <Item elemBefore={icon} description={description} {...rest} />
      </FadeIn>
    );
  }
}

