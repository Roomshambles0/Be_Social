import { useEffect, useState } from "react"



export const Drafts =()=>{
    const [drafts,setDrafts] = useState<any[]>([])
    useEffect(()=>{
        async function fetchcomment (){
        const token = localStorage.getItem('token')
        if(!token) return
        
        const response = await fetch("http://localhost:8000/api/getDrafts",{
            method:"GET",
            headers: {
            "Accept": 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
              },
              cache: 'default'
        })
    
       const newdata = await response.json()
       if(!newdata.drafts) return 
       setDrafts(newdata.drafts)
    }
   
   
    
    fetchcomment()
    },[])

    return <div>
    <div> <h1 className="ml-2 mt-5 font-bold text-xl">Drafts</h1></div>
    {drafts.map((draft)=>{
        return <DraftCard id={draft.pk} key={draft.pk} name = {draft.fields.title}/>
    })}
    </div>
}

const DraftCard = (params:any)=>{

    const onpost = async()=>{
        const token = localStorage.getItem('token')
        const data = {token,id:params.id}
        const response = await fetch("http://localhost:8000/api/postdraft/",{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body:JSON.stringify(data),
              cache: 'default'
        })
    
       const newdata = await response.json()
       if(newdata.message == "Posted Draft"){
        window.location.reload();
       console.log("posted");
       }
    }

    return <div className="border flex justify-between items-center w-[420px]">
    
          <div className="p-6"><h1 className=" font-bold text-xl">{params.name}</h1></div> 
           <div className="mr-4 hover:bg-sky-400 text-white bg-sky-800 rounded-xl text-center justify-center font-bold p-3 text-xl" onClick={onpost}>Post</div>

        </div>
}