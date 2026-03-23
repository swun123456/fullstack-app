import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [msg, setMsg] = useState('')

  useEffect(() => {
    axios.get('http://localhost:5000/api/hello')
      .then(res => setMsg(res.data.message))
      .catch(err => console.log(err))
  }, [])

  return (
    <div>
      <h1>React + Node.js</h1>
      <p>來自後端的訊息: {msg}</p>
    </div>
  )
}
export default App
