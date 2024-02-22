import { ProfileCard } from "./ProfileLeft"
import { Profilegrid } from "./ProfileRight"

export const Home =()=>{
    return <div className="grid grid-cols-12">
     <div className="col-span-3"><Profilegrid /></div> 
     <div className="col-span-5">Hello world</div>
     <div className="col-span-3"><ProfileCard /></div>
        </div>
}