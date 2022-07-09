import React from 'react';
import PropTypes from 'prop-types';
import { MdOutlineFindInPage } from 'react-icons/md';
import { Label } from './Filter.styled';

const Filter = ({ value, onChange }) => {
  return (
    <Label>
      <MdOutlineFindInPage size={30} /> Find contacts by name
      <input type="text" value={value} onChange={onChange} />
    </Label>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
