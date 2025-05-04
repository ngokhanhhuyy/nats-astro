import { useState, useEffect } from "react";

export default function Count(props: { initialCount: number }) {
  const [count, setCount] = useState<number>(props.initialCount);

  return (
    <>
      <button onClick={() => setCount(count => count + 1)}>Increment</button>
      <span>Current count: {count}</span>
    </>
  );
}