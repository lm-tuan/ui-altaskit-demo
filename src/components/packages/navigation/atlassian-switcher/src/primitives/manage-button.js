import * as React from 'react';
import FormattedMessage from './formatted-message';
import messages from '../utils/messages';
import Button from '@atlaskit/button';
import { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import { NAVIGATION_CHANNEL, UI_EVENT_TYPE } from '../utils/analytics';

export default class ManageButton extends React.Component {
    constructor() {
        super(...arguments);
        this.onClick = (_, analyticsEvent) => {
            analyticsEvent
                .update({
                eventType: UI_EVENT_TYPE,
                actionSubjectId: 'manageListButton',
            })
                .fire(NAVIGATION_CHANNEL);
        };
    }
    render() {
        const { href } = this.props;
        return (
          <Button href={href} onClick={this.onClick}>
            <FormattedMessage {...messages.manageList} />
          </Button>
        );
    }
}
