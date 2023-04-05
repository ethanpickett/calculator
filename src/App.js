import React from 'react';
import './App.css';


//Create a number pad 
const numberPad = ({ number, numWord, handleClick }) => {
  return (
      <button className="num-pad" id={numWord} onClick={handleClick(number)}>
          {number}
      </button>
  );
};

//Create a symbol pad 
const symbolPad = ({ symbol, symWord, handleClick }) => {
  return (
      <button className="sym-pad" id={symWord} onClick={handleClick(symbol)}>
          {symbol}
      </button>
  );
};

class Calculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      numberPad: [
        {
          "number": "7",
          "numWord": "seven"
        },
        {
          "number": "8",
          "numWord": "eight"
        },
        {
          "number": "9",
          "numWord": "nine"
        },
        {
          "number": 4,
          "numWord": "four"
        },
        {
          "number": "5",
          "numWord": "five"
        },
        {
          "number": "6",
          "numWord": "six"
        },
        {
          "number": "1",
          "numWord": "one"
        },
        {
          "number": "2",
          "numWord": "two"
        },
        {
          "number": "3",
          "numWord": "three"
        },
        {
          "number": "0",
          "numWord": "zero"
        },
        {
          "number": ".",
          "numWord": "decimal"
        }
      ],

      symbolPad: [
        {
          "symbol": "/",
          "symWord": "divide"
        },
        {
          "symbol": "*",
          "symWord": "multiply"
        },
        {
          "symbol": "-",
          "symWord": "minus"
        },
        {
          "symbol": "+",
          "symWord": "minupluss"
        }
      ],

      input: "0",
      output: "0",
      symbol: "",
      formula: ""
    }
  }

  handleNumClick(number) {
    return () => {
        //set note text  
        this.setState({
            input: input + number,
            formula: input + number
        });
    };
  }


  handleSymClick(symbol) {
    return () => {
        //set note text  
        this.setState({
            symbol: symbol,
            formula: formula + symbol,
            input: "0"
        });
    };
  }

  handleClearClick () {
    this.setState({
      input: "0",
      output: "0",
      symbol: "",
      formula: ""
    });
  };

  handleEqualClick () {
    this.setState({
      output: input,
      input: "0"
    });
  };

  render() {
    return (
      <div className="calculator">

        <p id="formula" className="formulaScreen">{this.state.input}</p>
        <p id="display" className="outputScreen">{this.state.input}</p>

        <div id="display-pad">
          {/*Map the number pad */}
          {this.state.numberPad.map(item => (
              <numberPad
                  number={item.number}
                  numWord={item.numWord}
                  handleClick={this.handleNumClick}
              />
          ))}
        </div>

        <div id="symbol-pad">
          {/*Map the symbol pad */}
          {this.state.symbolPad.map(item => (
              <symbolPad
                  symbol={item.symbol}
                  symWord={item.symWord}
                  handleClick={this.handleSymClick}
              />
          ))}
        </div>

        <button id="equals" onClick={this.handleEqualClick}>=</button>
        <button id="clear" onClick={this.handleClearClick}>=</button>
    
      </div>
    );
  };
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
            <Calculator/>
      </div>
    );
  }
  }
  

export default App;
