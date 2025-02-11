import { useState, useCallback, useEffect, useRef} from 'react'
import './App.css'
function App() {
  const [length, setlength] = useState(8);
  const [numalowed,setnumalowed]=useState(false);
  const [charalowed, setcharalowed]=useState(false);
  const [password,setpassword]=useState("");

  const passref=useRef(null)

  const passwordgenerator =useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numalowed) str +="0123456789"
    if(charalowed) str +="!@#$%^&*`{}[]-_~"

    for (let i = 1; i <=length; i++) {
      let char=Math.floor(Math.random()*str.length+1)
      pass +=str.charAt(char)
    }
    setpassword(pass)
  }, [length,numalowed,charalowed,setcharalowed])


  const copypasswordToClipboard=useCallback(()=>{
    passref.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])


  useEffect(()=>{
    passwordgenerator()
  },[length,numalowed,charalowed,passwordgenerator])
  
  return (
    <>
      
      <div className='w-full max-w-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-4xl text-center text-white'>Password-Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          
          <input
           type="text"
           value={password}
           className='outline-none w-full py-1 px-3'
           placeholder='password'
           readOnly
           ref={passref}
            />
            <button onClick={copypasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
            min={8}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setlength(e.target.value)}} />
            <label >length:{length}</label>
          </div>
          <div className='flex item-center gap-x-1'>
            <input type="checkbox"
            defaultChecked={numalowed}
            id="numberinput"
            onChange={()=>{
              setnumalowed((prev)=> !prev);
            }} />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          
          <div className='flex item-center gap-x-1'>
            <input type="checkbox"
            defaultChecked={charalowed}
            id="characterinput"
            onChange={()=>{
              setcharalowed((prev)=> !prev);
            }} />
            <label htmlFor="CharacterInput">Character</label>
          </div>
        </div>
        </div>
    </>
  )
}

export default App
