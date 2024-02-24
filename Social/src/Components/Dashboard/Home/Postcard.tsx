import { Heart, MessageCircle, Share } from "lucide-react"
import Modal from "../modal/modal"
import { useState } from "react"
import { useNavigate } from "react-router-dom"



export const PostCard = (params:any)=>{
const [open, setOpen] = useState(false)
const [title, setTitle] = useState<string>()
const [description,setDescription] = useState<string>()

const [like, setLike] = useState(false);


const navigate = useNavigate()

const comment =async ()=>{
    if(!title || !description) return
         const data = {title,description,id:params.id};
         const token = localStorage.getItem('token')
         const body = {token:token,body:data}
         const response = await fetch("http://localhost:8000/api/CreateComments/",{
          method:"POST",
          headers: {
             'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body:JSON.stringify(body),
            cache: 'default'
      })
  
     const newdata = await response.json()
     if(newdata.message == "comment created sucessfully"){
       alert("comment")
       navigate(`/posts/${params.id}`)
       window.location.reload()
     }

}

const onlike = async()=>{
    setLike(prevstate => !prevstate)
    const data = {like:like,id:params.id};
    const token = localStorage.getItem('token')
    const body = {token:token,data}
    const response = await fetch("http://localhost:8000/api/like/",{
     method:"POST",
     headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       body:JSON.stringify(body),
       cache: 'default'
 })

const newdata = await response.json()
if(newdata.message =="Like saved to database"){
console.log("commented");
}
}

    return <div >
           <div className="flex m-4 items-center">
   <img src="../altuser.jpg" alt="user" width={40} height={40} className="rounded-full border border-slate-200 shadow-sm" />
   <h1 className="ml-2 font-bold text-xl">{params.name}</h1>
    </div>

    <div className="border-b-2 ">
    <div className="mx-5 mb-5">
        <h1 className="font-semibold text-lg my-2">{params.title}</h1>
        <p className="font-semibold text-balance mt-2 text-slate-600 cursor-pointer" onClick={()=>{
    if(!params.id) return
    navigate(`/posts/${params.id}`)}}>{params.description}</p>
    </div>
   
    <div className="flex mx-5 mt-4 mb-2 justify-around items-center">
        <div className="flex hover:bg-slate-400 hover:text-white py-2 px-5 rounded-lg" onClick={onlike}><Heart className={`pr-1
         ${ like ? "text-red-700":"text-black"}`}/>{params.like}</div>
        <div className="flex hover:bg-slate-400 hover:text-white py-2 px-5 rounded-lg" onClick={()=>{setOpen(true)}}> <MessageCircle className="pr-1"/>{params.comments}</div>
        <div className="flex hover:bg-slate-400 hover:text-white py-2 px-5 rounded-lg"><Share className="pr-1"/></div>
    </div>

    </div>

    <Modal open={open} onClose={()=>{setOpen(false)}}>
      <div className="p-4 m-4 mt-6 font-bold text-xl">
       <h1 className="ml-4 mb-2">Title</h1>
       <input type="text" className="text-lg font-semibold mx-2 w-[500px] h-10 border-2 rounded-lg" onChange={(e)=>{
        setTitle(e.currentTarget.value)
       }}/>
        </div>
        <div className="p-4 m-4 mt-6 font-bold text-xl">
       <h1 className="ml-4 mb-2">Description</h1>
       <textarea  className="text-lg font-semibold mx-2 w-[500px] h-[200px] border-2 rounded-lg" onChange={(e)=>{
        setDescription(e.currentTarget.value)
       }}/>
        </div>
        <div className="flex justify-end mr-5">
        <div className="flex items-center hover:bg-sky-400 text-white bg-sky-800 rounded-full text-center justify-center font-bold px-8 p-4 text-xl my-4 mt-4 ml-6" onClick={comment}>Comment</div>
        </div>
    </Modal>

</div>
}