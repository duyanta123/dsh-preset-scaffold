import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)
  return (
    <main>
      <h1>My React App</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>
    </main>
  )
}