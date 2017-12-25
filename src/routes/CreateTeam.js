import React from 'react';
import {
  Message,
  Form,
  Button,
  Input,
  Container,
  Header
} from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class CreateTeam extends React.Component {
  state = {
    name: '',
    errors: {}
  };

  async onSubmit() {
    const { name } = this.state;

    let response = null;
    try {
      response = await this.props.mutate({
        variables: { name }
      });
    } catch (error) {
      this.props.history.push('/login');
      return;
    }

    console.log(response);

    const { ok, errors } = response.data.createTeam;

    if (ok) {
      this.props.history.push('/');
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });

      this.setState({ errors: err });
    }
  }

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { name, errors: { nameError } } = this.state;

    const errorList = [];

    if (nameError) {
      errorList.push(nameError);
    }

    return (
      <Container text>
        <Header as="h2">Create a team</Header>
        <Form>
          <Form.Field error={!!nameError}>
            <Input
              name="name"
              onChange={this.onChange}
              value={name}
              placeholder="Name"
              fluid
            />
          </Form.Field>
          <Button onClick={() => this.onSubmit()}>Submit</Button>
        </Form>
        {errorList.length ? (
          <Message
            error
            header="There was some errors with your submission"
            list={errorList}
          />
        ) : null}
      </Container>
    );
  }
}

const createTeamMutation = gql`
  mutation($name: String!) {
    createTeam(name: $name) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(createTeamMutation)(CreateTeam);
