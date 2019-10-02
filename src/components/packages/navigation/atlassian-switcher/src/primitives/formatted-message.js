import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export default (props) => (
  <FormattedMessage {...props}>
    {translatedString => translatedString}
  </FormattedMessage>
);
