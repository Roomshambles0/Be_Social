import { useParams } from "react-router-dom";
import { ProfileCard } from "./Profilecard"
import { Profilegrid } from "./Navbar"
import { PostCard } from "./Postcard";
import { Commentscard } from "./commentcard";
import { useEffect, useState } from "react";


export const PostCommPage = ()=>{
    let { id } = useParams();


    return <div className="grid grid-cols-12">
    <div className="col-span-3"><Profilegrid /></div> 
    <div className="col-span-5"><CommentsGrid id={id}/></div>
    <div className="col-span-3"><ProfileCard /></div>
       </div>
}



const CommentsGrid = (params:any)=>{
   const [comments ,SetComments] = useState<any[]>([])
   const [posts ,setPost] = useState<any>({})

   useEffect(()=>{
     
      
     async function fetchcomment (){
     const token = localStorage.getItem('token')
     const body = {'Authorization': token,'id':params.id}
     if(!token) return
     const response = await fetch("http://localhost:8000/api/getcomments/",{
         method:"POST",
         headers: {
            "Accept": 'application/json',
            'Content-Type': 'application/json',
           },
           body:JSON.stringify(body),
         cache: 'default'
     })
 
    const newdata = await response.json()
    if(!newdata) return 
    console.log(newdata)
    const posts = newdata.post
    setPost(posts)
    SetComments(newdata.comments)
 }


 
 fetchcomment()

 },[])


    return <div className="border-l-2 border-r-2 border-stone-300 min-h-screen h-fit">
          <PostCard id={params.id} name={posts.auther} title={posts.title} description={posts.description} comments={posts.comments} liked={posts.islike} like={posts.likenumber}/>
          <div className="border-b-2 border-stone-300 p-4 font-bold text-2xl">Comments</div>
          {comments.map((post)=>{
        return <Commentscard id={post.pk} name={post.fields.author_name} title={post.fields.title} description={post.fields.description}/>
     })}
      
        </div>
}