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

## License

MIT © [doguh](https://github.com/doguh)
