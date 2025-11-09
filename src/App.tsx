import { useEffect, useRef, useState } from "react"

const App = () => {
  const [message, setMessage] = useState<string[]>([])
  const [ws, setWs] = useState<WebSocket>()
  const Ref1 = useRef(null)

  const SendMessage = () => {
    //@ts-ignore
    ws?.send(Ref1.current.value)
  } 
  
  useEffect(() => {
    const Socket = new WebSocket("ws://localhost:8000")
    setWs(Socket)

    Socket.onmessage = (e) => {
      console.log(e.data)
      setMessage(prev => [...prev, e.data])
    }

    return () => Socket.close()
  }, [])

  return <div className="flex justify-center items-center h-screen">
    <div>
      {message}
    </div>
    <input type="text" className="bg-black text-white" ref={Ref1} placeholder="Message....." />
    <button onClick={SendMessage}>Send</button>
  </div>
}

export default App