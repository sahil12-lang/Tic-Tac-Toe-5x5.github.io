import React, { useState, useEffect } from "react";
import SquareComponent from "./SquareComponent";
const initialState = [
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
];

let isXChance = true;
let completedSeq = [];
let xBlocks = [""];
let oBlocks = [""];

function App() {
  const [gameState, updateGameSet] = useState(initialState);
  const [gameWon, setWinner] = useState(false);
  const [_x, setX] = useState(0);
  const [_o, setO] = useState(0);

  const onSquareClicked = (index) => {
    if (!gameWon) {
      let strings = Array.from(gameState);
      // console.log(index);
      if (strings[index] === "") {
        strings[index] = isXChance ? "X" : "0";
        updateGameSet(strings);
        isXChance = !isXChance;
      }
    }
    else {
      alert("Game is over. Please Reset and Play Again,")
    }
  };
  useEffect(() => {
    const sequence = checkSequence();
    const winner = checkWinner();
    setTimeout(() => {
      if (winner) {
        console.log("alert coming");
        setWinner(true);
        alert(`yayy!! ${winner} has won `);
       
      } else {
        checkIfTie();
       
      }
    }, 300);
  }, [gameState]);

  const checkIfTie = () => {
    let filled = true;
    gameState.forEach((index) => {
      if (index === "") {
        filled = false;
      }
    });
    if (filled) {
      console.log("xblocks", xBlocks);
      console.log("oblocks", oBlocks);
      console.log("x sequences", _x);
      console.log("o sequences", _o);
      setTimeout(() => {
        if (_x > _o) {
          alert(`X wins with more sequence`);
          console.log("x coming!", _x);
        } else if (_x < _o) {
          alert(`O wins with more sequence`);
          console.log("o coming!", _o);
        } else if (filled) {
          if (_x === _o);
          {
            alert(`Draw`);
          }
        }
      }, 500);
    } 
  };

  const checkWinner = () => {
    const lines = [
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24],
      [0, 5, 10, 15, 20],
      [1, 6, 11, 16, 21],
      [2, 7, 12, 17, 22],
      [3, 8, 13, 18, 23],
      [4, 9, 14, 19, 24],
      [0, 6, 12, 18, 24],
      [4, 8, 12, 16, 20],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c, d, e] = lines[i];
      if (
        gameState[a] &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c] &&
        gameState[a] === gameState[d] &&
        gameState[a] === gameState[e]
      ) {
        return gameState[a];
      
      }
    }
    return null;
  };

  const checkSequence = () => {
    const lines = [
      [0, 1, 2],
      [1, 2, 3],
      [2, 3, 4],
      [5, 6, 7],
      [6, 7, 8],
      [7, 8, 9],
      [10, 11, 12],
      [11, 12, 13],
      [12, 13, 14],
      [15, 16, 17],
      [16, 17, 18],
      [17, 18, 19],
      [20, 21, 22],
      [21, 22, 23],
      [22, 23, 24],
      [0, 5, 10],
      [5, 10, 15],
      [10, 15, 20],
      [1, 6, 11],
      [6, 11, 16],
      [11, 16, 21],
      [2, 7, 12],
      [7, 12, 17],
      [12, 17, 22],
      [3, 8, 13],
      [8, 13, 18],
      [13, 18, 23],
      [4, 9, 14],
      [9, 14, 19],
      [14, 19, 24],
      [0, 6, 12],
      [6, 12, 18],
      [12, 18, 24],
      [4, 8, 12],
      [8, 12, 16],
      [12, 16, 20],
      [1, 7, 13],
      [7, 13, 19],
      [2, 8, 14],
      [5, 11, 17],
      [11, 17, 23],
      [2, 6, 10],
      [3, 7, 11],
      [7, 11, 15],
      [9, 13, 17],
      [13, 17, 21],
      [14, 18, 22],
      [10, 16, 22],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        gameState[a] &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      ) {
        setTimeout(() => {
          if (checkSequence) {
            //  alert(`Sequence of three ${gameState[(a, b, c)]} `);
            console.log("Sequence of three", gameState[(a, b, c)]);
            if (!completedSeq.includes([a, b, c].toString())) {
              console.log("new entry");
              completedSeq.push([a, b, c].toString());
              if (gameState[(a, b, c)] === "X") {
                setX((x) => x + 1);
                xBlocks.push(a, b, c);
                // alert(`1`)
              } else {
                setO((o) => o + 1);
                oBlocks.push(a, b, c);
                // alert(`2`)
              }
            }
          }
        }, 300);
      }
    }
    // return null;
  };

  return (
    <div className="bodyy">
      <p className="bodyy-text"> 5x5 Tic Tac Toe </p>
      <div className="points-heading">
        X's: {_x} - 0's: {_o}
      </div>
      <div className="row jc-center">
        <SquareComponent
          style={{
            background: xBlocks.includes(0)
              ? "#ff000070"
              : oBlocks.includes(0)
              ? "#9787eb47"
              : undefined,
          }}
          className="right"
          state={gameState[0]}
          onClick={() => onSquareClicked(0)}
        />
        <SquareComponent
          style={{
            background: xBlocks.includes(1)
              ? "#ff000070"
              : oBlocks.includes(1)
              ? "#9787eb47"
              : undefined,
          }}
          className="right"
          state={gameState[1]}
          onClick={() => onSquareClicked(1)}
        />
        <SquareComponent
          style={{
            background: xBlocks.includes(2)
              ? "#ff000070"
              : oBlocks.includes(2)
              ? "#9787eb47"
              : undefined,
          }}
          className="right"
          state={gameState[2]}
          onClick={() => onSquareClicked(2)}
        />
        <SquareComponent
          style={{
            background: xBlocks.includes(3)
              ? "#ff000070"
              : oBlocks.includes(3)
              ? "#9787eb47"
              : undefined,
          }}
          className="right"
          state={gameState[3]}
          onClick={() => onSquareClicked(3)}
        />
        <SquareComponent
          style={{
            background: xBlocks.includes(4)
              ? "#ff000070"
              : oBlocks.includes(4)
              ? "#9787eb47"
              : undefined,
          }}
          className="bottom"
          state={gameState[4]}
          onClick={() => onSquareClicked(4)}
        />
      </div>
      <div className="row jc-center">
        <SquareComponent
          style={{
            background: xBlocks.includes(5)
              ? "#ff000070"
              : oBlocks.includes(5)
              ? "#9787eb47"
              : undefined,
          }}
          className="right"
          state={gameState[5]}
          onClick={() => onSquareClicked(5)}
        />
        <SquareComponent
          style={{
            background: xBlocks.includes(6)
              ? "#ff000070"
              : oBlocks.includes(6)
              ? "#9787eb47"
              : undefined,
          }}
          className="right"
          state={gameState[6]}
          onClick={() => onSquareClicked(6)}
        />
        <SquareComponent
          style={{
            background: xBlocks.includes(7)
              ? "#ff000070"
              : oBlocks.includes(7)
              ? "#9787eb47"
              : undefined,
          }}
          className="right"
          state={gameState[7]}
          onClick={() => onSquareClicked(7)}
        />
        <SquareComponent
          style={{
            background: xBlocks.includes(8)
              ? "#ff000070"
              : oBlocks.includes(8)
              ? "#9787eb47"
              : undefined,
          }}
          className="right"
          state={gameState[8]}
          onClick={() => onSquareClicked(8)}
        />
        <SquareComponent
          style={{
            background: xBlocks.includes(9)
              ? "#ff000070"
              : oBlocks.includes(9)
              ? "#9787eb47"
              : undefined,
          }}
          className="bottom"
          state={gameState[9]}
          onClick={() => onSquareClicked(9)}
        />
      </div>
      <div className="row jc-center">
        <SquareComponent
          style={{
            background: xBlocks.includes(10)
              ? "#ff000070"
              : oBlocks.includes(10)
              ? "#9787eb47"
              : undefined,
          }}
          className="right"
          state={gameState[10]}
          onClick={() => onSquareClicked(10)}
        />
        <SquareComponent
          style={{
            background: xBlocks.includes(11)
              ? "#ff000070"
              : oBlocks.includes(11)
              ? "#9787eb47"
              : undefined,
          }}
          className="right"
          state={gameState[11]}
          onClick={() => onSquareClicked(11)}
        />
        <SquareComponent
          style={{
            background: xBlocks.includes(12)
              ? "#ff000070"
              : oBlocks.includes(12)
              ? "#9787eb47"
              : undefined,
          }}
          className="right"
          state={gameState[12]}
          onClick={() => onSquareClicked(12)}
        />
        <SquareComponent
          style={{
            background: xBlocks.includes(13)
              ? "#ff000070"
              : oBlocks.includes(13)
              ? "#9787eb47"
              : undefined,
          }}
          className="right"
          state={gameState[13]}
          onClick={() => onSquareClicked(13)}
        />
        <SquareComponent
          style={{
            background: xBlocks.includes(14)
              ? "#ff000070"
              : oBlocks.includes(14)
              ? "#9787eb47"
              : undefined,
          }}
          className="bottom"
          state={gameState[14]}
          onClick={() => onSquareClicked(14)}
        />
      </div>
      <div className="row jc-center">
        <SquareComponent
          style={{
            background: xBlocks.includes(15)
              ? "#ff000070"
              : oBlocks.includes(15)
              ? "#9787eb47"
              : undefined,
          }}
          className="right"
          state={gameState[15]}
          onClick={() => onSquareClicked(15)}
        />
        <SquareComponent
          style={{
            background: xBlocks.includes(16)
              ? "#ff000070"
              : oBlocks.includes(16)
              ? "#9787eb47"
              : undefined,
          }}
          className="right"
          state={gameState[16]}
          onClick={() => onSquareClicked(16)}
        />
        <SquareComponent
          style={{
            background: xBlocks.includes(17)
              ? "#ff000070"
              : oBlocks.includes(17)
              ? "#9787eb47"
              : undefined,
          }}
          className="right"
          state={gameState[17]}
          onClick={() => onSquareClicked(17)}
        />
        <SquareComponent
          style={{
            background: xBlocks.includes(18)
              ? "#ff000070"
              : oBlocks.includes(18)
              ? "#9787eb47"
              : undefined,
          }}
          className="right"
          state={gameState[18]}
          onClick={() => onSquareClicked(18)}
        />
        <SquareComponent
          style={{
            background: xBlocks.includes(19)
              ? "#ff000070"
              : oBlocks.includes(19)
              ? "#9787eb47"
              : undefined,
          }}
          className="bottom"
          state={gameState[19]}
          onClick={() => onSquareClicked(19)}
        />
      </div>
      <div className="row jc-center">
        <SquareComponent
          style={{
            background: xBlocks.includes(20)
              ? "#ff000070"
              : oBlocks.includes(20)
              ? "#9787eb47"
              : undefined,
          }}
          className="border-right"
          state={gameState[20]}
          onClick={() => onSquareClicked(20)}
        />

        <SquareComponent
          style={{
            background: xBlocks.includes(21)
              ? "#ff000070"
              : oBlocks.includes(21)
              ? "#9787eb47"
              : undefined,
          }}
          className="border-right"
          state={gameState[21]}
          onClick={() => onSquareClicked(21)}
        />

        <SquareComponent
          style={{
            background: xBlocks.includes(22)
              ? "#ff000070"
              : oBlocks.includes(22)
              ? "#9787eb47"
              : undefined,
          }}
          className="border-right"
          state={gameState[22]}
          onClick={() => onSquareClicked(22)}
        />
        <SquareComponent
          style={{
            background: xBlocks.includes(23)
              ? "#ff000070"
              : oBlocks.includes(23)
              ? "#9787eb47"
              : undefined,
          }}
          className="border-right"
          state={gameState[23]}
          onClick={() => onSquareClicked(23)}
        />
        <SquareComponent
          style={{
            background: xBlocks.includes(24)
              ? "#ff000070"
              : oBlocks.includes(24)
              ? "#9787eb47"
              : undefined,
          }}
          className=""
          state={gameState[24]}
          onClick={() => onSquareClicked(24)}
        />
      </div>
      <button
        className="reset-button"
        onClick={() => {
          completedSeq = [];
          xBlocks = [""];
          oBlocks = [""];
          updateGameSet(initialState);
          setO(0);
          setX(0);
          setWinner(false);
        }}
      >
        Reset Game
      </button>
    </div>
  );
}
export default App;
