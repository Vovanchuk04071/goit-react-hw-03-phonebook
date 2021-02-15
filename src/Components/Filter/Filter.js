import React from 'react';
import style from './Filter.module.css';
import PropTypes from 'prop-types';

const Filter = ({ value, onChange, onBlur }) => (
  <label className={style.label}>
    Find contact by name
    <input
      type="text"
      value={value}
      onBlur={onBlur}
      onChange={onChange}
    ></input>
  </label>
);

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};

export default Filter;
