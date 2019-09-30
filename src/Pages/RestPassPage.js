// @flow
import React, { Component, Fragment } from "react";
import Button from "@atlaskit/button";
import TextField from "@atlaskit/textfield";
import Form, {
  FormHeader,
  Field,
  ErrorMessage,
  FormFooter,
  HelperMessage
} from "@atlaskit/form";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const RestPassUers = async data => {
  await sleep(500);
  const errors = {
    email: !data.email.includes("@")
      ? "Your email is not valid, please try again"
      : undefined
  };
  if (errors.email) {
    console.log(data);
  }
  return errors;
};

export default class extends Component {
  handleSubmit = data => {
      console.log(data)
    return RestPassUers(data);
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          width: "400px",
          maxWidth: "100%",
          margin: "0 auto",
          flexDirection: "column"
        }}
      >
        <Form onSubmit={this.handleSubmit}>
          {({ formProps, submitting }) => (
            <form {...formProps}>
            <FormHeader title="Rest Password" />
              <Field name="email" label="Email" defaultValue="" isRequired>
                {({ fieldProps, error }) => (
                  <Fragment>
                    <TextField {...fieldProps} />
                    {!error && (
                      <HelperMessage>Must contain @ symbol</HelperMessage>
                    )}
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                  </Fragment>
                )}
              </Field>
              <FormFooter>
                <Button
                  appearance="primary"
                  type="submit"
                  isLoading={submitting}
                >
                  Next
                </Button>
              </FormFooter>
            </form>
          )}
        </Form>
      </div>
    );
  }
}
