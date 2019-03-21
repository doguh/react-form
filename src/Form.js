import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormContext from './FormContext';

export default class Form extends Component {
  static propTypes = {
    values: PropTypes.object,
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]),
    onSubmit: PropTypes.func,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.values !== state.propsValues) {
      return {
        values: props.values || {},
        propsValues: props.values,
      };
    }
    return null;
  }

  state = {
    values: this.props.values || {},
    propsValues: this.props.values,
  };

  fields = {};

  registerField = field => {
    if (field.type === 'radio' || (field.type === 'checkbox' && field.value)) {
      /**
       * radio + checkbox with value
       * special case
       */
      if (!this.fields[field.name]) {
        this.fields[field.name] = [];
      }
      this.fields[field.name].push(field);
    } else {
      this.fields[field.name] = field;
    }
  };

  unregisterField = field => {
    if (field.type === 'radio' || (field.type === 'checkbox' && field.value)) {
      /**
       * radio + checkbox with value
       * special case
       */
      const index = this.fields[field.name].indexOf(field);
      if (~index) {
        this.fields[field.name].splice(index, 1);
        if (this.fields[field.name].length === 0) {
          delete this.fields[field.name];
        }
      }
    } else {
      delete this.fields[field.name];
    }
  };

  handleChange = (e, elem) => {
    const { name, type, value: checkboxValue, multiple } = elem;
    const isEvent = e && e.nativeEvent && e.nativeEvent instanceof window.Event;
    let value = isEvent ? e.target.value : e;

    if (type === 'checkbox') {
      /**
       * checkbox special case
       */
      if (!checkboxValue) {
        if (isEvent) value = e.target.checked;
      } else {
        const { values } = this.state;
        value = values[name] || [];
        const index = value.indexOf(checkboxValue);
        if (isEvent ? e.target.checked : value) {
          if (!~index) {
            value.push(checkboxValue);
          }
        } else {
          if (~index) {
            value.splice(index, 1);
          }
        }
      }
    } else if (isEvent && e.target.options && multiple) {
      /**
       * select multiple special case
       */
      value = [];
      for (let i = 0; i < e.target.options.length; i++) {
        if (e.target.options[i].selected) {
          value.push(e.target.options[i].value);
        }
      }
    }

    this.setState(state => ({
      values: { ...state.values, [name]: value },
    }));
  };

  handleSubmit = e => {
    const values = this.getValues();
    e.preventDefault();
    if (this.props.onSubmit) {
      this.props.onSubmit(values, e);
    }
  };

  getValues = () => {
    const values = {};
    Object.keys(this.fields).forEach(name => {
      if (this.state.values[name]) {
        // if value is in state, use it
        values[name] = this.state.values[name];
      } else {
        // else, use a default value depending on field type
        const field = this.fields[name];
        if (Array.isArray(field)) {
          // list of checkbox or radio
          values[name] = field[0].type === 'checkbox' ? [] : undefined;
        } else if (field.multiple) {
          // multiple attribute to true
          values[name] = [];
        } else if (field.type === 'checkbox') {
          // checkbox alone
          values[name] = false;
        } else {
          // text and others
          values[name] = '';
        }
      }
    });
    return values;
  };

  render() {
    const { children } = this.props;
    const { values } = this.state;
    return (
      <FormContext.Provider
        value={{
          values,
          handleChange: this.handleChange,
          registerField: this.registerField,
          unregisterField: this.unregisterField,
        }}
      >
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          {children}
        </form>
      </FormContext.Provider>
    );
  }
}
