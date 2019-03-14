import React, { Component } from 'react';
import Form, { Field } from 'react-form';

export default class App extends Component {
  render() {
    return (
      <div>
        <Form>
          <label>
            Nom <Field name="name" type="text" />
          </label>
          <label>
            Classe{' '}
            <Field name="class" component="select">
              <option value="warrior">Warrior</option>
              <option value="mage">Mage</option>
              <option value="thief">Thief</option>
            </Field>
          </label>
          <label>
            Biographie <Field name="bio" component="textarea" />
          </label>
          <button type="submit">Submit</button>
        </Form>
      </div>
    );
  }
}
