import React, { Component } from 'react';

import style from './Form.module.css';

class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    if ((name.length > 0) & (number.length > 0)) {
      this.props.onSubmit(this.state);
      this.reset();
    }
  };

  handleFocus = () => {
    this.setState({
      number: '+380',
    });
  };

  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={style.form} onSubmit={this.handleSubmit}>
        <label className={style.label}>
          Name
          <input
            type="Text"
            placeholder="Your name"
            value={name}
            name="name"
            onChange={this.handleChange}
          ></input>
        </label>
        <label className={style.label}>
          Number
          <input
            type="Text"
            placeholder="Your number"
            value={number}
            name="number"
            onFocus={this.handleFocus}
            onChange={this.handleChange}
          ></input>
        </label>
        <button className={style.button} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

export default Form;
