import React from "react";
import style from "./ContactList.module.css";
import PropTypes from "prop-types";

const ContactList = ({ contacts, onDeleteContact }) => (
  <ul className={style.contacts}>
    {contacts.map(({ id, name, number }) => (
      <li className={style.list} key={id}>
        <p>{name}</p>
        <p>{number}</p>
        <button
          className={style.button}
          onClick={onDeleteContact(id)}
          type="submit"
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
