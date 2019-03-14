import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormContext from './FormContext';

export default class Form extends Component {
  static propTypes = {
    values: PropTypes.object,
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element)
    ])
  };

  static getDerivedStateFromProps(props, state) {
    if (props.values !== state.propsValues) {
      return {
        values: props.values || {},
        propsValues: props.values
      };
    }
    return null;
  }

  state = {
    values: this.props.values || {},
    propsValues: this.props.values
  };

  handleChange = (e, elem) => {
    const { name, type, value: checkboxValue, multiple } = elem;
    let value = e.target.value;

    if (type === 'checkbox') {
      /**
       * checkbox special case
       */
      if (!checkboxValue) {
        value = e.target.checked;
      } else {
        const { values } = this.state;
        value = values[name] || [];
        const index = value.indexOf(checkboxValue);
        if (e.target.checked) {
          if (!~index) {
            value.push(checkboxValue);
          }
        } else {
          if (~index) {
            value.splice(index, 1);
          }
        }
      }
    } else if (e.target.options && multiple) {
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
      values: { ...state.values, [name]: value }
    }));
  };

  handleSubmit = e => {
    console.log(this.state.values);
    e.preventDefault();
  };

  render() {
    const { children } = this.props;
    const { values } = this.state;
    console.log(values);
    return (
      <FormContext.Provider
        value={{
          values,
          handleChange: this.handleChange
        }}
      >
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          {children}
        </form>
      </FormContext.Provider>
    );
  }
}
