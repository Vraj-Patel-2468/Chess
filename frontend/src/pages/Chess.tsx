import "../index.css";
import Board from "../components/Board";
import Status from "../components/Status";
import Message from "../components/Message";

export default function Chess() {
  return (
    <div className="">
      <Board />
      <Status />
      <Message />
    </div>
  );
}