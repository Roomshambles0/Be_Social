import { useEffect, useState } from "react"
import { PostCard } from "./Postcard"




export const Posts = ()=>{
const [posts,setPosts] = useState<any>([])

useEffect(()=>{
    async function fetchdata (){
    const token = localStorage.getItem('token')
    if(!token) return
    const response = await fetch("http://localhost:8000/api/allposts/",{
        method:"GET",
        headers: {
            "Accept": 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
          },
          cache: 'default'
    })

   const newdata = await response.json()
   if(!newdata.posts && !newdata.name) return 
   const feed = newdata.posts.reverse()
   console.log(newdata,"hello")
   setPosts(feed)
   
}

fetchdata()
},[])

    return <div className="border-l-2 border-r-2 border-stone-300">
     {posts.map((post:any)=>{
        return <PostCard id={post.pk} name={post.fields.author_name} title={post.fields.title} description={post.fields.description} like={post.fields.likes} comments={post.fields.comments} />
     })}   
    </div>
}