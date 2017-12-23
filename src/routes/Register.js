import React, { Component } from 'react';
import { Button, Input, Container, Header } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: ''
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = () => {
    const { username, email, password } = this.state;
    const { mutate } = this.props;

    mutate({
      variables: { username, email, password }
    })
      .then(({ data }) => {
        console.log('got data', data);
      })
      .catch(error => {
        console.log('there was an error sending the query', error);
      });
  };

  render() {
    const { username, email, password } = this.state;

    return (
      <Container text>
        <Header as="h2">Register</Header>
        <Input
          name="username"
          placeholder="Username"
          value={username}
          onChange={this.onChange}
          fluid
        />
        <Input
          name="email"
          placeholder="Email"
          value={email}
          onChange={this.onChange}
          fluid
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={this.onChange}
          fluid
        />
        <Button onClick={this.onSubmit}>Submit</Button>
      </Container>
    );
  }
}

const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      id
    }
  }
`;

export default graphql(registerMutation)(Register);
