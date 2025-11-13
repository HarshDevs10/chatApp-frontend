import { useEffect, useRef, useState } from "react"

const App = () => {
  const wsRef = useRef<WebSocket | null>(null);
  const [message, setMessage] = useState<string[]>(["hi"]);
  const Ref1 = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const web = new WebSocket("ws://localhost:8000")
    wsRef.current = web;

    web.onmessage = (e) => {
      console.log(e.data)
      setMessage(prev => [...prev, e.data])
    }

    web.onopen = () => {
      web.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: "123"
        }
      }))
    }

    return () => web.close()
  }, [])

  const SendMessage = () => {
    
    if (!Ref1.current) return;
    const message = Ref1.current.value

    wsRef.current?.send(JSON.stringify({
      type: "chat",
      payload: {
        message: message
      }
    }))
  }

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