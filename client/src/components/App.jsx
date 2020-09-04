import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ input: e.target.value });
  }

  handleSubmit() {

  }

  render() {
    const { input } = this.state;
    return (
      <div>
        <label htmlFor="string-input">
          Please enter a string:
          <input id="string-input" type="text" value={input} onChange={this.handleChange} />
          <button type="submit" onClick={this.handleSubmit}>Submit</button>
        </label>
      </div>
    );
  }
}
