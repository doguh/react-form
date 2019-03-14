import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import FormContext from './FormContext';

function Field(props) {
  const context = useContext(FormContext);
  const {
    component,
    type,
    name,
    value,
    children,
    inputProps,
    multiple
  } = props;
  const Input = component || 'input';
  const { values, handleChange } = context;

  let checked;
  if (type === 'checkbox') {
    /**
     * checkbox special case
     */
    checked = !value
      ? Boolean(values[name])
      : Boolean(values[name] && ~values[name].indexOf(value));
  } else if (type === 'radio') {
    /**
     * radiobox special case
     */
    checked = values[name] === value;
  }

  return (
    <Input
      name={name}
      type={type}
      value={value || values[name] || (multiple ? [] : '')}
      checked={checked}
      multiple={multiple}
      onChange={e => handleChange(e, { name, type, value, multiple })}
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
  multiple: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  inputProps: PropTypes.object
};

export default Field;
