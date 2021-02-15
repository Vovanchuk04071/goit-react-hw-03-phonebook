import React, { Component } from "react";
import Form from "./Components/Form";
import { v4 as uuidv4 } from "uuid";
import style from "./Style.module.css";
import Filter from "./Components/Filter/Filter";
import ContactList from "./Components/ContactList/ContactList";
import Modal from "./Components/Modal/Modal";

const contacts = [
  { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
  { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
  { id: "id-3", name: "Eden Clements", number: "645-17-79" },
  { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
];
class App extends Component {
  state = {
    contacts: [],
    filter: "",
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parsContacts = JSON.parse(contacts);
    if (parsContacts) {
      this.setState({
        contacts: parsContacts,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
      console.log("Обновилось поле контакта");
    }
  }

  hendleFilteredContact = ({ name, number }) => {
    const contact = {
      id: uuidv4(),
      name,
      number,
    };
    if (this.checkName(name)) {
      alert(`${name} is already in contacts!`);
      return;
    }

    this.setState((prevState) => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  checkName = (inputName) => {
    const { contacts } = this.state;
    const normalaizedFilter = inputName.toLowerCase();
    return contacts.find(
      (contact) => contact.name.toLowerCase() === normalaizedFilter
    );
  };

  handleChangeFilter = (e) => {
    this.setState({ filter: e.target.value });
  };

  handleClearFilter = () => {
    this.setState({ filter: "" });
  };

  getVisibleContacts() {
    const { contacts, filter } = this.state;
    const normalaizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalaizedFilter)
    );
  }

  handleDeleteContact = (contactId) => () => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  render() {
    const { filter, showModal } = this.state;
    const visibleFilter = this.getVisibleContacts();

    return (
      <>
        <button type="button" onClick={this.toggleModal}>
          {" "}
          Открыть модалку
        </button>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <p>Моя модалка</p>
            <button type="button" onClick={this.toggleModal}>
              закрыть
            </button>
          </Modal>
        )}

        <div className={style.wraper}>
          <h1 className={style.title}>Phonebook</h1>
          <Form onSubmit={this.hendleFilteredContact} />
          <h2 className={style.title}>Contacts</h2>
          <Filter
            value={filter}
            onChange={this.handleChangeFilter}
            onBlur={this.handleClearFilter}
          />
          <ContactList
            contacts={visibleFilter}
            onDeleteContact={this.handleDeleteContact}
          />
        </div>
      </>
    );
  }
}

export default App;
