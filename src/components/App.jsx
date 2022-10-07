import React, { Component } from "react";
import "./index.css";

function determineWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; ++i) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] == squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// function component (stateless)
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class SquareClass extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     value: null,
  //   };
  // }

  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     squares: Array(9).fill(null),
  //     xTurn: true,
  //   };
  // }

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    // const winner = determineWinner(this.state.squares);
    // let status;
    // if (winner) {
    //   status = "Winner: " + winner;
    // } else {
    //   status = "Next player: " + (this.state.xTurn ? "X" : "O");
    // }
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <div>
          <br />
          <button onClick={() => console.log(this.props.squares)}>
            console.log squares
          </button>
        </div>
      </div>
    );
  }
}

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      move: 0,
      xTurn: true,
    };
  }

  handleClick(i) {
    // Immutability
    // - keep previous versions
    // - detect changes
    // - determine when to re-render > shouldComponentUpdate()
    const history = this.state.history.slice(0, this.state.move + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (determineWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xTurn ? "X" : "O";
    this.setState({
      // concat doesn't mutate original arrray, unlike push
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      move: history.length,
      xTurn: !this.state.xTurn,
    });
  }

  jumpTo(step) {
    this.setState({
      move: step,
      xTurn: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.move];
    const winner = determineWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? "Got to move #" + move : "Go to game start";
      return (
        // <li> requires key for React to understand
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xTurn ? "X" : "O");
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
