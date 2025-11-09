import { useEffect, useRef, useState } from "react"

const App = () => {
  const [message, setMessage] = useState<string[]>(["hello world", "singh"])
  const [ws, setWs] = useState<WebSocket>()
  const Ref1 = useRef(null)

  const SendMessage = () => {
    if(!Ref1.current) return
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

  return <div className="flex flex-col w-96 h-screen bg-amber-800 justify-center items-center">
    <div className="">
      {message.map(mes => <div className="m-2"><span className="bg-white text-black rounded-lg p-1 font-medium">{mes}</span></div>)}
    </div>
    <div>
      <input ref={Ref1} type="text" placeholder="Message..." className="bg-white text-slate-800 focus:outline-indigo-500"/>
      <button onClick={SendMessage} className="bg-purple-600 text-white cursor-pointer ml-2 rounded-xs">Send</button>
    </div>
  </div>
}

export default App