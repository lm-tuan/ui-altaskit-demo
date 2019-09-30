import React from 'react';
import DropdownMenu, { DropdownItemGroup, DropdownItem } from '@atlaskit/dropdown-menu';

export default () => (
  <div style={{ margin: '20px' }}>
    <DropdownMenu
      trigger="Choices"
      triggerType="button"
      onOpenChange={e => console.log('dropdown opened', e.event)}
    >
      <DropdownItemGroup>
        <DropdownItem>Sydney</DropdownItem>
        <DropdownItem>Melbourne</DropdownItem>
      </DropdownItemGroup>
    </DropdownMenu>
  </div>
);