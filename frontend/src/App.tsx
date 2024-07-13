import Greeter from "./components/Greeter";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<Greeter />}></Route>
      </Routes>
    </div>
  );
}