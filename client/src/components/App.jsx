import React from 'react';
import '../styles/App.css';

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
    const { input } = this.state;
    if (input.length === 0) {
      this.setState({
        firstNonRepeated: null,
        rewrittenInput: null,
        error: true,
      });
      return;
    }

    const charCounts = {};
    const charArray = input.split('');
    charArray.forEach((char, i) => {
      const lowerCaseChar = char.toLowerCase();
      const isLowerCase = lowerCaseChar === char;
      if (lowerCaseChar in charCounts) {
        charCounts[lowerCaseChar].count += 1;
        charCounts[lowerCaseChar].lowerCase.push(isLowerCase);
      } else {
        charCounts[lowerCaseChar] = {
          char: lowerCaseChar,
          count: 1,
          index: i,
          lowerCase: [isLowerCase],
        };
      }
    });

    const charCountsArr = Object.keys(charCounts).map((char) => charCounts[char]);
    charCountsArr.sort((a, b) => {
      if (a.count < b.count) { return -1; }
      if (a.count > b.count) { return 1; }
      if (a.count === b.count) {
        if (a.index < b.index) { return -1; }
        if (a.index > b.index) { return 1; }
      }
      return 0;
    });

    const nonRepeatChars = charCountsArr.filter((charObj) => charObj.count === 1);
    let firstNonRepeated;
    if (nonRepeatChars.length === 0) {
      firstNonRepeated = 'No non-repeating characters!';
    } else {
      firstNonRepeated = nonRepeatChars[0].lowerCase[0]
        ? nonRepeatChars[0].char
        : nonRepeatChars[0].char.toUpperCase();
    }

    let rewrittenInput = '';
    charCountsArr.forEach((char) => {
      for (let i = 0; i < char.count; i += 1) {
        const isLowerCase = char.lowerCase[i];
        const casedChar = isLowerCase ? char.char : char.char.toUpperCase();
        rewrittenInput += casedChar;
      }
    });
    this.setState({
      input: '',
      rewrittenInput,
      firstNonRepeated,
      error: false,
    });
  }

  render() {
    const {
      input,
      firstNonRepeated,
      rewrittenInput,
      error,
    } = this.state;

    let toggleClass = 'success';
    if (firstNonRepeated === 'No non-repeating characters!' || error) {
      toggleClass = 'error';
    }

    return (
      <div>
        <label htmlFor="string-input">
          Please enter a string:
          <input id="string-input" type="text" value={input} onChange={this.handleChange} />
          <button type="submit" onClick={this.handleSubmit}>Submit</button>
        </label>
        <div hidden={!firstNonRepeated}>
          First non-repeated character:
          <div className={toggleClass}>{firstNonRepeated}</div>
        </div>
        <div hidden={!rewrittenInput}>
          Rewritten in order of number of occurrences:
          <div id="rewritten-input">{rewrittenInput}</div>
        </div>
        <div hidden={!error} className={toggleClass}>
          Please enter a string before submitting!
        </div>
      </div>
    );
  }
}
