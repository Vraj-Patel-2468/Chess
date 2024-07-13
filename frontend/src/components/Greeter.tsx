import { useEffect, useState } from "react";
import useWebSocket from "../hooks/useWebSocket";
import GamePanel from "./GamePanel";
import Timer from "../components/Timer";

export default function Greeter() {
  const ws = useWebSocket("ws://localhost:8080");
  const [user, setUser] = useState<string>("");
  const [userID, setUserID] = useState<string | null>(null);
  const [payload, setPayload] = useState<any>(null);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [queueStarted, setQueueStarted] = useState<boolean>(false);
  let from = "", to = "";

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    ws?.send(JSON.stringify(
      {
        type: "newuser",
        username: user 
      }
    ));
  };

  function handlePlay() {
    if(ws) {
      ws.send(JSON.stringify(
        {
          type: "start",
          userID
        }
      ));
    }
  }

  function handleClock(): any {
    ws?.send(JSON.stringify({
      type: "cancel",
      userID
    })
    );
  }

  function handleMoveRequest(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    const targetId = (e.currentTarget as HTMLDivElement).id;
    if(from === "") {
      //TODO: add possible moves of the selected piece
      from = targetId;
      return;
    } else {
      to = targetId;
      //TODO: make the move and update the board state
      ws?.send(JSON.stringify({
        type: "move",
        from,
        to
      }));
      from = "";
      to = "";
    }
  }

  useEffect(() => {
    if(ws) {
      ws.onmessage = (e: MessageEvent) => {
        const MSG = JSON.parse(e.data);
        if(MSG.msg === "success") 
          setUserID(MSG.userID);
        if(MSG.msg === "start") {
          setPayload(MSG.payload);
        }
        if(MSG.msg === "cancel") {
          if(MSG.status === "done") {
            setQueueStarted(false)
          }
        }
        if(MSG.msg === "move") {
          setPayload(MSG.payload);
          console.log(MSG.payload);
        }
      } 
    } 
  }, [ws]);

  useEffect(() => {
    if(payload?.pending) {
      setQueueStarted(true);
    } 
    if(!payload?.pending && payload!==null){
      setGameStarted(true);
    }
  }, [payload])

  if (!ws) return
    <div className="h-screen w-screen flex flex-col bg-slate-900 justify-center items-center">
      <h1 className="text-white text-5xl caveat">We are currently offline...</h1>
    </div>;

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-900 justify-center items-center">
      {!gameStarted && <div className="flex md:flex-row space-x-[25px]">
        <span className="text-white text-5xl caveat">Welcome to Chess.play</span>
        <img src="./src/assets/chess-board.png" alt="♞" className="hidden md:block w-14 h-14" />
      </div>}
      {!userID  && !gameStarted && <form className="flex flex-col bg-transparent m-5 p-3 space-y-4 rounded-lg" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username" className="p-2 text-xl italic text-white items-center">Username:</label>
          <input
            autoComplete="off"
            type="text"
            className="m-3 p-2 text-white text-[16px] italic outline-none rounded-[6px] bg-transparent border border-white focus:border-blue-600"
            id="username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <button type="submit" className="text-white text-[16px] italic bg-slate-800 p-1 rounded-[6px] border-[2px] border-transparent hover:border-blue-700">
          Set Username
        </button>
      </form>}
      {userID && !gameStarted &&  <div className="flex flex-col bg-transparent m-5 p-3 space-y-8 rounded-lg">
        <p className="text-3xl italic mx-auto text-white">Hello {user}!</p>
        {!queueStarted && <button
        onClick={handlePlay} 
        className="text-white text-[16px] italic bg-slate-800 p-1 rounded-[6px] border-[2px] border-transparent hover:border-blue-700">
          Play Online
        </button>}
        {queueStarted && <div>
          <Timer handleClock={handleClock} />
        </div>
        }
      </div>}
      {gameStarted && <GamePanel payload={payload} handleMoveRequest={handleMoveRequest}/>} 
    </div>
  );
}
