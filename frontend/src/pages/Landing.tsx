import "../index.css";
import { useEffect, useState } from "react";
import useWebSocket from "../hooks/useWebSocket";

const WEB_URL = "ws://localhost:8080";

export default function Landing() {
    
    const [userID, setUserID] = useState("");
    const socket = useWebSocket(WEB_URL);
    const [username, setUsername] = useState("");

    useEffect(() => {
        socket?.addEventListener("message", (message) => {
           const MSG = JSON.parse(message.data);
           if(MSG.msg === "success") {
               setUserID(MSG.userID);
           }
           if(MSG.msg === "start") {
               if(MSG.payload.pending) {
                   console.log("You are currently pending and will be informed when the game starts.");
               }
               else {
                   console.log("Game has started.");
                   console.log(MSG.payload);
               }
           }
        });
    }, [socket]);

    function handlePlay() {
        const data = {
            type: "start",
            userID,
        };
        socket?.send(JSON.stringify(data));
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="text-2xl font-bold mb-8 text-gray-700">Welcome to Chess Game</div>            
            {!userID && (
                <form 
                    className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md" 
                    onSubmit={(e) => {
                        e.preventDefault();
                        const data = {
                            type: "newuser",
                            username: username,
                        };
                        if(socket === null) {
                            console.info("Backend might be offline while connecting username.");
                            return;
                        } 
                        socket.send(JSON.stringify(data));
                    }}
                >
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input 
                            type="text" 
                            name="username" 
                            placeholder="Enter your username" 
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            value={username}
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Set User
                    </button>
                </form>
            )}
            {userID && (
                <div className="flex flex-col items-center">
                    <button
                        className="mt-4 bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
                        onClick={handlePlay}
                    >
                        Play
                    </button>
                </div>
            )}
        </div>
    );
}
