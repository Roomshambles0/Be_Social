import { CalendarCheck, Home, NotebookIcon, Plus} from "lucide-react"
import { useState } from "react"
import Modal from "../modal/modal"
import { Draftmodal } from "../modal/Draftmodal"
import { Drafts } from "./Drafts"
import { useNavigate, useParams } from "react-router-dom"


export const Navbar =()=>{
const [open, setOpen] = useState(false);
const [title, setTitle] = useState<string>();
const [description,setDescription] = useState<string>();

const params = useParams();
const navigate = useNavigate();

const [draft,setDraft] = useState(false)

const submitpost = async()=>{
  if(!title || !description) return
         const data = {title,description,draft:false,publish:true};
         const token = localStorage.getItem('token')
         const body = {token:token,data}
         const response = await fetch("http://localhost:8000/api/CreatePost/",{
          method:"POST",
          headers: {
            'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body:JSON.stringify(body),
            cache: 'default'
      })
  
     const newdata = await response.json()
     if(newdata.message == "post created sucessfully"){
     console.log("commented");
     window.location.reload();
     }
}

const ondraft = async()=>{
  if(!title || !description) return
         const data = {title,description,draft:true,publish:false};
         const token = localStorage.getItem('token')
         const body = {token:token,data}
         const response = await fetch("http://localhost:8000/api/CreatePost/",{
          method:"POST",
          headers: {
            'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body:JSON.stringify(body),
            cache: 'default'
      })
  
     const newdata = await response.json()
     console.log(newdata)
     if(newdata.message == "post created sucessfully"){
     alert("drafted post");
     window.location.reload();
     }
    }

    return  <div className="flex flex-col items-end">
  <div className="mr-10 mt-24">
  <div className="flex items-center hover:shadow-2xl hover:shadow-sky-800 drop-shadow-2xl hover:text-white hover:bg-sky-400 rounded-full text-center font-bold px-8 p-4 text-2xl my-4" onClick={()=>{
    if(!params.home){
      navigate("/home")
    }
  }}> <Home className="pr-1"/> <button>Home</button></div>
  <div className="flex items-center hover:shadow-2xl hover:shadow-sky-800 drop-shadow-2xl hover:text-white hover:bg-sky-400 rounded-full text-center font-bold px-8 p-4 text-2xl my-4" onClick={()=>{setDraft(true)}}> <NotebookIcon className="pr-1"/> <button >Drafted</button></div>

 
  <div className="flex items-center  hover:shadow-2xl hover:shadow-sky-800 drop-shadow-2xl hover:text-white hover:bg-sky-400  text-white bg-sky-800 rounded-full text-center justify-center font-bold pr-8 p-4 text-2xl my-4 " onClick={()=>{setOpen(true)}}> <Plus className="pr-1"/> <button className="p" >Post</button></div>
  <div className="flex items-center hover:bg-slate-700 text-white bg-slate-900 rounded-full text-center justify-center font-bold px-8 p-4 text-2xl my-4 mt-24" onClick={()=> {
    navigate("/")
    localStorage.setItem("token", "")}}> <button >Logout</button></div>
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
        <div className="flex justify-around">
        <div className="flex items-center hover:bg-slate-700 text-white bg-slate-600 rounded-full text-center justify-center font-bold px-8 p-4 text-xl my-4 mt-4" onClick={ondraft}>Draft</div>
        <div className="flex items-center hover:bg-sky-400 text-white bg-sky-800 rounded-full text-center justify-center font-bold px-8 p-4 text-xl my-4 mt-4 ml-6" onClick={submitpost}>Submit</div>
        </div>
    </Modal>

    <Draftmodal draft={draft} onClose={()=>{setDraft(false)}}>
   <Drafts/>
    </Draftmodal>
   

  </div>
}