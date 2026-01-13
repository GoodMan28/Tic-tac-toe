import React, { useState } from "react";
import Square from "./Square.jsx";
import "../App.css"

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]); // this is an array which consists of a single array of 9 elements which are all null
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove];
    const xIsNext = (currentMove % 2) === 0;
    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    const moves = history.map((squares, move) => {
        let description;
        if(move > 0) description = `Go to move #${move}`;
        else description = 'Go to game start';
        return (
            <li><button key={move} onClick={() => jumpTo(move)}>{description}</button></li>
        )
    })

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    return (
        <>
            <div className="Board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="Game">
                <div className="game-info">
                    <ol>{moves}</ol>
                </div>
            </div>
        </>
    )
}

function Board ({xIsNext, squares, onPlay}) {
    let status;
    const winner = calculateWinner(squares);
    if(winner) {
        status = `Winner: ${winner}`;
    } else {
        status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }
    function handleClick(i) {
        if(calculateWinner(squares) || squares[i]) return;
        const newSquares = squares.slice();
        newSquares[i] = xIsNext ? 'X' : 'O';
        onPlay(newSquares);
    }

    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onClickHandler={() => handleClick(0)}/>
                <Square value={squares[1]} onClickHandler={() => handleClick(1)}/>
                <Square value={squares[2]} onClickHandler={() => handleClick(2)}/> {/* calling the function directly will cause an infinite loop. Hence we are defining the function not calling it */} 
            </div>

            <div className="board-row">
                <Square value={squares[3]} onClickHandler={() => handleClick(3)}/>
                <Square value={squares[4]} onClickHandler={() => handleClick(4)}/>
                <Square value={squares[5]} onClickHandler={() => handleClick(5)}/>
            </div>

            <div className="board-row">
                <Square value={squares[6]} onClickHandler={() => handleClick(6)}/>
                <Square value={squares[7]} onClickHandler={() => handleClick(7)}/>
                <Square value={squares[8]} onClickHandler={() => handleClick(8)}/>
            </div>
        </>
    )
}


function calculateWinner(squares) {
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
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}