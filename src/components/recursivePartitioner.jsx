import { PartitionContext } from "../App";
import { useContext, useEffect, useState } from "react";
import Button from "./button";

export default function RecursivePartitioner({ bg, removePartition }) {
  const [split, setSplit] = useState(false);
  const [secondColor, setSecondColor] = useState("");
  const [firstPartition, setFirstPartition] = useState(true);
  const [secondPartition, setSecondPartition] = useState(true);

  // context
  const partitionContext = useContext(PartitionContext);
  const { count, usedColors, addCount, removeCount } = partitionContext;

  // generate random color
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }

    if (usedColors.includes(color)) {
      return getRandomColor();
    } else {
      usedColors.push(color);
      return setSecondColor(color);
    }
  };

  // handle split
  const handleSplit = (type) => {
    setSplit(type);
    getRandomColor();
    addCount();
  };

  // handle remove
  const handleRemove = () => {
    removePartition();
    removeCount();
  };

  // useEffect
  useEffect(() => {
    if (!firstPartition && !secondPartition) {
      setSplit(false);
    }
  }, [firstPartition, secondPartition]);

  // render based on all condition
  if (!split && !firstPartition && !secondPartition) {
    return console.log("Empty");
  }

  // render based on vertical condition
  if (split === "v") {
    return (
      <>
        {(firstPartition || secondPartition) && (
          <div className="flex w-full h-full gap-1">
            {firstPartition && (
              <RecursivePartitioner
                bg={bg}
                removePartition={() => setFirstPartition(false)}
              />
            )}
            {secondPartition && (
              <RecursivePartitioner
                bg={secondColor}
                removePartition={() => setSecondPartition(false)}
              />
            )}
          </div>
        )}
      </>
    );
  }

  // render based on horaizontal condition
  if (split === "h") {
    return (
      <>
        {(firstPartition || secondPartition) && (
          <div className="flex flex-col w-full h-full gap-1">
            {firstPartition && (
              <RecursivePartitioner
                bg={bg}
                removePartition={() => setFirstPartition(false)}
              />
            )}
            {secondPartition && (
              <RecursivePartitioner
                bg={secondColor}
                removePartition={() => setSecondPartition(false)}
              />
            )}
          </div>
        )}
      </>
    );
  }

  return (
    <>
      {!split && firstPartition && secondPartition && (
        <div
          className={"w-full h-full flex justify-center items-center gap-1"}
          style={{ backgroundColor: bg }}
        >
          <Button handleClick={() => handleSplit("v")}>v</Button>
          <Button handleClick={() => handleSplit("h")}>h</Button>

          {count > 0 && <Button handleClick={handleRemove}>-</Button>}
        </div>
      )}
    </>
  );
}
