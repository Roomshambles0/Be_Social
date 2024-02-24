import { useParams } from "react-router-dom";
import { ProfileCard } from "./Profilecard"
import { Profilegrid } from "./Navbar"
import { PostCard } from "./Postcard";
import { Commentscard } from "./commentcard";
import { useEffect, useState } from "react";

const AllPosts =[{name:"PK",title:"title of the post",description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",like:"10",comments:"5"},
{name:"PK",title:"title of the post",description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",like:"10",comments:"5"},
{name:"PK",title:"title of the post",description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",like:"10",comments:"5"},
{name:"PK",title:"title of the post",description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",like:"10",comments:"5"}
]

export const PostCommPage = ()=>{
    let { id } = useParams();
   const realid = id


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
    setPost(newdata.post)
    SetComments(newdata.comments)
 }


 
 fetchcomment()
 },[])

console.log(params.id)
    return <div className="border-l-2 border-r-2 border-stone-300 min-h-screen h-fit">
          <PostCard id={params.id} name={posts.author} title={posts.title} description={posts.description} like={posts.likes} comments={posts.comments}/>
          <div className="border-b-2 border-stone-300 p-4 font-bold text-2xl">Comments</div>
          {comments.map((post)=>{
        return <Commentscard id={post.pk} name={post.fields.author_name} title={post.fields.title} description={post.fields.description}/>
     })}
      
        </div>
}