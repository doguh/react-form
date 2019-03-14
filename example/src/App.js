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
          <button type="submit">Submit</button>
        </Form>
      </div>
    );
  }
}
