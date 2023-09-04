import { createContext, useState } from "react";
import RecursivePartitioner from "./components/recursivePartitioner";

export const PartitionContext = createContext();

function App() {
  const [count, setCount] = useState(0);
  const usedColors = ["#008080"];

  const addCount = () => setCount((prev) => prev + 1);

  const removeCount = () => setCount((prev) => prev - 1);

  const addAndRemove = {
    count,
    usedColors,
    addCount,
    removeCount,
  };

  return (
    <div className="flex justify-center items-center h-screen gap-1">
      <PartitionContext.Provider value={addAndRemove}>
        <RecursivePartitioner bg={usedColors[0]} />
      </PartitionContext.Provider>
    </div>
  );
}

export default App;
