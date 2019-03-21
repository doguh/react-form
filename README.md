# react-form

>

[![NPM](https://img.shields.io/npm/v/react-form.svg)](https://www.npmjs.com/package/@doguh/react-form) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @doguh/react-form
```

## Usage

```jsx
import React, { Component } from 'react';

import { Form, Field } from '@doguh/react-form';

class Example extends Component {
  state = {
    user: {
      name: 'Señor Chang',
    },
  };

  render() {
    return (
      <Form
        values={this.state.user}
        onSubmit={values => {
          console.log(values);
          this.setState({ user: values });
        }}
      >
        <label>
          Name <Field name="name" type="text" />
        </label>
        <label>
          Over 18 <Field name="accept" type="checkbox" />
        </label>
        <div>
          Gender
          <label>
            Male <Field name="gender" value="male" type="radio" />
          </label>
          <label>
            Female <Field name="gender" value="female" type="radio" />
          </label>
          <label>
            Other <Field name="gender" value="other" type="radio" />
          </label>
        </div>
        <button type="submit">Submit</button>
      </Form>
    );
  }
}
```

## Documentation

### Form's props

| Name       | Default | Type       | Description                                                                                                |
| ---------- | ------- | ---------- | ---------------------------------------------------------------------------------------------------------- |
| `values`   |         | `object`   | Values to fill the form with                                                                               |
| `onSubmit` |         | `function` | Function called when the form is submitted<br>It has the following signature:<br>`function(values, event)` |

### Field's props

| Name              | Default   | Type               | Description                                                                                                                                              |
| ----------------- | --------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name` (required) |           | `string`           | Input field's name.<br>The name should be unique accross the Form's Fields, except for `checkbox` or `radio` types.                                      |
| `component`       | `'input'` | `string|component` | The component used in the field.<br>It can be a string (`'input'`, `'select'`, `'textarea'`) or any Component that accepts `onChange` and `value` props. |
| `type`            | `'text'`  | `string`           | Input field's type (`'checkbox'`, `'radio'`, `'passsword'`, etc.)                                                                                        |
| `value`           |           | `string`           | Input field's value.<br>It should only be used when type is `checkbox` (optional) or `radio` (required).                                                 |
| `multiple`        |           | `boolean`          | Indicates if the field accepts an array of values.<br>Affects only with `select` components.                                                             |
| `inputProps`      |           | `object`           | These props will be passed to the `component` used to render the Field.                                                                                  |

## License

MIT © [doguh](https://github.com/doguh)
