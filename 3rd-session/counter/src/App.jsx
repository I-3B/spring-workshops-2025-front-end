import { useState } from "react";
import { Counter } from "./components/counter";
import { Level } from "./components/level";

function App() {
  const [level, setLevel] = useState(0);
  return (
    <div className="container">
      <p>level: {level}%</p>
      <Level level={level} />
      <Counter setLevel={setLevel} level={level} />
    </div>
  );
}

export default App;
