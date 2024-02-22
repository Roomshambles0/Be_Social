import { CalendarCheck, Home, NotebookIcon} from "lucide-react"


export const Profilegrid =()=>{
    return  <div className="flex flex-col items-end min-h-screen border-r-2 border-stone-300">
  <div className="mr-10 mt-24">
  <div className="flex items-center hover:shadow-2xl hover:shadow-sky-800 drop-shadow-2xl hover:text-white hover:bg-sky-400 rounded-full text-center font-bold px-8 p-4 text-2xl my-4"> <Home className="pr-1"/> <button>Home</button></div>
  <div className="flex items-center hover:shadow-2xl hover:shadow-sky-800 drop-shadow-2xl hover:text-white hover:bg-sky-400 rounded-full text-center font-bold px-8 p-4 text-2xl my-4"> <NotebookIcon className="pr-1"/> <button >Drafted</button></div>
  <div className="flex items-center hover:shadow-2xl hover:shadow-sky-800 drop-shadow-2xl hover:text-white hover:bg-sky-400 rounded-full text-center font-bold px-8 p-4 text-2xl my-4"> <CalendarCheck className="pr-1"/> <button >Sheduled</button></div>

  <div className="flex items-center hover:bg-slate-700 text-white bg-slate-900 rounded-full text-center justify-center font-bold px-8 p-4 text-2xl my-4 mt-24"> <button >Logout</button></div>

  </div>
   

  </div>
}