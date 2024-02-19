import { Component } from 'react';

import { nanoid } from 'nanoid'
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList'



export class App extends Component {

  state = {
    contacts: [{ id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },],
    filter: ''
  };

  componentDidMount() {
    const savedContact = JSON.parse(localStorage.getItem("contacts"));
    if (savedContact) {
      this.setState({ contacts: savedContact });
    }
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }




handleAddContact = (name, number) => {
    const newContact = {
      id: nanoid(),
      name: name.trim(),
      number: number.trim(),
    };
    const isContactExist = this.state.contacts.some(
      contact => contact.name === name
    );
    if (isContactExist) {
      alert(`${name} is already in contacts`);
      return;
    }
    this.setState(prev => ({
      contacts: [...prev.contacts, newContact],
    }));
  };

handleSearch = e => {
    this.setState({ filter: e.target.value.toLowerCase().trim() });
  };



  handleDeleteContact = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => contact.id !== id),
    }));
  };




  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = filter
      ? contacts.filter(item => item.name.toLowerCase().includes(filter))
      : contacts;
    
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.handleAddContact} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.handleSearch} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  };
}