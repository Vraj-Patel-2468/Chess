import "../index.css";
import wPawn from "../assets/wP.png";
import wRook from "../assets/wR.png";
import wKnight from "../assets/wN.png";
import wBishop from "../assets/wB.png";
import wQueen from "../assets/wQ.png";
import wKing from "../assets/wK.png";
import bPawn from "../assets/bP.png";
import bRook from "../assets/bR.png";
import bKnight from "../assets/bN.png";
import bBishop from "../assets/bB.png";
import bQueen from "../assets/bQ.png";
import bKing from "../assets/bK.png";
import { MouseEventHandler } from "react";

type Piece = {
  square: string;
  type: string | null;
  color: string | null;
};

type BoardProps = {
  board: (Piece | null)[][];
  handleMoveRequest: MouseEventHandler<HTMLDivElement>;
};

function getPieceImage(piece: Piece) {
  if (!piece || !piece.type || !piece.color) return null;
  const { type, color } = piece;
  const pieces = {
    w: {
      p: wPawn,
      r: wRook,
      n: wKnight,
      b: wBishop,
      q: wQueen,
      k: wKing,
    },
    b: {
      p: bPawn,
      r: bRook,
      n: bKnight,
      b: bBishop,
      q: bQueen,
      k: bKing,
    },
  };
  return pieces[color][type] || null;
}

function getPieceSymbol(piece: Piece) {
  if (!piece || !piece.type || !piece.color) return null;
  const { type, color } = piece;
  const pieces = {
    w: {
      p: "♙",
      r: "♖",
      n: "♘",
      b: "♗",
      q: "♕",
      k: "♔",
    },
    b: {
      p: "♟︎",
      r: "♜",
      n: "♞",
      b: "♝",
      q: "♛",
      k: "♚",
    },
  };
  return pieces[color][type] || null;
}

export function WhiteBoard({ board, handleMoveRequest }: BoardProps) {
  return (
    <div className="">
      {board.map((row, i) => (
        <div className="flex" key={i}>
          {row.map((box, j) => (
            <div
              className={`w-16 h-16 border ${
                (i + j) % 2 ? "bg-slate-400" : "bg-slate-700"
              }`}
              id={`${String.fromCharCode(97 + j)}${8 - i}`}
              key={j}
              onClick={handleMoveRequest}
            >
              {box && box.type && box.color ? (
                <img
                  className="w-full h-full object-contain"
                  src={getPieceImage(box)}
                  alt={getPieceSymbol(box) || ""}
                />
              ) : null}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function BlackBoard({ board, handleMoveRequest }: BoardProps) {
  return (
    <div className="">
      {board.slice().reverse().map((row, i) => (
        <div className="flex" key={i}>
          {row.map((box, j) => (
            <div
              className={`w-16 h-16 border ${
                (i + j) % 2 ? "bg-slate-400" : "bg-slate-700"
              }`}
              id={`${String.fromCharCode(97 + j)}${i + 1}`}
              key={j}
              onClick={handleMoveRequest}
            >
              {box && box.type && box.color ? (
                <img
                  className="w-full h-full object-contain"
                  src={getPieceImage(box)}
                  alt={getPieceSymbol(box) || ""}
                />
              ) : null}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
