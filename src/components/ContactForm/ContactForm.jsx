import React, { Component } from 'react';

import {
  Form,
  FormDiv,
} from './ContactForm.styled';



export default class ContactForm extends Component {
    state = {
        name: '',
        number: '',
    };
    handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    this.props.onAddContact(name, number);
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormDiv>
          {' '}
          Name
          <input type="text" name="name" required value={this.state.name} onChange={this.handleChange}
          />
        </FormDiv>
        <FormDiv>
          {' '}
          Number
          <input type="tel" name="number" required value={this.state.number} onChange={this.handleChange}
          />
        </FormDiv>
        <button type="submit">Add contact</button>
      </Form>
    );
  }
}



