import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Signup = () =>{
    const [username ,setUsername] =useState<string>()
    const [password,setPassword] = useState<string>()
    const navigate = useNavigate()

    const onclick = async()=>{
        if(!username || !password) return
         const data = {username,password};
         const response = await fetch("http://localhost:8000/api/register/",{
          method:"POST",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body:JSON.stringify(data),
            cache: 'default'
      })
  
     const newdata = await response.json()
     if(newdata.message == "d!"){
      navigate("/")
     }
    }

    return <div className="flex justify-center mt-56">
        <div>
      <h1 className="my-4 text-center font-bold text-4xl text-stone-500">Create your account</h1> 
      <div className="border border-slate-400 rounded-xl px-10 py-6 ">
        <div className="my-4">
            <p className="text-2xl font-bold mb-2 text-slate-600">Username</p>
            <input type="text"  className="border text-xl font-serif font-normal border-stone-200 rounded-md pr-16 pl-1 py-1 text-slate-500"   onChange={(e)=>{
          setUsername(e.currentTarget.value)
     }}/>
        </div>
        <div className="my-4 mb-2">
            <p className="text-2xl font-bold text-slate-600">Password</p>
            <input type="password" className="border font-serif text-xl font-thin border-stone-200 rounded-md pr-16 pl-1 py-1 text-stone-600"   onChange={(e)=>{
          setPassword(e.currentTarget.value)
     }}/>
        </div>
         <button className="border rounded-lg mt-6 px-4 py-2 text-xl font-bold bg-black text-white hover:bg-slate-200 hover:text-black" onClick={onclick}>Signup</button>
         <p className="mt-5 text-center font-bold text-md text-slate-500 underline"><a href="/">Already have account?click here</a></p>

    </div>
    </div>
    </div>
}