import React from 'react';
import _ from 'lodash';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      firstNonRepeated: null,
      rewrittenInput: null,
      error: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ input: e.target.value });
  }

  handleSubmit() {
    const { input, firstNonRepeated, rewrittenInput } = this.state;
    if (input.length === 0) {
      this.setState({ error: true });
    }
    const charCounts = {};
    const charArray = input.toLowerCase().split('');
    charArray.forEach((char, i) => {
      if (char in charCounts) {
        charCounts[char].count += 1;
      } else {
        charCounts[char] = {
          char: char,
          count: 1,
          index: i,
        };
      }
    });
    const nonRepeatChars = _.filter(charCounts, (charObj) => charObj.count === 1);
    const lowestIdxChar = _.reduce(nonRepeatChars, (lastLowest, charObj) => {
      if (Object.keys(lastLowest).length === 0) {
        return charObj;
      } else if (charObj.index < lastLowest.index) {
        return charObj;
      } else {
        return lastLowest;
      }
    }, {});
    this.setState({
      firstNonRepeated: lowestIdxChar.char,
      error: false,
    });
  }

  render() {
    const { input, firstNonRepeated, rewrittenInput, error } = this.state;
    return (
      <div>
        <label htmlFor="string-input">
          Please enter a string:
          <input id="string-input" type="text" value={input} onChange={this.handleChange} />
          <button type="submit" onClick={this.handleSubmit}>Submit</button>
        </label>
        <div hidden={!firstNonRepeated}>
          First non-repeated character:
          <div>{firstNonRepeated}</div>
        </div>
        <div hidden={!rewrittenInput}>
          Rewritten in order of number of occurrences:
          <div>{rewrittenInput}</div>
        </div>
        <div hidden={!error}>
          Please enter a string before submitting!
        </div>
      </div>
    );
  }
}
