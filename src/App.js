import { useState } from "react";

function Square({ value, onSquareClick }) {
    return ( 
        <button 
            className="square"
            onClick={onSquareClick}
        >
            {value}
        </button>
    );
}

export default function Board() {
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [gameResult, setGameResult] = useState(null);

    function handleClick(index) {
        if (squares[index] || calculateWinner(squares)) {
            return;
        }

        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[index] = "X";
        } else {
            nextSquares[index] = "O";
        }
        setSquares(nextSquares);
        setXIsNext(!xIsNext);

        const winner = calculateWinner(nextSquares);
        if (winner) {
            if (winner === "X") {
                setGameResult("Win"); 
            } else if (winner === "O") {
                setGameResult("Lose"); 
            } 
        } else if (!nextSquares.includes(null)) {
            setGameResult('Draw'); 
        }
        
    }

    let status;
    if (gameResult) {
        if (gameResult === 'Draw') {
            status = "It's a Draw! </br></br> We will just have to be each other's Forever Valentine!";
        } else if (gameResult === 'Win'){
            status = 'You won!! </br> The game and my <span class="heart1">♥</span> </br></br>Thank you for being my Forever Valentine!';
        } else {
            status = 'You Lost but Its Okay!! </br> You have my <span class="heart1">♥</span> </br></br> I will be your Forever Valentine!';
        }
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    const handleHomeClick = () => {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
        setGameResult(null);
    };

    return (
        <div class="window">
            <div class="window-header">
                <span class="title">Happy Valentine's Day! <span class="heart">♥</span></span>
                <div class="window-controls">
                    <button class="minimize">—</button>
                    <button class="close">✕</button>
                </div>
            </div>
            <div className="window-content">
                {gameResult ? (
                    <div className="result">
                        {/* <h2>Game Over!</h2> */}
                        <h2 dangerouslySetInnerHTML={{ __html: status }} />
                        <button onClick={handleHomeClick}>
                            <img src="images\pink-house-button.avif" alt="Home" className="home-icon" />
                        </button>
                    </div>
                ) : ( 
                    <>
                        <h1>
                                 Hi Baby! 
                        </h1>
                        <img src="images/pokemon-pink-blue-love.gif" alt="Description of the GIF" className="welcome-icon"/>
                        <h2>
                            <span class="heart1">♥</span> 
                                 Will you be my Valentine? 
                            <span class="heart1">♥</span>
                        </h2>
                        {/* <div className="status">{status}</div> */}
                        <div className="board">
                            <div className="board-row">
                                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
                            </div>
                            <div className="board-row">
                                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
                            </div>
                            <div className="board-row">
                                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
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