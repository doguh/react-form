import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import FormContext from './FormContext';

function Field(props) {
  const context = useContext(FormContext);
  const Input = props.component || 'input';
  const { type, name, value, children, inputProps } = props;
  const { values, handleChange } = context;

  let checked;
  if (type === 'checkbox') {
    checked = !value
      ? Boolean(values[name])
      : Boolean(values[name] && ~values[name].indexOf(value));
  }

  return (
    <Input
      type={type}
      value={value || values[name] || ''}
      checked={checked}
      onChange={e => handleChange(e, { name, type, value })}
      {...inputProps}
    >
      {children}
    </Input>
  );
}

Field.propTypes = {
  name: PropTypes.string.isRequired,
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.element
  ]),
  type: PropTypes.string,
  value: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  inputProps: PropTypes.object
};

export default Field;
