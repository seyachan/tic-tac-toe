import React, { useState, useEffect } from 'react';
import Board from './Board';

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [winnerHistory, setWinnerHistory] = useState(() => {
    const saved = localStorage.getItem("winnerHistory");
    return saved ? JSON.parse(saved) : [];
  });
  const [winner, setWinner] = useState(null);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  // 🧠 勝者が決まったら、履歴に1度だけ保存
  useEffect(() => {
    if (!winner) return;

    const saved = localStorage.getItem("winnerHistory");
    const parsed = saved ? JSON.parse(saved) : [];

    if (parsed[parsed.length - 1] === `Winner: ${winner}`) return;

    const newHistory = [...parsed, `Winner: ${winner}`];
    setWinnerHistory(newHistory);
    localStorage.setItem("winnerHistory", JSON.stringify(newHistory));
  }, [winner]);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    const w = calculateWinner(nextSquares);
    setWinner(w);
  }

  function jumpTo(move) {
    setCurrentMove(move);
    setWinner(calculateWinner(history[move]));
  }

  // 🔄 リセット（盤面のみ初期化）
  function handleReset() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setWinner(null);
  }

  // 🧼 履歴削除（localStorage & state 両方）
  function handleClearHistory() {
    localStorage.removeItem("winnerHistory");
    setWinnerHistory([]);
  }

  const moves = history.map((squares, move) => {
    const description = move ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
// JSX内のリセット・履歴削除ボタンにクラスを追加
<button
  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2"
  onClick={handleReset}
>
  🔄 リセット
</button>

<button
  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
  onClick={handleClearHistory}
>
  🧼 履歴を削除
</button>

        <ol>{moves}</ol>
        <h3>対戦履歴</h3>
        <ul>
          {winnerHistory.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
