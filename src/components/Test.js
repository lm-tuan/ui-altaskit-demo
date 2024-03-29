import * as React from 'react';
import { mockEndpoints, REQUEST_FAST } from './packages/navigation/atlassian-switcher/examples/helpers/mock-endpoints';
import { withAnalyticsLogger, withIntlProvider } from './packages/navigation/atlassian-switcher/examples/helpers';
import AtlassianSwitcher from '@atlaskit/atlassian-switcher';
import styled from 'styled-components';

const Container = styled.div`
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 8px;
  display: inline-block;
  margin: 5px;
  vertical-align: top;
`;
class InlineDialogSwitcherExample extends React.Component {
  state = {
    isLoaded: false,
  };

  componentDidMount() {
    this.loadData();
  }
  loadData = () => {
    mockEndpoints(
      'jira',
      originalMockData => {
        return {
          ...originalMockData,
          RECENT_CONTAINERS_DATA: {
            data: [],
          },
          CUSTOM_LINKS_DATA: {
            data: [],
          },
          XFLOW_SETTINGS: {},
        };
      },
      REQUEST_FAST,
    );
    this.setState({
      isLoaded: true,
    });
  };

  onTriggerXFlow = (productKey, sourceComponent) => {
    console.log(
      `Triggering xflow for => ${productKey} from ${sourceComponent}`,
    );
  };

  render() {
    return (
      this.state.isLoaded && (
        <Container>
          <AtlassianSwitcher
            product="trello"
            disableCustomLinks
            disableRecentContainers
            disableHeadings
            isDiscoverMoreForEveryoneEnabled
            cloudId="some-cloud-id"
            triggerXFlow={this.onTriggerXFlow}
            appearance="standalone"
          />
        </Container>
      )
    );
  }
}

export default withIntlProvider(
  withAnalyticsLogger(InlineDialogSwitcherExample),
);
