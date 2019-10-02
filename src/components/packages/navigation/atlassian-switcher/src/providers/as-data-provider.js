import * as React from 'react';
import { NAVIGATION_CHANNEL, OPERATIONAL_EVENT_TYPE, withAnalyticsEvents, } from '../utils/analytics';
import { errorToReason } from '../utils/error-to-reason';
const DATA_PROVIDER_SUBJECT = 'atlassianSwitcherDataProvider';
export var Status;
(function (Status) {
    Status["LOADING"] = "loading";
    Status["COMPLETE"] = "complete";
    Status["ERROR"] = "error";
})(Status || (Status = {}));
export const isComplete = (result) => result.status === Status.COMPLETE;
export const isError = (result) => result.status === Status.ERROR;
export const isLoading = (result) => result.status === Status.LOADING;
export const hasLoaded = (result) => result.status !== Status.LOADING;
export default function (name, mapPropsToPromise, mapPropsToInitialValue) {
    const getInitialState = (props) => {
        if (mapPropsToInitialValue) {
            const initialValue = mapPropsToInitialValue(props);
            if (initialValue !== undefined) {
                return {
                    status: Status.COMPLETE,
                    data: initialValue,
                };
            }
        }
        return {
            status: Status.LOADING,
            data: null,
        };
    };
    class DataProvider extends React.Component {
        constructor() {
            super(...arguments);
            this.acceptResults = true;
            this.state = getInitialState(this.props);
            this.fireOperationalEvent = (payload) => {
                if (this.props.createAnalyticsEvent) {
                    this.props
                        .createAnalyticsEvent(Object.assign(Object.assign({ eventType: OPERATIONAL_EVENT_TYPE, actionSubject: DATA_PROVIDER_SUBJECT }, payload), { attributes: Object.assign(Object.assign({}, payload.attributes), { outdated: !this.acceptResults }) }))
                        .fire(NAVIGATION_CHANNEL);
                }
            };
        }
        componentWillUnmount() {
            /**
             * Promise resolved after component is unmounted to be ignored
             */
            this.acceptResults = false;
        }
        componentDidMount() {
            mapPropsToPromise(this.props)
                .then(result => {
                this.onResult(result);
            })
                .catch(error => {
                this.onError(error);
            });
        }
        onResult(value) {
            if (this.acceptResults) {
                this.setState({
                    data: value,
                    status: Status.COMPLETE,
                });
            }
            this.fireOperationalEvent({
                action: 'receivedResult',
                actionSubjectId: name,
            });
        }
        onError(error) {
            /**
             * Do not transition from "complete" state to "error"
             */
            if (this.acceptResults && !isComplete(this.state)) {
                this.setState({
                    error,
                    status: Status.ERROR,
                    data: null,
                });
            }
            this.fireOperationalEvent({
                action: 'failed',
                actionSubjectId: name,
                reason: errorToReason(error),
            });
        }
        render() {
            return this.props.children(this.state);
        }
    }
    DataProvider.displayName = `DataProvider(${name})`;
    return withAnalyticsEvents()(DataProvider);
}
