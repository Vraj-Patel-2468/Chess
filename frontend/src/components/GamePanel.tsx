import { useEffect, useState } from "react";
import { BlackBoard, WhiteBoard } from "./Board";

export default function GamePanel({ payload, handleMoveRequest }: any) {
  
  const [board, setBoard] = useState(payload.board);

  useEffect(() => {
    setBoard(payload.board);
  }, [payload]);

  return (
    <div className="">
      <div className="flex-1 p-5 m-5 text-center">
        <span className="text-white text-5xl caveat">Game Panel</span>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <div className="text-center text-white text-3xl caveat italic">
            {payload?.P1}
          </div>
          <div className="">
            Moves
          </div>
        </div>
        {payload?.color==="white" && <WhiteBoard board={board} handleMoveRequest={handleMoveRequest} />}
        {payload?.color==="black" && <BlackBoard board={board} handleMoveRequest={handleMoveRequest} />}
        <div className="flex flex-row">
        <div className="flex flex-col">
          <div className="text-center text-white text-3xl caveat italic">
            {payload?.P2}
          </div>
          <div className="">
            Moves
          </div>
        </div>
        </div>
      </div>
    </div>
  );
} 
