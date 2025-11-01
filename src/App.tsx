import { useEffect, useRef, useState, type RefObject } from "react"

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

  return <div style={{justifyContent: "center", alignItems: "center"}}>
    <div style={{display: "flex", justifyContent: "center"}}>
      {message}
    </div>
    <input type="text" ref={Ref1} placeholder="Message....." />
    <button onClick={SendMessage}>Send</button>
  </div>
}

export default App