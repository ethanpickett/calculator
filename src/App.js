import React from 'react';
import './App.css';


//Create a number pad 
const NumberPad = ({number, numWord, handleClick, enabledState }) => {
  return (
      <button className="num-pad" id={numWord} onClick={handleClick(number)}>
          {number}
      </button>
  );
};

//Create a symbol pad 
const SymbolPad = ({ symbol, symWord, handleClick }) => {
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
      numberPads: [
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
          "number": "4",
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

      symbolPads: [
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
          "symWord": "subtract"
        },
        {
          "symbol": "+",
          "symWord": "add"
        }
      ],

      input: "0",
      symbol: "",
      formula: "",
      calculated: 0,
      result: "0",
    };
    this.handleNumClick = this.handleNumClick.bind(this);
    this.handleSymClick = this.handleSymClick.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);
    this.handleEqualClick = this.handleEqualClick.bind(this);

  }

  //callback function that takes the current state as an argument and returns the updated state object.
  handleNumClick(number) {
    return () => {
      this.setState(state => {
        const old_input = state.input.replace(/[+\-*/]/g, "");
        const old_formula = state.formula;
        const old_calculated = state.calculated;
        
        
        if(old_input.length >= 19)
        {
          return;
        }
        

        if (number === "." && old_input.includes(".")) {
          return;
        }

        if(number === "0" && old_input === "0"){
          return;
        }
        
        //Start from scratch
        if (old_calculated) {
          return {
            formula: number,
            symbol: "",
            input: number,
            calculated: 0,
          };
        }

        if ((old_input === "0" || old_input === "") && number === ".") {
          return {
            symbol: "",
            input: "0.",
            formula: old_formula + "0.",
            calculated: 0,
          }
        } 

        if (old_formula === "") {
          return {
            symbol: "",
            formula: number,
            input: number,
            calculated: 0,
          };
        }
        else {
          return {
            symbol: "",
            input: old_input + number,
            formula: old_formula + number,
            calculated: 0,
          }
        }
      });
    };
  }

  //use a callback function inside this.setState() to update the state of the component. This allows us to use the current state to calculate the new state based on the input symbol.
  handleSymClick(inputsymbol) {
    return () => {
      this.setState(state => {
        const old_formula = state.formula;
        const old_symbol = state.symbol;
        const old_calculated = state.calculated;
  
        let new_input = "0";
        let new_formula = "";
        let new_symbol = "";
  
        //overwrite last minus symbol if another consecutive symbol is entered (have to remove extra char in this case)
        if (old_symbol == "-" && inputsymbol !== "") {
          return {
            formula: old_formula.slice(0, -3) + inputsymbol + " ",
            symbol: inputsymbol,
            input: inputsymbol,
            calculated: 0,
          };
        }
        
        //overwrite all other symbols if another consecutive symbol is entered (excluding (-))
        if (old_symbol !== "" && inputsymbol !== "-") {
          return {
            formula: old_formula.slice(0, -2) + inputsymbol + " ",
            symbol: inputsymbol,
            input: inputsymbol,
            calculated: 0,
          };
        }
  
        if (inputsymbol !== "-" && old_formula === "") {
          return;
        }
  
        //Create new formula using previous result
        if (old_calculated) {
          return {
            formula: state.result + " " + inputsymbol + " ",
            symbol: inputsymbol,
            input: inputsymbol,
            calculated: 0,
          };
        }
  
        if (inputsymbol === "-" && old_formula === "") {
          new_formula = "-";
          new_input = "-";
        } else if (inputsymbol === "-" && old_symbol !== "") {
          new_symbol = inputsymbol;
          new_formula = inputsymbol;
          new_input = inputsymbol;
        } else {
          new_symbol = inputsymbol;
          new_formula = " " + inputsymbol + " ";
          new_input = inputsymbol;
        }
  
        return {
          symbol: new_symbol,
          formula: old_formula + new_formula,
          input: new_input,
          calculated: 0,
        };
      });
    };
  }

  handleClearClick () {

    console.log("Clear")

    this.setState(state => {
      return {
        input: "0",
        symbol: "",
        formula: "",
        result: "0",
        calculated: 0
      }
    });
  };


  handleEqualClick () {

    let old_formula = this.state.formula;
    try {

      console.log(old_formula)
      let result = eval(old_formula);
      console.log(result)

      this.setState(state =>({
        formula: state.formula + "=" + result,
        input: result.toString(),
        result: result,
        calculated: 1
      }));

    } 
    catch (error) {
      this.setState({
        input: "Invalid formula",
        formula: ""
      });
    }
  };


  render() {


    let displayStyle = {
      color: 'black'
    }

    //change text color based on result status
    if(this.state.calculated == 1) 
    {
      displayStyle = {
        color: 'green'
      }
    } 

    if(this.state.input == "Invalid formula")
    {
      displayStyle = {
        color: 'green'
      }
    }
    

    return (
      <div className="calculator">

        <p id="formula" className="formulaScreen">{this.state.formula}</p>

        <p id="display" className="outputScreen" style={displayStyle}>{this.state.input}</p>

        
          {/*Map the number pad */}
          {this.state.numberPads.map(item => (
              <NumberPad
                  key={item.numWord}
                  number={item.number}
                  numWord={item.numWord}
                  handleClick={this.handleNumClick}
              />
          ))}
        


          {/*Map the symbol pad */}
          {this.state.symbolPads.map(item => (
              <SymbolPad
                  key={item.symWord}
                  symbol={item.symbol}
                  symWord={item.symWord}
                  handleClick={this.handleSymClick}
              />
          ))}


        <button id="equals" onClick={this.handleEqualClick}>=</button>

        <button id="clear" onClick={this.handleClearClick}>C</button>
    
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
