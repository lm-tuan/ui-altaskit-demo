import * as React from 'react';
import styled from 'styled-components';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import ChevronUpIcon from '@atlaskit/icon/glyph/chevron-up';
import { Toggle, ItemWrapper } from './themed-top-level-item';
import SwitcherThemedItem from './themed-item';
import SwitcherThemedChildItem from './themed-child-item';
import { gridSize } from '@atlaskit/theme';
import * as colors from '@atlaskit/theme/colors';
import Tooltip from '@atlaskit/tooltip';
import Avatar from './avatar';
import { FadeIn } from './fade-in';
import { SwitcherChildItem } from '../types';

import {
  createAndFireNavigationEvent,
  withAnalyticsEvents,
  UI_EVENT_TYPE,
  SWITCHER_CHILD_ITEM_SUBJECT,
  SWITCHER_ITEM_SUBJECT,
  SWITCHER_ITEM_EXPAND_SUBJECT,
  WithAnalyticsEventsProps,
} from '../utils/analytics';

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: 3px;
`;

const ChildItemsContainer = styled.div`
  margin: 2px 0;
  border-radius: 3px;
  background-color: ${colors.N20A};
`;

const gridSizeResult = gridSize();
const IconWrapper = styled.div`
  width: ${gridSizeResult * 4}px;
  height: ${gridSizeResult * 4}px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: -${gridSizeResult}px;
  margin-bottom: -1px;
`;


class SwitcherItemWithDropDown extends React.Component {
  state = {
    itemHovered: false,
    showChildItems: false,
  };

  render() {
    const {
      icon,
      description,
      childItems,
      childIcon,
      onItemClick,
      onChildItemClick,
      ...rest
    } = this.props;
    const { showChildItems, itemHovered } = this.state;
    const childItemsExist = childItems && childItems.length > 0;

    return (
      <FadeIn>
        <React.Fragment>
          <ItemContainer
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
          >
            <ItemWrapper isParentHovered={itemHovered}>
              <SwitcherThemedItem
                icon={icon}
                description={childItemsExist ? description : null}
                onClick={onItemClick}
                {...rest}
              />
            </ItemWrapper>
            {childItemsExist && this.renderToggle(showChildItems, itemHovered)}
          </ItemContainer>
          {showChildItems && childItems && (
            <ChildItemsContainer>
              {childItems.map(item => (
                <SwitcherThemedChildItem
                  icon={
                    <Avatar
                      avatarUrl={item.avatar}
                      fallbackComponent={childIcon}
                    />
                  }
                  href={item.href}
                  key={item.label}
                  onClick={onChildItemClick}
                  data-test-id="switcher-child-item"
                >
                  {item.label}
                </SwitcherThemedChildItem>
              ))}
            </ChildItemsContainer>
          )}
        </React.Fragment>
      </FadeIn>
    );
  }

   renderToggle(showChildItems ,isParentHovered) {
    const icon = (
      <IconWrapper>
        {showChildItems ? (
          <ChevronUpIcon label="Collapse" />
        ) : (
          <ChevronDownIcon label="Expand" />
        )}
      </IconWrapper>
    );

    const toggle = (
      <Toggle isParentHovered={isParentHovered}>
        <SwitcherThemedItem
          data-test-id="switcher-expand-toggle"
          onClick={this.toggleChildItemsVisibility}
          onKeyDown={(e) =>
            e.key === 'Enter' && this.toggleChildItemsVisibility()
          }
          children={undefined}
          icon={icon}
        />
      </Toggle>
    );

    return showChildItems ? (
      toggle
    ) : (
      <Tooltip
        content={this.props.tooltipContent}
        hideTooltipOnMouseDown
        position="top"
      >
        {toggle}
      </Tooltip>
    );
  }

   toggleChildItemsVisibility = (event) => {
    event && event.preventDefault();
    this.setState({
      showChildItems: !this.state.showChildItems,
    });

    if (!this.state.showChildItems) {
      this.props.onExpandClick && this.props.onExpandClick();
    }
  };

   setItemHovered = (value) => {
    this.setState({
      itemHovered: value,
    });
  };

   onMouseEnter = () => this.setItemHovered(true);
   onMouseLeave = () => this.setItemHovered(false);
}

const SwitcherItemWithDropDownWithEvents = withAnalyticsEvents({
  onChildItemClick: createAndFireNavigationEvent({
    eventType: UI_EVENT_TYPE,
    action: 'clicked',
    actionSubject: SWITCHER_CHILD_ITEM_SUBJECT,
  }),
  onExpandClick: createAndFireNavigationEvent({
    eventType: UI_EVENT_TYPE,
    action: 'clicked',
    actionSubject: SWITCHER_ITEM_EXPAND_SUBJECT,
  }),
  onItemClick: createAndFireNavigationEvent({
    eventType: UI_EVENT_TYPE,
    action: 'clicked',
    actionSubject: SWITCHER_ITEM_SUBJECT,
  }),
})(SwitcherItemWithDropDown);

export default SwitcherItemWithDropDownWithEvents;
