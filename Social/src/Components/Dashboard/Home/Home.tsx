import { Posts } from "./PostGrid"
import { ProfileCard } from "./Profilecard"
import { Navbar } from "./Navbar"

export const Home =()=>{
    return <div className="grid grid-cols-12">
     <div className="col-span-3"><Navbar /></div> 
     <div className="col-span-5"><Posts/></div>
     <div className="col-span-3"><ProfileCard /></div>
        </div>
}