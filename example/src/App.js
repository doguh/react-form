import React, { Component } from 'react';
import { Form, Field } from '@doguh/react-form';
import ReactSelect from 'react-select';

const ReactSelectWrapper = props => {
  const value = props.options.find(opt => opt.value === props.value) || null;
  return (
    <ReactSelect
      {...props}
      value={value}
      onChange={v => props.onChange(v.value)}
    />
  );
};

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export default class App extends Component {
  state = {
    user: {},
  };

  render() {
    return (
      <div>
        <Form
          values={this.state.user}
          onSubmit={values => {
            console.log('on submit');
            console.log(values);
            this.setState({ user: values });
          }}
        >
          <label>
            Nom <Field name="name" type="text" />
          </label>
          <label>
            Classe{' '}
            <Field name="class" component="select">
              <option value="warrior">Guerrier</option>
              <option value="mage">Mage</option>
              <option value="thief">Voleur</option>
            </Field>
          </label>
          <label>
            Biographie <Field name="bio" component="textarea" />
          </label>
          <label>
            Je signe <Field name="accept" type="checkbox" />
          </label>
          <div>
            Sexe
            <label>
              Homme <Field name="gender" value="male" type="radio" />
            </label>
            <label>
              Femme <Field name="gender" value="female" type="radio" />
            </label>
            <label>
              Autre <Field name="gender" value="other" type="radio" />
            </label>
          </div>
          <div>
            Multiple checkboxes
            <label>
              Rouge <Field name="colors" value="red" type="checkbox" />
            </label>
            <label>
              Bleu <Field name="colors" value="blue" type="checkbox" />
            </label>
            <label>
              Vert <Field name="colors" value="green" type="checkbox" />
            </label>
          </div>
          <div>
            Multiple select
            <Field name="fruits" component="select" multiple>
              <option value="apple">Pomme</option>
              <option value="banana">Banane</option>
              <option value="orange">Orange</option>
            </Field>
          </div>
          <label>
            Custom select{' '}
            <Field
              name="flavor"
              component={ReactSelectWrapper}
              inputProps={{ options }}
            />
          </label>
          <button type="submit">Submit</button>
          <button type="button" onClick={() => this.setState({ user: {} })}>
            Reset
          </button>
        </Form>
      </div>
    );
  }
}
