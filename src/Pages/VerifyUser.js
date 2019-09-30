import React, { Component, Fragment } from 'react';
import Button from '@atlaskit/button';
import TextField from '@atlaskit/textfield';
import Form, {
  Field,
  FormFooter,
  ErrorMessage,
  HelperMessage,
  ValidMessage,
  FormHeader
} from '@atlaskit/form';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export default class extends Component {
  getUser = async (value) => {
    await sleep(300);
    if (['jsmith', 'mchan'].includes(value)) {
      return 'IN_USE';
    }
    return undefined;
  };

  validate = (value) => {
    if (value.length < 5) {
      return 'TOO_SHORT';
    }
    return this.getUser(value);
  };

  handleSubmit = (data) => {
    console.log(data);
  };

  render() {
    return (
      <div
        style={{
          display: 'flex',
          width: '400px',
          maxWidth: '100%',
          margin: '0 auto',
          flexDirection: 'column',
        }}
      >
        <Form onSubmit={this.handleSubmit}>
          {({ formProps }) => (
            <form {...formProps}>
              <FormHeader title=" Verify account "/>
              <Field
                name="codeverify"
                label="Code Verify"
                defaultValue=""
                isRequired
                validate={this.validate}
              >
                {({ fieldProps, error, valid }) => (
                  <Fragment>
                    <TextField {...fieldProps} />
                    {!error && !valid && (
                      <HelperMessage>
                        Should be more than 4 characters
                      </HelperMessage>
                    )}
                    {!error && valid && (
                      <ValidMessage>
                        Nice one, this code is available
                      </ValidMessage>
                    )}
                    {error === 'TOO_SHORT' && (
                      <ErrorMessage>
                        Invalid code , needs to be more than 4 characters
                      </ErrorMessage>
                    )}
                    {error === 'IN_USE' && (
                      <ErrorMessage>
                        Username already taken, try another one
                      </ErrorMessage>
                    )}
                  </Fragment>
                )}
              </Field>
              <FormFooter>
                <Button appearance="primary" type="submit">Next</Button>
              </FormFooter>
            </form>
          )}
        </Form>
      </div>
    );
  }
}