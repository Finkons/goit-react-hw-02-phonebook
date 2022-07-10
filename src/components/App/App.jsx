import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Report } from 'notiflix/build/notiflix-report-aio';
import Container from './app.styled';
import ContactForm from 'components/ContactForm/';
import ContactList from 'components/ContactList/';
import Filter from 'components/Filter/';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const normalizedName = name.toLowerCase();

    const existingName = this.state.contacts.find(contact =>
      contact.name.toLowerCase().includes(normalizedName)
    );

    if (existingName) {
      Report.failure(`${normalizedName} is already in contacts`, 'sorry');
      return;
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(prev => ({
      contacts: [contact, ...prev.contacts],
    }));
  };

  onDeleteContact = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => contact.id !== id),
    }));
  };

  onChangeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const { addContact, onChangeFilter, onDeleteContact } = this;
    const visibleContacts = this.getVisibleContacts();

    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={onChangeFilter} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={onDeleteContact}
        />
      </Container>
    );
  }
}
