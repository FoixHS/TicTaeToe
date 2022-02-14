import React, { useState } from "react";
import { calculateWinner } from "../helper"
import Board from "./Board";

const Game = () => {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);
    const winner = calculateWinner(history[stepNumber]);
    const XO = xIsNext ? "X" : "O";

    const handleClick = (i) => {
        const historyPoint = history.slice(0, stepNumber + 1);
        const current = historyPoint[stepNumber];
        const squares = [...current];

        if (winner || squares[i]) return;
        squares[i] = XO;
        setHistory([...historyPoint, squares]);
        setStepNumber(historyPoint.length)
        setXIsNext(!xIsNext)
    }

    const goBack = (i) => {
        const historyPoint = history.slice(0, stepNumber)
        const lastMove = historyPoint[stepNumber - 1];
        const squares = [...lastMove];
        squares[i] = XO;
        setHistory([...historyPoint, squares]);
        setStepNumber(historyPoint.length)
        setXIsNext(!xIsNext)
    }

    return(
        <>
            <h1>React Tic Tac Toe - with Hooks</h1>
            <Board squares={history[stepNumber]} onClick={handleClick} />
            <div className="info-wrapper">
                <h3>
                    {winner ? "Winner: " + winner : "Next Player: " + XO}
                </h3>
                <div>
                    <button onClick={goBack}>
                        Roleback
                    </button>
                </div>
            </div>
        </>
    );
}

export default Game;