import { useEffect, useState } from "react"


export const ProfileCard =()=>{
const [name,setName] = useState<string>()

useEffect(()=>{
    async function fetchdata (){
        const token = localStorage.getItem('token')
        if(!token) return
        const response = await fetch("http://localhost:8000/api/hi/",{
            method:"GET",
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
              },
              cache: 'default'
        })
    
       const newdata = await response.json()
       if(!newdata.message) return 
       setName(newdata.message)
       
    }
    
    fetchdata()

},[])

    return <div className="flex flex-col items-start ">
          <div className="ml-10 mt-24 flex justify-center border-2 rounded-lg text-sky-400 border-stone-300">
  <div className="flex items-center text-center font-bold p-4 text-2xl my-4">
   <div className="flex flex-col items-center">
   <img src="../altuser.jpg" alt="user" width={90} height={90} className="rounded-full border-2 border-black" />
   <h1 className="mt-3">{name}</h1>
    </div> 
    </div>
    </div>
    </div>
}