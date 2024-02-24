

export const Commentscard = (params:any)=>{

return <div>
   <div className="flex m-4 items-center">
   <img src="../altuser.jpg" alt="user" width={40} height={40} className="rounded-full border border-slate-200 shadow-sm" />
   <h1 className="ml-2 font-bold text-xl">{params.name}</h1>
    </div>

    <div className="border-b-2 ">
    <div className="mx-5 mb-5">
        <h1 className="font-semibold text-lg my-2">{params.title}</h1>
        <p className="font-semibold text-balance mt-2 text-slate-600 ">{params.description}</p>
    </div>
    </div>
    </div>
}