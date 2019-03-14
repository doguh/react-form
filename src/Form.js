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
    const { name, type, value: checkboxValue } = elem;
    let value = e.target.value;

    if (type === 'checkbox') {
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
    }

    this.setState(state => ({
      values: { ...state.values, [name]: value }
    }));
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
