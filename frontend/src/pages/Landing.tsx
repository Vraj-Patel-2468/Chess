import "../index.css";

export default function Landing() {
    return (
        <div className="flex flex-col items-center justify-centers bg-green-800 h-screen ">
            <h1 className="">Welcome to Chess Game</h1>
            <form className="flex flex-col space-y-2">
              <input type="text" name="username" placeholder="Username" className="h-12 bg-transparent outline-none border-2 border-blue-500 rounded-[7px] placeholder:justify-center"/>
              <button type="submit" className="font-semibold font-sans h-12 rounded-[7px] text-white bg-blue-500">Start Game</button>
            </form>
        </div>
    );
}
